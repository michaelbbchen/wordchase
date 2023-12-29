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
                fill={
                  i < playerInfos[socket.id].line ||
                  (i == playerInfos[socket.id].line &&
                    j < playerInfos[socket.id].index)
                    ? "#ff0000"
                    : "#ffffff"
                }
              />
            );
          });
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
