import { formatTime } from "./helpers.js";

// socket.io client installed from cdn; io becomes available as global
const socket = io("http://localhost:3000");
const timeDisplay = document.querySelector(".display");

socket.on("connect", () => {
  console.log("connection established");
});

socket.on("time", (time) => {
  timeDisplay.textContent = formatTime(time);
});
