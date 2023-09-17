import { createServer } from "node:http";
import { Server, Socket } from "socket.io";

import { Timer } from "./timer.js";
import { updateSymbol } from "./constants.js";

const timer = new Timer();
const httpServer = createServer();
const io = new Server(httpServer, {
  serveClient: false,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

/**
 * extend socket class to support observer pattern by adding update method
 * use Symbol to avoid conflicts
 */
Socket.prototype[updateSymbol] = function (timer) {
  this.emit("time", timer.elapsed);
};

io.on("connection", (socket) => {
  /**
   * on socket connection, add socket as a timer observer
   * if no other sockets connected, start timer
   */
  timer.attach(socket);
  const socketCount = io.sockets.sockets.size;
  if (socketCount === 1) {
    timer.start();
    console.log("first socket connection started timer");
  }

  /**
   * on socket disconnect, remove socket from timer's observers
   * if no other sockets connected, stop timer
   */
  socket.on("disconnect", () => {
    timer.detach(socket);
    const socketCount = io.sockets.sockets.size;
    if (socketCount === 0) {
      timer.pause();
      console.log("last socket connection paused timer");
    }
  });
});

httpServer.listen(3000);
