import React, { createContext, useContext, ReactNode } from 'react';
import { Socket, io } from 'socket.io-client';

const SocketContext = createContext<Socket | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = io(process.env.SOCKET_SERVER ?? "http://localhost:3001");

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): Socket => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return socket;
};