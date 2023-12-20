import { Server, Socket } from "socket.io";
import { logger } from "../../logger";

export const generateRoomId = (): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomString = "";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
};


const registerRoomHandlers = (io: Server, socket: Socket) => {
  socket.on("room:request", (callback) => {
    const roomId = generateRoomId()
    logger.info(`Recieved room creation request from ${socket.id}, created ${roomId}`)
    callback(roomId)
  })

  socket.on("room:join", (roomData) => {
    logger.info(`${socket.id} requested to join room ${roomData.roomId}`);
  });
}

export default registerRoomHandlers;