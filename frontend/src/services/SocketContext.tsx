import React, { createContext, useContext, ReactNode } from "react";
import { Socket, io } from "socket.io-client";

const SocketContext = createContext<Socket | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}


export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  console.log(`socket server ${process.env.REACT_APP_SOCKET_SERVER ?? "http://localhost:3001"}`);
  const socket = io(process.env.REACT_APP_SOCKET_SERVER ?? "http://localhost:3001");

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = (): Socket => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};
