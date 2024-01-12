import { Server, Socket } from "socket.io";
import { logger } from "../../logger";
import PlayerManager from "../../player-manager";
import { RoomManager } from "../../room-manager";

const getGame = (socketId: string) => {
  const player = PlayerManager.getPlayer(socketId);
  if (player === undefined) {
    throw new Error(`Unknown player ${socketId} sent keypress`);
  }

  const roomId = player.currentRoom;
  if (roomId === undefined) {
    throw new Error(`Player ${socketId} sent keypress when not in room`);
  }

  const room = RoomManager.getRoom(roomId);
  const game = room.game;
  if (game === undefined) {
    throw new Error(
      `Player ${socketId} sent keypress when no game was found in room ${roomId}`
    );
  }
  return game;
};

const registerGameHandlers = (io: Server, socket: Socket) => {
  socket.on("game:listen", () => {
    logger.info(`Emitting update due to listen notification from ${socket.id}`);
    getGame(socket.id).emitUpdate();
  });

  socket.on("game:keypress", (key: string) => {
    if (key.length != 1) {
      return;
    }
    logger.verbose(`Emitting update due to keypress event from ${socket.id}`);
    const game = getGame(socket.id);

    game.progress(socket.id, key);
    //game.emitUpdate();
  });
};

const destroyGameHandlers = (io: Server, socket: Socket) => {
    socket.removeAllListeners("game:listen");
    socket.removeAllListeners("game:keypress")
}
export default registerGameHandlers;
