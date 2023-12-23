import { Socket } from "socket.io-client";

export const requestRoom = async (socket: Socket): Promise<string> => {
  return new Promise((resolve, _) => {
    socket.emit("room:request", (roomId: string) => {
      resolve(roomId);
    });
  });
};

export const createRoom = (socket: Socket, roomId: string): void => {
  socket.emit("room:create", roomId)
}