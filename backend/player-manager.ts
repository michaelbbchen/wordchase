import { Player } from "./player";
import { logger } from "./logger";
import { RoomManager } from "./room-manager";

namespace PlayerManager {
  export const players: Player[] = [];

  export function addPlayer(player: Player): void {
    players.push(player);
    logger.verbose(`Added player ${player.socketId}`);
  }

  export function removePlayer(socketId: string): void {
    const playerIndex = players.findIndex(
      (player) => player.socketId === socketId
    );

    if (playerIndex === -1) {
      logger.warn(`Attempted to remove non-existent player: ${socketId}`);
      return;
    }

    const currentRoom = players[playerIndex].currentRoom;
    if (currentRoom !== undefined) {
      RoomManager.getRoom(currentRoom).leave(players[playerIndex]);
    }

    players.splice(playerIndex, 1);
    logger.verbose(`Removed player ${socketId}`);
  }

  export function getPlayers(): Player[] {
    return players;
  }

  export function getPlayer(socketId: string): Player | undefined {
    return players.find((player) => player.socketId == socketId);
  }
}

export default PlayerManager;
