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
  },[socket]);

  const keyPressHandler = (key: string) => {
    socket.emit("game:keypress", key);
  };

  const backToRoomFunction = () => {
    socket.emit("room:rejoin");
  };

  return end ? (
    <div className="flex align-center text-center items-center w-full h-full">
      <div className="w-full h-1/2 text-snow">
        {/* We should replace this with a leaderboard */}
        {playerInfos && socket.id &&
          (playerInfos[socket.id].alive ? (
            <div className="text-6xl my-6">You win!</div>
          ) : (
            <div className="text-6xl my-6">You lost!</div>
          ))}
        <button
          className="bg-columbia_blue-300 rounded-xl w-1/5 hover:bg-columbia_blue-200 text-night"
          onClick={backToRoomFunction}
        >
          Back to room
        </button>
      </div>
    </div>
  ) : (
    <div className="flex justify-center align-center text-center items-center w-full h-full overflow-hidden">
      <div className="h-1/2 w-1/2">
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
