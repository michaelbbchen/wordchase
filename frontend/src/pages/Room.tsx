import { ChangeEvent, useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { requestPlayerInfoDict } from "../services/socket";
import { useSocket } from "../services/SocketContext";
import PlayerList from "./PlayerList";

interface PlayerInfo {
  name: string;
  isReady: boolean;
}

export default function Room() {
  // compiler annotates this as a string | undefined but I'm pretty sure it is always defined
  const { roomId } = useParams<string>();

  const socket = useSocket();

  const [playerInfoDict, setPlayerInfoDict] = useState<
    { [key: string]: PlayerInfo } | undefined
  >(undefined);
  const [name, setName] = useState<string | undefined>(undefined);

  useEffect(() => {
    socket.emit("room:join", roomId);

    requestPlayerInfoDict(socket, roomId!).then((playerInfoDict) => {
      setPlayerInfoDict(playerInfoDict);
      setName(playerInfoDict[socket.id].name);
    });

    socket.on("room:update", (playerInfoDict) => {
      setPlayerInfoDict(playerInfoDict);
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
  }, [socket, isReady]);

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
      <h1>Room {roomId}</h1>
      <button onClick={toggleState}>{isReady ? "Unready" : "Ready"}</button>
      {name !== undefined && (
        <input value={name} maxLength={15} onChange={onTextChange} />
      )}
      {playerInfoDict !== undefined && (
        <PlayerList playerInfoDictionary={playerInfoDict} />
      )}
    </div>
  );
}
