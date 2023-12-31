import React, { useState } from 'react';
import CanvasComponent from './CanvasComponent';

const TestKonva = () => {
  const [lines, setLines] = useState(['Line 1', 'Line 2', 'Line 3']);

  const addLine = () => {
    setLines((prevLines) => [...prevLines, `Line ${prevLines.length + 1}`]);
  };

  return (
    <div>
      <button onClick={addLine}>Add Line</button>
      <CanvasComponent lines={lines} />
    </div>
  );
};

export default TestKonva;
