import { logger } from "./logger";
import { Player } from "./player";

export class Room {
  players: Player[];
  constructor(public readonly roomId: string) {
    this.players = [];
  }

  public join(player: Player): void {
    logger.info(`${player.socketId} joined room ${this.roomId}`);

    this.players.push(player);
    player.currentRoom = this.roomId;
  }

  public leave(player: Player): boolean {
    if (
      this.players.find((p) => p.socketId === player.socketId) === undefined
    ) {
      throw Error(
        `Did not find player ${player.socketId} in room ${this.roomId}`
      );
    }

    this.players = this.players.filter((p) => p !== player);
    player.currentRoom = undefined;
    logger.info(`${player.socketId} left the room ${this.roomId}`);

    return this.players.length == 0;
  }
}
