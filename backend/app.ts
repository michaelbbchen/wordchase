import { createServer } from "http";
import { Server } from "socket.io";
import registerRoomHandlers from "./api/socket/roomHandler";

import { logger } from "./logger";
import PlayerManager from "./player-manager";
import registerGameHandlers from "./api/socket/gameHandler";
import path from "path";
import express from "express";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//const buildPath = path.join(__dirname, "../frontend/build");

//app.use(express.static(buildPath));

// app.get("/*", function (_, res) {
//   console.log("got connection")
//   res.sendFile(
//     path.join(__dirname, "../client/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });


app.get("/ping", (_, res) => {
  res.send("pong")
})

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
