import { Server, Socket } from "socket.io";
import { logger } from "../../logger";
import { RoomManager } from "../../room-manager";
import PlayerManager from "../../player-manager";
import { generateRandomString } from "../../util";
import { clear } from "console";

const registerRoomHandlers = (io: Server, socket: Socket) => {
  socket.on("room:request", (callback): void => {
    const roomId = generateRandomString();
    logger.verbose(
      `Recieved room creation request from ${socket.id}, demanding ${roomId}`
    );
    callback(roomId);
  });

  socket.on("room:requestPlayerInfoDict", (roomId, callback): void => {
    logger.verbose(
      `Recieved request for PlayerInfo Dictionary from ${socket.id}`
    );
    callback(RoomManager.getRoom(roomId).players);
  });

  socket.on("room:create", (roomId: string): void => {
    logger.info(`Created room: ${roomId}`);
    RoomManager.createRoom(roomId, io.to(roomId));
  });

  socket.on("room:join", (roomId): void => {
    logger.verbose(`${socket.id} requested to join room ${roomId}`);
    const player = PlayerManager.getPlayer(socket.id);

    if (player === undefined) {
      throw new Error(`Unknown player ${socket.id} attempted to join room`);
    }

    if (!RoomManager.hasRoom(roomId)) {
      RoomManager.createRoom(roomId, io.to(roomId));
    }
    RoomManager.getRoom(roomId).join(player);
    socket.join(roomId);

    io.to(roomId).emit("room:update", RoomManager.getRoom(roomId).players);
  });

  socket.on("room:leave", () => {
    logger.verbose(`${socket.id} requested to leave room`);
    const player = PlayerManager.getPlayer(socket.id);
    if (player === undefined) {
      throw new Error(`Unknown player ${socket.id} attempted to leave room`);
    } else if (player?.currentRoom === undefined) {
      throw new Error(`Player (${player?.socketId}) is not in a room`);
    }

    const roomId = player.currentRoom;
    const room = RoomManager.getRoom(player.currentRoom);

    socket.leave(player.currentRoom);
    room.leave(player);

    if (RoomManager.hasRoom(roomId)) {
      io.to(roomId).emit("room:update", RoomManager.getRoom(roomId).players);
    }
  });

  socket.on("room:setReady", (isReady: boolean) => {
    logger.verbose(`${socket.id} declared ${isReady ? "ready" : "unready"}`);

    const player = PlayerManager.getPlayer(socket.id);
    if (player === undefined) {
      throw Error(`Unknown player ${socket.id} attempted to set ready`);
    }

    if (player.currentRoom === undefined) {
      logger.warn(
        `Player ${socket.id} attempted to set ready when they are not in room`
      );
      return;
    }

    const roomId = player.currentRoom;
    const room = RoomManager.getRoom(roomId);

    room.setReady(player, isReady);

    if (room.isAllReady()) {
      logger.info(`All ready in room ${roomId}, starting countdown`);
      room.countdown = 3;
      io.to(roomId).emit("room:countdown", room.countdown);
      room.startCountdown(
        () => {
          logger.verbose(
            `Emitting countdown state for ${roomId}: ${room.countdown}`
          );
          io.to(roomId).emit("room:countdown", room.countdown);
        },
        () => {
          logger.info(`Starting game for room ${roomId}`);
          io.to(roomId).emit("game:start");
          room.createGame();
        }
      );

      //room.createGame();
    } else {
      room.countdown = undefined;
      room.stopCountdown();
      io.to(roomId).emit("room:countdown", room.countdown);
    }

    io.to(roomId).emit("room:update", RoomManager.getRoom(roomId).players);
  });

  socket.on("room:changeName", (newName: string) => {
    logger.verbose(`${socket.id} changed name to ${newName}`);

    const player = PlayerManager.getPlayer(socket.id);
    if (player === undefined) {
      throw Error(`Unknown player ${socket.id} attempted to set ready`);
    }

    if (player.currentRoom === undefined) {
      logger.warn(
        `Player ${socket.id} attempted to set ready when they are not in room`
      );
      return;
    }

    RoomManager.getRoom(player.currentRoom).setName(player, newName);

    const roomId = player.currentRoom;
    io.to(roomId).emit("room:update", RoomManager.getRoom(roomId).players);
  });
};

export default registerRoomHandlers;
