import './App.css';
import { Row, Col, Button } from 'antd';
import { useState, useRef, useEffect } from 'react';
import DisplayBtn from './displayBtn/displayBtn';
import MapLoader from "./levelSelection"
import WorkingSpace from './workingSpace';
import useModal from 'antd/es/modal/useModal';
import { useNavigate } from 'react-router-dom';
import MapRender from "./mapRender";

function App() {
  const [row, setRow] = useState(4)
  const [col, setCol] = useState(3)
  const [funRow, SetFunRow] = useState(3)
  const [funCol, SetFunCol] = useState(3)

  const positionRef = useRef({ row: 0, col: 0 });//用于记录当前位置
  const gridRef = useRef({});

  const workspaceRef = useRef(null); // Blockly 工作区实例
  const colorShapeRef = useRef(null); // 用于引用 Gaming 中的 colorShape 方法
  const moveRef = useRef(null); // 用于引用 Gaming 中的 move 方法
  const changeShapeRef = useRef(null);// 用于引用 Gaming 中的 move 方法

  const triggerColorShape = () => {
    if (colorShapeRef.current) {
      colorShapeRef.current(); // 调用 Gaming 组件中的 colorShape 方法
    }
  };

  const triggerMove = (direction) => {
    if (moveRef.current) {
      moveRef.current(direction); // 调用 Gaming 组件中的 colorShape 方法
    }
  };

  const triggerSelectShape = (shape) => {
    if (changeShapeRef.current) {
      changeShapeRef.current(shape)
    }
  }

  const [fun, setFun] = useState()
  const [displayFun, setDisplayFun] = useState({})
  //记录命令的内容
  const [command, setCommand] = useState() 


  const handleStart = (code) => {
    try {
      eval(code);
      window.LoopTrap = 100;
    } catch (e) {
      alert(e);
      window.LoopTrap = 100;
    }
    if (!gridRef.map.includes("$white")) {
      //jump to homepage
      // const navigate = useNavigate();

      // const handleNavigate = () => {
      //   navigate('/home');
      // };
    }
  }


  const handleClear = () => {
    if (workspaceRef.current) {
      workspaceRef.current.clear(); // 清空工作区中的所有块
      setCommand(""); // 清空命令
    }
  } 

  return (
    <div className="container">
      <div className="left" style={{ display: "gird", gridTemplateRows: `repeat(${row}, 1fr)`, gridTemplateColumns: `repeat(${col}, 1fr)` }}>
        <Gaming colorShapeRef={colorShapeRef} moveRef={moveRef} positionRef={positionRef} gridRef={gridRef} changeShapeRef={changeShapeRef}></Gaming>
      </div>
      <div className="right">
        <WorkingSpace setCommand={setCommand} workspaceRef={workspaceRef} command={command}></WorkingSpace>
        <div className="right-bottom">
          <Button type='primary' onClick={() => { handleStart(command) }}>Start</Button>
          <Button type='primary' onClick={() => { handleClear() }}>Clear</Button>
          <Button type='primary'>Reset</Button>

        </div> 
      </div>
    </div>
  );
}

export default App;




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

function Gaming({ colorShapeRef, moveRef, positionRef, gridRef, changeShapeRef }) {
  const [grid, setGrid] = useState(createGrid());
  const [currentPosition, setCurrentPosition] = useState({ row: 0, col: 0 });
  const [selectedShape, setSelectedShape] = useState("L"); // 当前选择的自定义形状
  const SIZEX = grid.map.length;
  const SIZEY = grid.map[0].length;
  const [positionChange, setPositionChange] = useState(0)
  // 移动当前位置的函数
  const move = (direction) => {
    let random = Math.random() * 100
    let { row, col } = positionRef.current;
    if (direction === "up" && row > 0) row--;
    if (direction === "down" && row < SIZEX - 1) row++;
    if (direction === "left" && col > 0) col--;
    if (direction === "right" && col < SIZEY - 1) col++;
    positionRef.current.row = row;
    positionRef.current.col = col
    setPositionChange(random)
    console.log(positionRef.current)
  };

  const check = () => {
    return grid.map[currentPosition.row][currentPosition.col].name;
  };
  const startAt = (x, y) => {
    setCurrentPosition(x, y);
  }
  useEffect(() => {
    gridRef.current = grid;
  }, [])

  useEffect(() => {
    setCurrentPosition(positionRef.current)
    setGrid(gridRef.current)
    console.log('change')
  }, [positionChange])

  useEffect(() => {
    if (colorShapeRef) {
      colorShapeRef.current = colorShape; // 将 colorShape 函数暴露出去
    }
    if (moveRef) {
      moveRef.current = move;// 将 move 函数暴露出去
    }
    if (changeShapeRef) {
      changeShapeRef.current = selectShape;
    }
  }, [currentPosition]);

  // 选择自定义形状
  const selectShape = (shape) => {
    setSelectedShape(shape);
  };

  // 涂色功能：根据当前选择的自定义形状涂色
  const colorShape = () => {
    let random = Math.random() * 100

    const { row, col } = positionRef.current;
    const shape = customShapes[selectedShape];
    const newGrid = JSON.parse(JSON.stringify(gridRef.current)); // 克隆当前的地图
    console.log(row, col, "colorshape")
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

    gridRef.current = (newGrid); // 更新地图
    setPositionChange(random)

  };

  // 渲染地图
  const renderGrid = () => {
    return <MapRender mapData={grid} x={positionRef.current.row} y={positionRef.current.col} />
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



