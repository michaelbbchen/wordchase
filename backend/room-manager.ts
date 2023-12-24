import { logger } from "./logger";
import { Room } from "./room";

export namespace RoomManager {
  let rooms: { [roomId: string]: Room } = {};

  export function createRoom(roomId: string) {
    if (roomId in rooms) {
      logger.error(`Cannot create room: ${roomId} already exists`);
      return;
    }
    rooms[roomId] = new Room(roomId);
  }

  export function deleteRoom(roomId: string) {
    if (!(roomId in rooms)) {
      logger.warn(`Cannot remove room: ${roomId} doesn't exist`);
    }
    delete rooms[roomId];
  }

  export function getRoom(roomId: string): Room {
    if (!(roomId in rooms)) {
      logger.error(`Room ${roomId} was not found`);
    }
    return rooms[roomId];
  }

  export function hasRoom(roomId: string) {
    return roomId in rooms;
  }
}
