import { useState, useEffect } from "react";
import { useSocket } from "../services/SocketContext";
import Canvas from "./Canvas";
export interface GamePlayerState {
  [key: string]: {
    line: number;
    index: number;
    alive: boolean;
  };
}

export default function Game() {
  const socket = useSocket();
  const [lines, setLines] = useState<string[]>([]);
  const [playerInfos, setPlayerInfos] = useState<GamePlayerState>();

  useEffect(() => {
    socket.on("game:update", (lines, playerInfos) => {
      setLines(lines);
      setPlayerInfos(playerInfos);
    });
    socket.emit("game:listen");
  }, []);

  const keyPressHandler = (key: string) => {
    socket.emit("game:keypress", key);
  };

  return (
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
