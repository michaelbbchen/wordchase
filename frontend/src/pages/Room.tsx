import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSocket } from "../services/SocketContext";

export default function Room() {
  const { roomId } = useParams();

  const socket = useSocket();
  const [isReady, setIsReady] = useState(true);
  const toggleState = () => {
    socket.emit("room:join", {
      roomId: roomId,
    });
    setIsReady(!isReady);
  };

  return (
    <div>
      <p>Room!</p>
      <button onClick={toggleState}>{isReady ? "Ready" : "Unready"}</button>
    </div>
  );
}
