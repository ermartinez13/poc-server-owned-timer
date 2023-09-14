import { createServer } from "node:http";
import { Server } from "socket.io";

import { Timer } from "./timer.js";

const timer = new Timer();
const httpServer = createServer();
const io = new Server(httpServer, {
  serveClient: false,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // on socket connection, if no other sockets connected, start timer
  const socketCount = io.sockets.sockets.size;
  if (socketCount === 1) {
    timer.start();
    console.log("first socket connection started timer");
  }

  // on socket disconnect, if no other sockets connected, stop timer
  socket.on("disconnect", () => {
    const socketCount = io.sockets.sockets.size;
    if (socketCount === 0) {
      timer.pause();
      console.log("last socket connection paused timer");
    }
  });
});

httpServer.listen(3000);
