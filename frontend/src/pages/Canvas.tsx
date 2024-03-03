import React, { useState, useEffect } from "react";
import { Stage, Layer, Text, Circle } from "react-konva";
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
    if (socket.id === undefined) {
      return "#000000";
    }

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
      ? "#878787"
      : "#070707";
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {textLines.map((line, i) => {
          return Array.from(line).map((c, j) => {
            return (
              <Text
                text={c}
                x={55+15 * j}
                y={20+25 * i}
                fontSize={20}
                fontFamily = "monospace"
                fill={getFontColor(i, j)}
              />
            );
          });
        })}
      </Layer>
      <Layer>
        {
          Object.entries(playerInfos).map(([key, playerInfo])=>{
            return (
            <Circle
              x={60+15 * playerInfo.index}       // x-coordinate of the center
              y={20+25 * playerInfo.line - 10}       // y-coordinate of the center
              radius={5}   // radius of the circle
              fill={playerInfo.color}    // fill color
              stroke="black" // stroke color
              strokeWidth={2} // stroke width
            />)
          })
        }
      </Layer>
    </Stage>
  );
};

export default Canvas;
