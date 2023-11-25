import { formatTime } from "./helpers.js";

// socket.io client installed from cdn; io becomes available as global
const socket = window.io("http://localhost:3000");
const timeDisplay = document.querySelector(".display");
const playPauseBtn = document.querySelector(".play-pause-btn");
const resetBtn = document.querySelector(".reset-btn");

/**
 * @typedef State
 * @type {object}
 * @property {string} status
 * @property {number} elapsed
 */

/**
 * Holds the last state update provided by the server
 * @type {State | undefined}
 * */
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

resetBtn.addEventListener("click", () => {
  socket.emit("reset");
});

playPauseBtn.addEventListener("click", () => {
  if (clientState === undefined) {
    // connection is not yet established so do nothing
    return;
  }

  if (clientState.status === "paused") {
    socket.emit("start");
  } else if (clientState.status === "running") {
    socket.emit("pause");
  } else {
    throw new Error("Invalid status state");
  }
});
