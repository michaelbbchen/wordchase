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

  const [inGame, setInGame] = useState(false);
  const [countdown, setCountdown] = useState<number | undefined>(undefined);

  useEffect(() => {
    socket.emit("room:join", roomId);

    requestPlayerInfoDict(socket, roomId!).then((playerInfoDict) => {
      setPlayerInfoDict(playerInfoDict);
      setName(playerInfoDict[socket.id!].name);
    });

    socket.on("room:update", (playerInfoDict) => {
      setPlayerInfoDict(playerInfoDict);
    });

    socket.on("game:start", () => {
      setInGame(true);
    });

    socket.on("game:leave", () => {
      setInGame(false);
      setIsReady(false);
    });

    socket.on("room:countdown", (countdown) => {
      if (countdown === null) {
        // for some reason, socket.io passes undefined as null
        setCountdown(undefined);
        return;
      }
      setCountdown(countdown);
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

  return inGame ? (
    <Game />
  ) : (
    <>
      <div className="flex flex-col text-center items-center space-y-3 w-full h-full backdrop-blur-md backdrop-brightness-50">
        <div className="text-snow text-5xl my-6">Room {roomId}</div>
        <div className="flex flex-row w-full">
          <div className="w-1/2">
            <div>
              <div className="text-xl text-snow">Nickname</div>
              {name !== undefined && (
                <input
                  className="text-night p-2 my-2"
                  value={name}
                  maxLength={15}
                  onChange={onTextChange}
                />
              )}
              <br></br>
              <button
                className="bg-sandy_brown-300 w-1/4 rounded-lg py-2 my-10 text-snow"
                onClick={toggleState}
              >
                {isReady ? "Unready" : "Ready Up"}
              </button>
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-center text-snow">
            <div className="text-xl">Players</div>
            <hr className="border-1 border-sandy_brown-900 w-1/3"></hr>
            <div className="my-3">
              {playerInfoDict !== undefined && (
                <PlayerList playerInfoDictionary={playerInfoDict} />
              )}
            </div>
          </div>
        </div>
        {!inGame ? (
          countdown !== undefined ? (
            <div className="absolute left-1/2 bottom-1/2 text-9xl text-snow">
              {countdown}
            </div>
          ) : (
            <div className="absolute bottom-5 text-snow">Waiting for Ready Up...</div>
          )
        ) : (
          <div />
        )}
      </div>
    </>
  );
}
