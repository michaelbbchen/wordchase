import { useState, useEffect } from "react";
import { useSocket } from "../services/SocketContext";
import Canvas from "./Canvas";
export interface GamePlayerState {
  [key: string]: {
    line: number;
    index: number;
    alive: boolean;
    color: string;
  };
}

export default function Game() {
  const socket = useSocket();
  const [lines, setLines] = useState<string[]>([]);
  const [playerInfos, setPlayerInfos] = useState<GamePlayerState>();
  const [end, setEnd] = useState<boolean>(false);

  useEffect(() => {
    socket.on("game:update", (lines, playerInfos) => {
      setLines(lines);
      setPlayerInfos(playerInfos);
    });

    socket.on("game:end", (lines, playerInfos) => {
      setLines(lines);
      setPlayerInfos(playerInfos);
      setEnd(true);
    });
    socket.emit("game:listen");
  }, []);

  const keyPressHandler = (key: string) => {
    socket.emit("game:keypress", key);
  };

  const backToRoomFunction = () => {
    socket.emit("room:rejoin");
  };

  return end ? (
    <div className="flex align-center text-center items-center w-full h-full">
      <div className="w-full h-full">
        {playerInfos && socket.id &&
          (playerInfos[socket.id].alive ? (
            <div className="text-6xl my-6">You win!!!</div>
          ) : (
            <div className="text-6xl my-6">You lose</div>
          ))}
        <button
          className="bg-columbia_blue-300 rounded-xl w-2/3 hover:bg-columbia_blue-200"
          onClick={backToRoomFunction}
        >
          Back to room
        </button>
      </div>
    </div>
  ) : (
    <div className="flex align-center text-center items-center w-full h-full">
      <div className="w-full h-full">
        {playerInfos && (
          <Canvas
            lines={lines}
            playerInfos={playerInfos}
            keyPressHandler={keyPressHandler}
          ></Canvas>
        )}
      </div>
    </div>
  );
}
