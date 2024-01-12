import { BroadcastOperator, Socket } from "socket.io";
import { logger } from "./logger";
import { Room } from "./room";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export namespace RoomManager {
  let rooms: { [roomId: string]: Room } = {};

  export function createRoom(
    roomId: string,
    roomSocket: BroadcastOperator<DefaultEventsMap, any>
  ) {
    if (roomId in rooms) {
      logger.error(`Cannot create room: ${roomId} already exists`);
      return;
    }

    logger.verbose(`Room ${roomId} was created`);
    rooms[roomId] = new Room(roomId, roomSocket);
  }

  export function deleteRoom(roomId: string) {
    if (!(roomId in rooms)) {
      logger.warn(`Cannot remove room: ${roomId} doesn't exist`);
    }
    logger.verbose(`Room ${roomId} was deleted`);
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
