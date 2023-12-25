import { Socket } from "socket.io-client";
import { PlayerInfo } from "../pages/PlayerList";

export const requestRoom = async (socket: Socket): Promise<string> => {
  return new Promise((resolve, _) => {
    socket.emit("room:request", (roomId: string) => {
      resolve(roomId);
    });
  });
};

export const requestPlayerInfoDict = async (
  socket: Socket,
  roomId: string
): Promise<{ [key: string]: PlayerInfo }> => {
  return new Promise((resolve, _) => {
    socket.emit(
      "room:requestPlayerInfoDict",
      roomId,
      (playerInfoDict: { [key: string]: PlayerInfo }) => {
        resolve(playerInfoDict);
      }
    );
  });
};

export const createRoom = (socket: Socket, roomId: string): void => {
  socket.emit("room:create", roomId);
};
