import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSocket } from "../services/SocketContext";
import PlayerList from "./PlayerList";

const testDict = {
  a: { name: "player1", isReady: false },
  b: { name: "player2", isReady: true },
  c: { name: "player3", isReady: false },
};

export default function Room() {
  const { roomId } = useParams();
  const socket = useSocket();

  const [playerId, setPlayerId] = useState('a');
  const [playerInfoDict, setPlayerInfoDict] = useState(testDict);

  useEffect(() => {
    socket.emit("room:join", roomId);
    socket.on("room:update", (roomInfo) => {
      setPlayerId(roomInfo.playerId);
      setPlayerInfoDict(roomInfo.playerInfoDict);
    })
    return () => {
      socket.emit("room:leave");
    };
  }, [socket, roomId]);

  const [isReady, setIsReady] = useState(true);
  const toggleState = () => {
    setIsReady(!isReady);
  };

  return (
    <div>
      <p>Room!</p>
      <button onClick={toggleState}>{isReady ? "Ready" : "Unready"}</button>
      <PlayerList playerId={playerId} playerInfoDictionary={playerInfoDict} />
    </div>
  );
}
