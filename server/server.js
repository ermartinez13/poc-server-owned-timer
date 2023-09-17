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
  const state = { elapsed: timer.elapsed, status: timer.status };
  this.emit("state", state);
};

io.on("connection", (socket) => {
  /**
   * on socket connection, manually trigger state update to client
   * then, add socket as a timer observer (for recurring auto state updates)
   */
  socket[updateSymbol](timer);
  timer.attach(socket);

  /**
   * on socket disconnect, remove socket from timer's observers
   * if no other sockets connected, stop timer
   */
  socket.on("disconnect", () => {
    timer.detach(socket);
    const socketCount = io.sockets.sockets.size;
    if (socketCount === 0) {
      timer.pause();
    }
  });
});

httpServer.listen(3000);
