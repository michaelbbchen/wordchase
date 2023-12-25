import { Socket } from "socket.io-client";
import { PlayerInfo } from "./util";

export const requestRoom = async (socket: Socket): Promise<string> => {
  return new Promise((resolve, _) => {
    socket.emit("room:request", (roomId: string) => {
      resolve(roomId);
    });
  });
};

export const requestPlayerId = async (socket: Socket): Promise<string> => {
  return new Promise((resolve, _) => {
    socket.emit("room:requestPlayerId", (playerId: string) => {
      resolve(playerId);
    });
  });
};

export const requestInitialPlayerDict = async (socket: Socket, roomId: string): Promise<{ [key: string]: PlayerInfo }> => {
  return new Promise((resolve, _) => {
    socket.emit("room:requestInitialPlayerDict", roomId, (playerInfoDict: { [key: string]: PlayerInfo }) => {
      resolve(playerInfoDict);
    });
  });
};

export const createRoom = (socket: Socket, roomId: string): void => {
  socket.emit("room:create", roomId);
};
