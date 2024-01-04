import { BroadcastOperator, Socket } from "socket.io";
import { logger } from "./logger";
import { GamePlayerInfo } from "./player";
import { generateRandomString } from "./util";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export class Game {
  players: { [key: string]: GamePlayerInfo };
  lines: string[];
  NUM_LINES: number = 5;

  constructor(
    playerIds: string[],
    public readonly roomSocket: BroadcastOperator<DefaultEventsMap, any>,
    public readonly roomId: string
  ) {
    this.players = {};
    for (const playerId of playerIds) {
      this.players[playerId] = new GamePlayerInfo();
    }

    this.lines = Array.from({ length: this.NUM_LINES }, () =>
      generateRandomString(10)
    );
  }

  public getLines(): string[] {
    return this.lines.slice(-5);
  }

  public getGamePlayerInfos(): { [key: string]: GamePlayerInfo } {
    return this.players;
  }

  public progress(playerId: string, key: string): void {
    console.log(this.lines);
    const curKey: string =
      this.lines[this.players[playerId].line][this.players[playerId].index];
    if (curKey === key) {
      this.players[playerId].index += 1;
      if (
        this.players[playerId].index >=
        this.lines[this.players[playerId].line].length
      ) {
        this.players[playerId].line += 1;
        this.players[playerId].index = 0;
      }
    }

    let pushed = false;
    if (this.players[playerId].line + 1 >= this.getLines().length) {
      pushed = true;
      this.lines.push(generateRandomString(10));
      this.lines.shift();
    }

    for (const playerId in this.players) {
      if (pushed) {
        this.players[playerId].line -= 1;
        console.log(`Updated to ${this.players[playerId].line}`);
      }

      if (this.players[playerId].line < 0) {
        this.players[playerId].alive = false;
      }
    }

    this.emitUpdate();
  }

  public emitUpdate(): void {
    logger.info(`Emitting game update for ${this.roomId}`);
    this.roomSocket.emit(
      "game:update",
      this.getLines(),
      this.getGamePlayerInfos()
    );
  }
}
