import { logger } from "./logger";
import { GamePlayerInfo } from "./player";
import { generateRandomString } from "./util";

export class Game {
    players: { [key: string]: GamePlayerInfo };
    lines: string[];
    NUM_LINES: number = 5;

    constructor(playerIds: string[]){
        this.players = {};
        for (const playerId of playerIds) {
            this.players[playerId] = new GamePlayerInfo(Math.floor(this.NUM_LINES / 2));
        }
        this.lines = Array.from({ length: this.NUM_LINES }, () => generateRandomString(20));
    }

    public getLines(): string[] {
        return this.lines.slice(-5);
    }

    public getGamePlayerInfos(): { [key: string]: GamePlayerInfo } {
        return this.players;
    }

    public progress(playerId: string, key: string): void {
        const curKey: string = this.lines[this.players[playerId].line][this.players[playerId].index];
        if (curKey === key) {
            this.players[playerId].index += 1;
            if (this.players[playerId].index >= this.lines[this.players[playerId].line].length) {
                this.players[playerId].line += 1;
                this.players[playerId].index = 0
            }
        }

        if (this.players[playerId].line + this.NUM_LINES / 2 >= this.lines.length) {
            this.lines.push(generateRandomString(20));
        }

        for (const playerId in this.players) {
            if (this.players[playerId].line < this.lines.length - this.NUM_LINES) {
                this.players[playerId].alive = false;
            }
        }
    }
}