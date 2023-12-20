import { createServer } from "http";
import { Server } from "socket.io";
import registerRoomHandlers from "./api/socket/roomHandler";

import {logger }from './logger'

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = 3001

io.on("connection", (socket) => {
  logger.info(`Socket connected: ${socket.id}`)

  logger.debug("Registering Room Handlers")
  registerRoomHandlers(io, socket);
});

io.on("disconnect", (socket) => {
  logger.info(`Socket disconnected: ${socket.id}`)
});

httpServer.listen(port);
logger.info(`Listening on port ${port}`)