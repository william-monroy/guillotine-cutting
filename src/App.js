import React, { useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

const App = ({ width, height, pieces }) => {
  const [patterns, setPatterns] = useState([]);

  const handleCut = () => {
    const sortedPieces = [...pieces].sort((a, b) => b.width - a.width);
    const newPatterns = [];

    while (sortedPieces.length > 0) {
      const piece = sortedPieces.shift();

      let cutWidth = width - piece.width;
      let cutHeight = height - piece.height;

      if (cutWidth < cutHeight) {
        newPatterns.push([
          { x: 0, y: 0, width: width, height: piece.height },
          { x: 0, y: piece.height, width: piece.width, height: cutHeight },
        ]);
      } else {
        newPatterns.push([
          { x: 0, y: 0, width: piece.width, height: height },
          { x: piece.width, y: 0, width: cutWidth, height: piece.height },
        ]);
      }

      const subPiece1 = {
        width: piece.width,
        height: newPatterns[newPatterns.length - 1][0].height,
      };
      const subPiece2 = {
        width: newPatterns[newPatterns.length - 1][1].width,
        height: piece.height,
      };
      sortedPieces.push(subPiece1, subPiece2);
    }

    setPatterns(newPatterns);
  };

  return (
    <>
      <button onClick={handleCut}>Cortar piezas</button>
      <Stage width={width} height={height}>
        <Layer>
          <Rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="#fff"
            stroke="#000"
            strokeWidth={1}
          />
          {patterns.map((pattern, i) => (
            <React.Fragment key={i}>
              {pattern.map((piece, j) => (
                <Rect
                  key={j}
                  x={piece.x}
                  y={piece.y}
                  width={piece.width}
                  height={piece.height}
                  fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // color aleatorio
                  stroke="#000"
                  strokeWidth={1}
                />
              ))}
            </React.Fragment>
          ))}
        </Layer>
      </Stage>
    </>
  );
};

export default App;
