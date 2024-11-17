import React, { useState } from "react";
import "./App.css";
import MapLoader from "./levelSelection";
import MapRender from "./mapRender";


const createGrid = () => {
  return MapLoader(0);
};

// 形状定义（例如L形状，T形状）
const customShapes = {
  "L": [
    [0, 0], [0, 1], [1, 1], [2, 1]  // L形状
  ],
  "T": [
    [0, 0], [0, 1], [0, 2], [1, 1]  // T形状
  ],
  // 你可以在这里继续添加更多自定义形状
};

function Gaming({ }) {
  const [grid, setGrid] = useState(createGrid());
  const [currentPosition, setCurrentPosition] = useState({ row: 0, col: 0 });
  const [selectedShape, setSelectedShape] = useState("L"); // 当前选择的自定义形状
  const SIZEX = grid.map.length;
  const SIZEY = grid.map[0].length;
  // 移动当前位置的函数
  const move = (direction) => {
    let { row, col } = currentPosition;
    if (direction === "up" && row > 0) row--;
    if (direction === "down" && row < SIZEX - 1) row++;
    if (direction === "left" && col > 0) col--;
    if (direction === "right" && col < SIZEY - 1) col++;
    setCurrentPosition({ row, col });
  };

  // 选择自定义形状
  const selectShape = (shape) => {
    setSelectedShape(shape);
  };

  // 涂色功能：根据当前选择的自定义形状涂色
  const colorShape = () => {
    const { row, col } = currentPosition;
    const shape = customShapes[selectedShape];
    const newGrid = JSON.parse(JSON.stringify(grid)); // 克隆当前的地图

    // 检查形状是否越界
    for (let i = 0; i < shape.length; i++) {
      const [r, c] = shape[i];
      const newRow = row + r;
      const newCol = col + c;
      if (newRow >= SIZEX || newRow < 0 || newCol >= SIZEY || newCol < 0) {
        continue;
      }
      newGrid.map[newRow][newCol] = "$filled"; // 在新的位置涂色
    }

    setGrid(newGrid); // 更新地图
  };

  // 渲染地图
  const renderGrid = () => {
    return <MapRender mapData={grid} x={currentPosition.row} y={currentPosition.col} />
  };

  return (
    <div className="App">
      <h1>填色游戏</h1>
      <div className="controls">
        <button onClick={() => move("up")}>上</button>
        <button onClick={() => move("down")}>下</button>
        <button onClick={() => move("left")}>左</button>
        <button onClick={() => move("right")}>右</button>
        <br />
        <button onClick={() => selectShape("L")}>选择L形状</button>
        <button onClick={() => selectShape("T")}>选择T形状</button>
        <br />
        <button onClick={colorShape}>涂色</button>
      </div>
      <div className="grid">{renderGrid()}</div>
    </div>
  );
}

export default Gaming;
