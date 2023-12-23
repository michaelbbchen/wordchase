export class Player {
  currentRoom: string | undefined;
  constructor(public readonly socketId: string) {}
}
