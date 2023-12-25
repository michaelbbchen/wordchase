// Represents a player in a game, one to one with socket connections
export class Player {
  currentRoom: string | undefined;
  constructor(public readonly socketId: string) {}
}

export class PlayerInfo {
  name: string;
  isReady: boolean = false;

  constructor(name: string) {
    this.name = name;
  }
}
