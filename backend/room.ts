import { Game } from "./game";
import { logger } from "./logger";
import { Player, PlayerInfo } from "./player";
import { RoomManager } from "./room-manager";
import { generateRandomString } from "./util";

export class Room {
  players: { [key: string]: PlayerInfo };
  game: Game | undefined = undefined;
  countdown: undefined | number = undefined;
  countdownInterval: undefined | ReturnType<typeof setTimeout> = undefined;

  constructor(public readonly roomId: string) {
    this.players = {};
  }

  public join(player: Player): void {
    logger.info(`${player.socketId} joined room ${this.roomId}`);

    this.players[player.socketId] = new PlayerInfo(generateRandomString(6));
    logger.verbose(
      `${player.socketId} assigned name ${this.players[player.socketId].name}`
    );
    player.currentRoom = this.roomId;
  }

  public leave(player: Player): void {
    if (!(player.socketId in this.players)) {
      throw Error(
        `Did not find player ${player.socketId} in room ${this.roomId}`
      );
    }

    delete this.players[player.socketId];

    player.currentRoom = undefined;
    logger.info(`${player.socketId} left the room ${this.roomId}`);

    if (Object.keys(this.players).length === 0) {
      logger.verbose(`There are no remaining players in room ${this.roomId}`);
      RoomManager.deleteRoom(this.roomId);
    }
  }

  public setReady(player: Player, ready: boolean): void {
    if (!(player.socketId in this.players)) {
      throw Error(
        `Unrecognized player ${player.socketId} attempted to set ready`
      );
    }
    this.players[player.socketId].isReady = ready;
  }

  public setName(player: Player, name: string): void {
    if (!(player.socketId in this.players)) {
      throw Error(
        `Unrecognized player ${player.socketId} attempted to set name`
      );
    }
    this.players[player.socketId].name = name;
  }

  public isAllReady(): boolean {
    for (const playerId in this.players) {
      if (this.players[playerId].isReady === false) {
        return false;
      }
    }
    return true;
  }

  public startCountdown(tick: () => void, complete: () => void): void {
    const incrementCountdown = () => {
      if (this.countdown === 0) {
        clearInterval(this.countdownInterval);
        complete();
        return;
      }
      if (this.countdown !== undefined) {
        this.countdown--;
      }
      tick();
    };

    // incrementCountdown(); // run once without delay for responsiveness
    this.countdownInterval = setInterval(incrementCountdown, 1000);
  }

  public stopCountdown(): void {
    if (this.countdownInterval !== undefined) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = undefined;
    }
  }

  public createGame(): void {
    this.game = new Game(Object.keys(this.players));
  }
}
