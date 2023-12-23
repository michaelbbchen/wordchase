import PlayerManager from "./player-manager";
import { Room } from "./room";

export namespace RoomManager {
	  let rooms: { [roomId: string]: Room } = {};

		export function createRoom(roomId: string) {
			if(roomId in rooms) {
				throw Error(`Cannot create room: ${roomId} already exists`)
			}
			rooms[roomId] = new Room(roomId)
		}

		export function deleteRoom(roomId: string) {
			if(!(roomId in rooms)) {
				throw Error(`Cannot remove room: ${roomId} doesn't exist`)
			}
			delete rooms[roomId]
		}

		export function getRoom(roomId: string) {
			if(!(roomId in rooms)) {
				throw Error(`Room ${roomId} was not found`)
			}
			return rooms[roomId]
		}
}