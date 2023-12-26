import { Server, Socket } from "socket.io";
import { logger } from "../../logger";
import PlayerManager from "../../player-manager";
import { RoomManager } from "../../room-manager";

const registerGameHandlers = (io: Server, socket: Socket) => {
    socket.on("game:keypress", (key: string) => {
        if (key.length != 1) {
            return;
        }

        const player = PlayerManager.getPlayer(socket.id);
        if (player === undefined) {
            throw new Error(`Unknown player ${socket.id} attempted to join room`);
        }

        const roomId = player.currentRoom;
        if (roomId === undefined) {
            return;
        }

        const room = RoomManager.getRoom(roomId);

        const game = room.game;
        if (game === undefined) {
            return;
        }

        game.progress(player.socketId, key);

        //emit to room game update
        io.to(roomId).emit("game:update");
    });

    
}