import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Text } from 'react-konva';

interface CanvasProps {
  lines: string[];
}

const CanvasComponent: React.FC<CanvasProps> = ({ lines }) => {
  const [textLines, setTextLines] = useState<string[]>(lines);
  const textRef = useRef<Text>();

  useEffect(() => {
    // Update text lines when lines prop changes
    setTextLines(lines);
  }, [lines]);

  useEffect(() => {
    // Shift lines upwards when a new line is added
    const linesCount = textLines.length;
    //const lineHeight = textRef.current.lineHeight();
    const maxLines = 3;

    if (linesCount > maxLines) {
    // Remove the top line
    setTextLines((prevLines) => prevLines.slice(1));
    }
  }, [textLines]);

  return (
    <Stage width={400} height={200}>
      <Layer>
        <Text
          //ref={textRef}
          x={10}
          y={10}
          text={textLines.join('\n')}
          fontSize={20}
          fill="#000000"
        />
      </Layer>
    </Stage>
  );
};

export default CanvasComponent;
