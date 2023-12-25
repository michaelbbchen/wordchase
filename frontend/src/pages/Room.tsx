import React, { ChangeEvent, useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { requestInitialPlayerDict, requestPlayerId } from "../services/socket";
import { useSocket } from "../services/SocketContext";
import PlayerList from "./PlayerList";

const testDict = {
  a: { name: "player1", isReady: false },
  b: { name: "player2", isReady: true },
  c: { name: "player3", isReady: false },
};

interface PlayerInfo {
  name: string;
  isReady: boolean;
}

export default function Room() {
  const { roomId } = useParams();
  const socket = useSocket();

  const [playerId, setPlayerId] = useState("a");
  const [playerInfoDict, setPlayerInfoDict] = useState<{ [key: string]: PlayerInfo }>(testDict);
  const [name, setName] = useState<string | undefined>(undefined);

  useEffect(() => {
    socket.emit("room:join", roomId);

    requestInitialPlayerDict(socket, roomId!).then((playerInfoDict) => {
      setPlayerInfoDict(playerInfoDict);
      requestPlayerId(socket).then((playerId) => {
        setPlayerId(playerId);
        setName(playerInfoDict[playerId].name);
        console.log(name);
      });
    });    

    socket.on("room:update", (roomInfo) => {
      setPlayerInfoDict(roomInfo);
    });
    
    return () => {
      socket.emit("room:leave");
    };
  }, [socket, roomId]);

  const [isReady, setIsReady] = useState(false);
  const toggleState = () => {
    setIsReady(!isReady);
  };

  useEffect(() => {
    socket.emit("room:setReady", isReady);
  }, [isReady]);


  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    let regex = /^[0-9a-zA-Z]+$/;
    if (val.match(regex) || val === "") {
      socket.emit("room:changeName", val);
      setName(val);
    }
  };

  return (
    <div>
      <p>Room!</p>
      <button onClick={toggleState}>{isReady ? "Unready" : "Ready"}</button>
      {name !== undefined && (
        <div>
          <input value={name} maxLength={15} onChange={onTextChange} />
          <PlayerList
            playerId={playerId}
            playerInfoDictionary={playerInfoDict}
          />{" "}
        </div>
      )}
    </div>
  );
}
