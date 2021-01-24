import React from "react";
import { css } from "emotion";
import axios from "axios";

export const getStreamContainerDims = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (windowWidth * 0.75 <= windowHeight) {
    return css`
      width: ${`${windowWidth}px`};
      height: ${`${windowWidth * 0.75}px`};
      label: stream-container-dims;
    `;
  } else {
    return css`
      width: ${`${windowHeight / 0.75}px`};
      height: ${`${windowHeight}px`};
      label: stream-container-dims;
    `;
  }
};

export const startVideo = (video) => {
  video.width = video.width || 640;
  video.height = video.height || video.width * (3 / 4);

  return new Promise(async function (resolve, reject) {
    await navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
          frameRate: { ideal: 20, max: 30 },
        },
      })
      .then((stream) => {
        window.localStream = stream;
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
          resolve(stream);
        };
      })
      .catch(function (err) {
        resolve(null);
      });
  });
};

export const getScaleBox = (box) => {
  const videoWidth = document.querySelector("#video").clientWidth;
  const scale = videoWidth / box.imageWidth;
  return {
    width: box._width * scale,
    height: box._height * scale,
    top: box._y * scale,
    left: box._x * scale,
  };
};

export const drawPredictBox = (predictBox, isRecording) => {
  return predictBox ? (
    <span
      className={css`
        width: ${predictBox.width}px;
        height: ${predictBox.height}px;
        top: ${predictBox.top}px;
        left: ${predictBox.left}px;
        border-style: ${isRecording ? "solid" : "dashed"};
        border-color: ${predictBox.score > 0.9
          ? "#0f0"
          : predictBox.score > 0.7
          ? "#ff0"
          : "#fff"};
      `}
    />
  ) : null;
};

export const recordStream = (stream) => {
  var recordedChunks = [];
  var recorder;

  recorder = new MediaRecorder(stream, {
    mimeType: "video/webm",
  });
  recorder.ondataavailable = (event) => {
    recordedChunks.push(event.data);
  };
  recorder.start(10);

  return new Promise(async function (resolve, reject) {
    setTimeout(() => {
      var blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      resolve(blob);
    }, 1000);
  });
};

export const api = axios.create({
  baseURL: "http://172.17.107.18:8060",
});
