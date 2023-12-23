import { Server, Socket } from "socket.io";
import roomManager from '../objects/roomManager'
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
    const roomId = generateRoomId();
    logger.info(`Recieved room creation request from ${socket.id}, created ${roomId}`);
    callback(roomId);
  })

  socket.on("room:join", (roomData) => {
    logger.info(`${socket.id} requested to join room ${roomData.roomId}`);
    roomManager.joinRoom(roomData.roomId, socket);
    socket.join(roomData.roomId);
  });

  socket.on("room:leave", (roomData) => {
    logger.info(`${socket.id} requested to leave room ${roomData.roomId}`);
    roomManager.leaveRoom(roomData.roomId, socket);
    socket.leave(roomData.roomId);
  });

  //genuinely no clue why this is not being triggered
  socket.on("room:toggleReady", (roomData) => {
    logger.info(`${socket.id} toggled their status to ${roomData.isReady}`);
    roomManager.togglePlayerReadyStatus(roomData.roomId, socket, roomData.isReady);
  })
}

export default registerRoomHandlers;