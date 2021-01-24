import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as faceapi from "face-api.js";
import { css, cx } from "emotion";
import {
  CircularProgress,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

import {
  getStreamContainerDims,
  startVideo,
  getScaleBox,
  drawPredictBox,
  recordStream,
  api,
} from "../../../helpers";

import { getVerify } from "../../../store/actions";

const MODEL_URL = "/models";

const style = {
  root: css`
    background: #000;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    label: root;
  `,
  toggleButton: css`
    position: absolute;
    top: 50px;
    left: 0;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);
    z-index: 8;
    padding: 3px 7px;
    border-radius: 0 0 5px 0;
    label: toggle-button;
  `,
  streamContainer: css`
    position: relative;
    & > video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    & > span {
      margin: -4px 0 0 -4px;
      border-width: 4px;
      position: absolute;
    }
    label: stream-container;
  `,
  loader: css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      color: #0f0;
    }
    span {
      font-size: 50px;
      position: relative;
      z-index: 99;
      color: #0f0;
      background: rgba(255, 255, 255, 0.6);
      padding: 5px 15px;
      border-radius: 10px;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
    }
    label: loader;
  `,
  failed: css`
    color: #f00 !important;
    label: failed;
  `,
};

const Stream = (props) => {
  const { dispatch } = props;

  const [streamState, setStreamState] = useState(null);
  const [streamToggleChecked, setStreamToggleChecked] = useState(false);
  const [submitState, setSubmitState] = useState(false);
  const [streamDetection, setStreamDetection] = useState(null);
  const [predictBox, setPredictBox] = useState(null);
  const [detectResult, setDetectResult] = useState(null);

  const handleStreamToggleChecked = (e) => {
    setStreamToggleChecked(e.target.checked);
  };

  const getVideo = () => {
    return document.getElementById("video");
  };

  useEffect(() => {
    // load models
    faceapi.loadTinyFaceDetectorModel(MODEL_URL);
    faceapi.loadFaceLandmarkModel(MODEL_URL);

    // run video streaming
    startVideo(getVideo()).then((stream) => {
      if (stream) {
        setStreamState(stream);
      }
    });
  }, []);

  // run prediction
  const runPredection = () => {
    const video = getVideo();
    faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .then((data) => {
        if (data?.detection) {
          setPredictBox({
            ...getScaleBox({
              ...data.detection._box,
              imageWidth: video.width,
            }),
            score: data.detection._score,
          });
        } else {
          setPredictBox(null);
        }
      });
  };

  useEffect(() => {
    // manage predection by stream, submit and record states
    if (streamState && streamToggleChecked && !submitState && !detectResult) {
      setStreamDetection(setInterval(() => runPredection(), 1000));
    } else {
      clearInterval(streamDetection);
    }
  }, [streamState, streamToggleChecked, submitState, detectResult]);

  // handle submit
  const handleSubmit = (blob) => {
    if (!submitState) {
      const formData = new FormData();
      const imageFile = new File([blob], `${Date.now()}.webm`, {
        type: "video/webm",
      });
      formData.append("Image", imageFile);
      formData.append("is_face", 0);

      dispatch(getVerify({ formData }))
        .then((response) => {
          console.log(response);
          setSubmitState(null);
          response.status === 201 && setDetectResult("ok");
          setTimeout(() => {
            setDetectResult(null);
          }, 5000);
        })
        .catch((error) => {
          setSubmitState(null);
          console.log(error);
          setDetectResult("failed");
          setTimeout(() => {
            setDetectResult(null);
          }, 5000);
        });
    }
  };

  useEffect(() => {
    if (!submitState && predictBox && predictBox.score > 0.9) {
      setSubmitState("record");
      setTimeout(() => {
        setSubmitState("submit");
        recordStream(streamState).then((blob) => {
          handleSubmit(blob);
        });
      }, 2000);
    }
  }, [predictBox]);

  return (
    <div className={style.root}>
      <div className={style.toggleButton}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={streamToggleChecked}
                onChange={handleStreamToggleChecked}
              />
            }
            label={streamToggleChecked ? "turn OFF stream" : "turn ON stream"}
          />
        </FormGroup>
      </div>
      <div className={cx(style.streamContainer, getStreamContainerDims())}>
        {/* video element */}
        <video id="video"></video>

        {/* draw predict box */}
        {!detectResult &&
          streamToggleChecked &&
          submitState !== "submit" &&
          drawPredictBox(predictBox, submitState === "record" ? true : false)}

        {/* display detection status */}
        <div className={style.loader}>
          {submitState === "submit" ? (
            <CircularProgress size={200} />
          ) : detectResult === "ok" ? (
            <span>Confirmed!</span>
          ) : (
            detectResult === "failed" && (
              <span className={style.failed}>failed!</span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default connect()(Stream);

Stream.propTypes = {
  dispatch: PropTypes.func,
};
