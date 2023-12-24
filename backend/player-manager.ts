import { Player } from "./player";
import { logger } from "./logger";
import { RoomManager } from "./room-manager";

namespace PlayerManager {
  export const players: { [socketId: string]: Player } = {};

  export function addPlayer(socketId: string): void {
    players[socketId] = new Player(socketId);
    logger.verbose(`Added player ${socketId}`);
  }

  export function removePlayer(socketId: string): void {
    if (!players.hasOwnProperty(socketId)) {
      logger.warn(`Attempted to remove non-existent player: ${socketId}`);
      return;
    }

    const currentRoom = players[socketId].currentRoom;
    if (currentRoom !== undefined) {
      RoomManager.getRoom(currentRoom).leave(players[socketId]);
    }

    delete players[socketId];
    logger.verbose(`Removed player ${socketId}`);
  }

  export function getPlayers(): Player[] {
    return Object.values(players);
  }

  export function getPlayer(socketId: string): Player | undefined {
    return players[socketId];
  }
}

export default PlayerManager;
