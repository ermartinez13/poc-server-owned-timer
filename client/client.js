import { formatTime } from "./helpers.js";

// socket.io client installed from cdn; io becomes available as global
const socket = io("http://localhost:3000");
const timeDisplay = document.querySelector(".display");
const playPauseBtn = document.querySelector(".play-pause-btn");
const resetBtn = document.querySelector(".reset-btn");

let clientState;

socket.on("state", (state) => {
  if (clientState?.status !== state.status) {
    playPauseBtn.textContent = state.status === "paused" ? "Start" : "Pause";
  }
  if (clientState?.elapsed !== state.elapsed) {
    timeDisplay.textContent = formatTime(state.elapsed);
  }
  clientState = state;
});
