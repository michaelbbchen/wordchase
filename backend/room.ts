import { BroadcastOperator, Socket } from "socket.io";
import { Game } from "./game";
import { logger } from "./logger";
import { Player, PlayerInfo } from "./player";
import { RoomManager } from "./room-manager";
import { generateRandomString } from "./util";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export class Room {
  players: { [key: string]: PlayerInfo };
  game: Game | undefined = undefined;
  countdown: undefined | number = undefined;
  countdownInterval: undefined | ReturnType<typeof setTimeout> = undefined;

  constructor(
    public readonly roomId: string,
    public readonly roomSocket: BroadcastOperator<DefaultEventsMap, any>
  ) {
    this.players = {};
  }

  public join(player: Player): void {
    logger.info(`${player.socketId} joined room ${this.roomId}`);

    this.players[player.socketId] = new PlayerInfo(generateRandomString(6));
    logger.verbose(
      `${player.socketId} assigned name ${this.players[player.socketId].name}`
    );
    player.currentRoom = this.roomId;
    this.roomSocket.emit("room:update", this.players);
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

    this.roomSocket.emit("room:update", this.players);

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

    this.roomSocket.emit("room:update", this.players);
  }

  public setName(player: Player, name: string): void {
    if (!(player.socketId in this.players)) {
      throw Error(
        `Unrecognized player ${player.socketId} attempted to set name`
      );
    }
    this.players[player.socketId].name = name;

    this.roomSocket.emit("room:update", this.players);
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

    this.countdownInterval = setInterval(incrementCountdown, 1000);
  }

  public stopCountdown(): void {
    if (this.countdownInterval !== undefined) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = undefined;
    }
  }

  public resetPlayerInfos(): void {
    logger.info(`${this.roomId}`);
    if (this.game != undefined) {
      for (const playerId in this.players) {
        logger.info(
          `changing ${playerId} ready status from ${this.players[playerId].isReady} to false`
        );
        this.players[playerId].isReady = false;
      }
      this.game = undefined;
      this.countdown = undefined;
      this.countdownInterval = undefined;
    }

    this.roomSocket.emit("room:update", this.players);
  }

  public createGame(): void {
    this.game = new Game(
      Object.keys(this.players),
      this.roomSocket,
      this.roomId
    );
    this.game.emitUpdate();
  }
}
