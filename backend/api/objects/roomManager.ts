import { Socket } from 'socket.io';
import { logger } from "../../logger";

interface Player {
    name: string;
    isReady: boolean;
}

interface Room {
    sockets: Map<string, Player>
}

class RoomManager {
    private rooms: Map<string, Room>;

    constructor() {
        this.rooms = new Map<string, Room>();
    }

    // Add a player to a room
    joinRoom(roomName: string, socket: Socket): void {
        if (!this.rooms.has(roomName)) {
            const newSockets = new Map<string, Player>();
            this.rooms.set(roomName, {sockets: newSockets});
            logger.info(`Creating ${roomName} because it does not exist`);
        }

        const room = this.rooms.get(roomName);
        const player: Player = {
            name: 'asdf',
            isReady: false,
        }

        room?.sockets.set(socket.id, player);

        logger.info(`${socket.id} has joined room ${roomName}`);
    }

    // Remove a player from a room
    leaveRoom(roomName: string, socket: Socket): void {
        const room = this.rooms.get(roomName);
        if (room) {
            room.sockets.delete(socket.id);

            logger.info(`${socket.id} has left room ${roomName}`);
            if (room.sockets.size === 0){
                this.rooms.delete(roomName);
                logger.info(`Deleting ${roomName} because it is empty`);
            }
        }
    }

    togglePlayerReadyStatus(roomName: string, socket: Socket, status: boolean){
        if(!this.rooms.get(roomName)){
            this.rooms.get(roomName)!.sockets.get(socket.id)!.isReady = status;
        }
    }
}

const roomManager = new RoomManager();
export default roomManager;