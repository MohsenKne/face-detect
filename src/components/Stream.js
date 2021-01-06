import React, { useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { css, cx } from "emotion";
import { CircularProgress } from "@material-ui/core";

const MODEL_URL =
  "https://gitcdn.xyz/repo/justadudewhohacks/face-api.js/master/weights/";

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
      border-style: solid;
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
    label: loader;
  `,
};

const Stream = () => {
  const [predictBox, setPredictBox] = useState(null);
  let isSubmittingFunc = false;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStreamContainerDims = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (windowWidth * 0.75 <= windowHeight) {
      return css`
        width: ${`${windowWidth}px`};
        height: ${`${windowWidth * 0.75}px`};
      `;
    } else {
      return css`
        width: ${`${windowHeight / 0.75}px`};
        height: ${`${windowHeight}px`};
      `;
    }
  };

  const StreamContainerDims = getStreamContainerDims();

  Navigator.getUserMedia =
    Navigator.getUserMedia ||
    Navigator.webkitUserMedia ||
    Navigator.mozUserMedia ||
    Navigator.msUserMedia;

  faceapi.loadTinyFaceDetectorModel(MODEL_URL);
  faceapi.loadFaceLandmarkModel(MODEL_URL);

  // var theRecorder;
  // var recordedChunks = [];
  // var recorder;
  // var theStream;
  // function recordStream() {
  //   try {
  //     navigator.getUserMedia(
  //       { video: {} },
  //       (stream) => {
  //         recorder = new MediaRecorder(stream, {
  //           mimeType: "video/webm",
  //         });

  //         theRecorder = recorder;
  //         theStream = stream;
  //         recorder.ondataavailable = (event) => {
  //           recordedChunks.push(event.data);
  //         };
  //         recorder.start(100);
  //         setTimeout(() => {
  //           theRecorder.stop();
  //           theStream.getTracks().forEach((track) => {
  //             track.stop();
  //           });

  //           var blob = new Blob(recordedChunks, {
  //             type: "video/webm",
  //           });
  //           var url = URL.createObjectURL(blob);
  //           var a = document.createElement("a");
  //           document.body.appendChild(a);
  //           a.style = "display: none";
  //           a.href = url;
  //           a.download = "test.webm";
  //           a.click();
  //           // setTimeout() here is needed for Firefox.
  //           setTimeout(function () {
  //             URL.revokeObjectURL(url);
  //           }, 100);
  //         }, 5000);
  //       },
  //       (err) => console.log(err)
  //     );
  //   } catch (e) {
  //     console.error("Exception while creating MediaRecorder: " + e);
  //     return;
  //   }
  // }

  const startVideo = (video) => {
    video.width = video.width || 640;
    video.height = video.height || video.width * (3 / 4);

    return new Promise(async function (resolve, reject) {
      await navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user",
          },
        })
        .then((stream) => {
          window.localStream = stream;
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            video.play();
            resolve(true);
          };
        })
        .catch(function (err) {
          resolve(false);
        });
    });
  };

  const handleSubmit = () => {
    !isSubmittingFunc &&
      setTimeout(() => {
        setIsSubmitting(true);
        isSubmittingFunc = true;
        // !isRecordingRef.current && recordStream();
        setTimeout(() => {
          setIsSubmitting(false);
          isSubmittingFunc = false;
        }, 5000);
      }, 1000);
  };

  const handleScaleBox = (box) => {
    const videoWidth = document.querySelector("#video").clientWidth;
    const scale = videoWidth / box.imageWidth;
    return {
      width: box._width * scale,
      height: box._height * scale,
      top: box._y * scale,
      left: box._x * scale,
    };
  };

  useEffect(() => {
    const video = document.querySelector("#video");

    startVideo(video).then((status) => {
      if (status) {
        navigator.getUserMedia(
          { video: {} },
          (stream) => {
            video.srcObject = stream;
            setInterval(runDetection, 1000);
          },
          (err) => console.log(err)
        );
      }
    });

    function runDetection() {
      faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .then((data) => {
          if (data?.detection) {
            const scaledBox = handleScaleBox({
              ...data.detection._box,
              imageWidth: video.width,
            });

            setPredictBox({
              ...scaledBox,
              score: data.detection._score,
            });

            if (data.detection._score > 0.9) {
              handleSubmit();
            }
          } else {
            setPredictBox(null);
          }
        });
    }
  }, []);

  return (
    <div className={style.root}>
      <div className={cx(style.streamContainer, StreamContainerDims)}>
        <video id="video"></video>
        {predictBox && !isSubmitting && (
          <span
            className={css`
              width: ${predictBox.width}px;
              height: ${predictBox.height}px;
              top: ${predictBox.top}px;
              left: ${predictBox.left}px;
              border-color: ${predictBox.score > 0.9
                ? "#0f0"
                : predictBox.score > 0.7
                ? "#ff0"
                : "#fff"};
            `}
          />
        )}
        {isSubmitting && (
          <div className={style.loader}>
            <CircularProgress size={200} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Stream;
