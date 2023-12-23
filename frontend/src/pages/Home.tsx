import React, { useEffect, useState } from "react";
import { createRoutesFromChildren, useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { generateRandomString } from "../services/util";
import { createRoom, requestRoom } from "../services/socket";
import { useSocket } from "../services/SocketContext";

export default function Home() {
  const navigate = useNavigate()
  const socket = useSocket()

  const gotoRoom = () => {
    requestRoom(socket).then((roomId) => {
      createRoom(socket, roomId)
      navigate(`room/${roomId}`)
    })
  };

  return (
    <div>
      <button onClick={gotoRoom}>Create Room</button>
    </div>
  );
}
