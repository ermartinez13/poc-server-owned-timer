// socket.io client installed from cdn; io becomes available as global
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connection established");
});
