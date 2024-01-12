import { createServer } from "http";
import { Server } from "socket.io";
import registerRoomHandlers from "./api/socket/roomHandler";

import { logger } from "./logger";
import PlayerManager from "./player-manager";
import { Player } from "./player";
import registerGameHandlers from "./api/socket/gameHandler";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port = 3001;

io.on("connection", (socket) => {
  logger.info(`Socket connected: ${socket.id}`);
  PlayerManager.addPlayer(socket.id);

  logger.debug(`Registering Room Handlers for ${socket.id}`);
  registerRoomHandlers(io, socket);

  logger.debug(`Registering Game Handlers for ${socket.id}`);
  registerGameHandlers(io, socket);

  socket.once("disconnect", () => {
    PlayerManager.removePlayer(socket.id);
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});

httpServer.listen(port);
logger.info(`Listening on port ${port}`);
