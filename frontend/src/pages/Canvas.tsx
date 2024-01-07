import React, { useState, useEffect } from "react";
import { Stage, Layer, Text } from "react-konva";
import { useSocket } from "../services/SocketContext";
import { GamePlayerState } from "./Game";

interface CanvasProps {
  lines: string[];
  playerInfos: GamePlayerState;
  keyPressHandler: (key: string) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  lines,
  playerInfos,
  keyPressHandler,
}) => {
  const socket = useSocket();
  const [textLines, setTextLines] = useState<string[]>(lines);

  useEffect(() => {
    setTextLines(lines);
  }, [lines]);

  document.onkeydown = (e) => {
    keyPressHandler(e.key);
  };

  const getFontColor = (line: number, index: number): string => {
    if (
      line === playerInfos[socket.id].line &&
      index === playerInfos[socket.id].index
    ) {
      return "#00ff00";
    }

    for (let playerId in playerInfos) {
      if (
        playerInfos[playerId].line === line &&
        playerInfos[playerId].index === index
      ) {
        return playerInfos[playerId].color;
      }
    }

    return line < playerInfos[socket.id].line ||
      (line === playerInfos[socket.id].line &&
        index < playerInfos[socket.id].index)
      ? "#474747"
      : "#ffffff";
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {textLines.map((line, i) => {
          return Array.from(line).map((c, j) => {
            return (
              <Text
                text={c}
                x={100 + 30 * j}
                y={100 + 25 * i}
                fontSize={20}
                fill={getFontColor(i, j)}
              />
            );
          });
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
