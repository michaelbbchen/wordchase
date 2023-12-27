import { ChangeEvent, useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { requestPlayerInfoDict } from "../services/socket";
import { useSocket } from "../services/SocketContext";
import Game from "./Game";
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

  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    socket.emit("room:join", roomId);

    requestPlayerInfoDict(socket, roomId!).then((playerInfoDict) => {
      setPlayerInfoDict(playerInfoDict);
      setName(playerInfoDict[socket.id].name);
    });

    socket.on("room:update", (playerInfoDict) => {
      setPlayerInfoDict(playerInfoDict);
    });

    socket.on("game:start", () => {
      setGameStart(true);
    })

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
    <div className="flex flex-col text-center items-center space-y-3">
      <div className="text-snow text-5xl my-6">Room {roomId}</div>
      <div className="flex flex-row w-full">
        <div className="w-1/2">
          {gameStart ? <Game/> :
            <div className="text-xl">Nickname</div>
            {name !== undefined && (
              <input
                className="text-night p-2 my-2"
                value={name}
                maxLength={15}
                onChange={onTextChange}
              />
            )}
          }
          <br></br>
          <button
            className="bg-columbia_blue-300 w-1/4 rounded-lg py-2 my-10"
            onClick={toggleState}
          >
            {isReady ? "Unready" : "Ready Up"}
          </button>
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <div className="text-xl">Players</div>
          <hr className="border-1 border-sandy_brown-900 w-1/3"></hr>
          <div className="my-3">
            {playerInfoDict !== undefined && (
              <PlayerList playerInfoDictionary={playerInfoDict} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
