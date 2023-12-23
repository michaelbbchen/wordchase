import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSocket } from "../services/SocketContext";

export default function Room() {
  const { roomId } = useParams();
  const socket = useSocket();

  const [isReady, setIsReady] = useState(true);
  useEffect(() => {
    socket.emit("room:join", {
      roomId: roomId,
    });

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // This emit triggers when the tab is closed
      socket.emit("room:leave", {
        roomId: roomId,
      });
      // const message = 'Are you sure you want to leave?';
      // e.returnValue = message; // Standard for most browsers
      // return message; // For some older browsers
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // This emit triggers when you join a room then go back to home page
      // I think if we can make this page not be loaded prematurely, we only need the other emit
      socket.emit("room:leave", {
        roomId: roomId,
      });
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  })

  const toggleState = () => {
    setIsReady(!isReady);
    //genuinely no clue why this is not being triggered
    socket.emit("room:toggleReady", {
      roomId: roomId,
      isReady: isReady,
    });
  };

  return (
    <div>
      <p>Room!</p>
      <button onClick={toggleState}>{isReady ? "Ready" : "Unready"}</button>
    </div>
  );
}
