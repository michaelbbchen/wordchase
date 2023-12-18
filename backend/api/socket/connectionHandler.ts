import { Server, Socket } from "socket.io";

const registerConnectionHandlers = (io: Server, socket: Socket) => {
  const onConnect = () => {
  }

  socket.on("onConnect", onConnect);
}

export default registerConnectionHandlers;