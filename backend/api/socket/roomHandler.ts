import { Server, Socket } from "socket.io";
import { logger } from "../../logger";
import { RoomManager } from "../../room-manager";
import PlayerManager from "../../player-manager";
import { generateRandomString } from "../../util";

const registerRoomHandlers = (io: Server, socket: Socket) => {
  socket.on("room:request", (callback): void => {
    const roomId = generateRandomString();
    logger.verbose(
      `Recieved room creation request from ${socket.id}, demanding ${roomId}`
    );
    callback(roomId);
  });

  socket.on("room:create", (roomId: string): void => {
    logger.info(`Created room: ${roomId}`);
    RoomManager.createRoom(roomId);
  });

  socket.on("room:join", (roomId): void => {
    logger.verbose(`${socket.id} requested to join room ${roomId}`);
    const player = PlayerManager.getPlayer(socket.id);

    if (player === undefined) {
      throw new Error(`Unknown player ${socket.id} attempted to join room`);
    }

    if (!RoomManager.hasRoom(roomId)) {
      RoomManager.createRoom(roomId);
    }
    RoomManager.getRoom(roomId).join(player);
  });

  socket.on("room:leave", () => {
    logger.verbose(`${socket.id} requested to leave room`);
    const player = PlayerManager.getPlayer(socket.id);
    if (player === undefined) {
      throw new Error(`Unknown player ${socket.id} attempted to leave room`);
    } else if (player?.currentRoom === undefined) {
      throw new Error(`Player (${player?.socketId}) is not in a room`);
    }

    const room = RoomManager.getRoom(player.currentRoom);

    room.leave(player);
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

    RoomManager.getRoom(player.currentRoom).setReady(player, isReady);
  });
};

export default registerRoomHandlers;
