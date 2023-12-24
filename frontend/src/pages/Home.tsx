import React, { ChangeEvent, useEffect, useState } from "react";
import { createRoutesFromChildren, useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { generateRandomString } from "../services/util";
import { createRoom, requestRoom } from "../services/socket";
import { useSocket } from "../services/SocketContext";

export default function Home() {
  const navigate = useNavigate();
  const socket = useSocket();

  const gotoRoom = () => {
    requestRoom(socket).then((roomId) => {
      createRoom(socket, roomId);
      navigate(`room/${roomId}`);
    });
  };

  const joinRoom = () => {
    if (joinValue.length == 4) {
      navigate(`room/${joinValue.toUpperCase()}`)
    }
  }

  const [joinValue, setJoinValue] = useState('');
  const changeJoinValue = (e : ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^[a-zA-Z]*$/.test(newValue) && newValue.length <= 4) {
      setJoinValue(newValue);
    }
  }

  return (
    <div>
      <button onClick={gotoRoom}>Create Room</button>
      <input
        type="text"
        id="myTextField"
        value={joinValue}
        onChange={changeJoinValue}
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
}
