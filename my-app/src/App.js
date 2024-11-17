import './App.css';
import { Row, Col, Button, Popconfirm } from 'antd';
import { useState, useRef, useEffect } from 'react';
import DisplayBtn from './displayBtn/displayBtn';
import MapLoader from "./levelSelection"
import WorkingSpace from './workingSpace';
import useModal from 'antd/es/modal/useModal';
import { useNavigate } from 'react-router-dom';
import MapRender from "./mapRender";
import { useParams } from 'react-router-dom';
import * as _ from 'lodash'
import cubesData from './cubes.json'; 

function App() {
  const { id } = useParams();
  const i = id;
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const [row, setRow] = useState(4)
  const [col, setCol] = useState(3)
  const [funRow, SetFunRow] = useState(3)
  const [funCol, SetFunCol] = useState(3)
  const [hasReset, setHasReset] = useState(true);//用于记录是否reset过


  const positionRef = useRef({ row: 0, col: 0 });//用于记录当前位置
  const gridRef = useRef({});//用于记录当前地图数据
  const selectedShapeRef = useRef({});//用于记录当前绘制图形数据


  const workspaceRef = useRef(null); // Blockly 工作区实例
  const colorShapeRef = useRef(null); // 用于引用 Gaming 中的 colorShape 方法
  const moveRef = useRef(null); // 用于引用 Gaming 中的 move 方法
  const changeShapeRef = useRef(null);// 用于引用 Gaming 中的 selectShape 方法
  const startAtRef = useRef(null);//用于应用Gaming中的startAt方法
  const resetRef = useRef({});//用于应用Gaming中的Reset方法
  const checkRef = useRef({});//用于应用Gaming中的check方法

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

  const triggerMoveTo = (x, y) => {
    if (startAtRef.current) {
      startAtRef.current(x, y)
    }
  }
  const triggerCheck = () => {
    if (checkRef.current) {
      checkRef.current()
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
    console.log(gridRef.current.map)
    if (!gridRef.current.map.includes("$white")) { //获胜
      //jump to homepage
      // const navigate = useNavigate();

      // const handleNavigate = () => {
      //   navigate('/home');
      // };
    }
    else {//失败
      alert("seems like something to be wrong")
    }
  }


  const handleClear = () => {
    if (workspaceRef.current) {
      workspaceRef.current.clear(); // 清空工作区中的所有块
      setCommand(""); // 清空命令
    }
  } 

  const checkReset = () => {
    if (hasReset) {
      handleStart(command);
      setHasReset(false)
    }
    else { alert("you should reset the map before start a new game") }
  }

  return (
    <div className="container">
      <div className="left">
        <Gaming colorShapeRef={colorShapeRef} moveRef={moveRef} positionRef={positionRef} gridRef={gridRef} changeShapeRef={changeShapeRef}
          selectedShapeRef={selectedShapeRef} startAtRef={startAtRef} resetRef={resetRef} checkRef={checkRef} i={i}></Gaming>
      </div>
      <div className="right">
        <WorkingSpace setCommand={setCommand} workspaceRef={workspaceRef} command={command}></WorkingSpace>
        <div className="right-bottom">
          <Button size='large' type='primary' onClick={() => { checkReset() }}>Start</Button>
          <Button size='large' type='primary' onClick={() => { resetRef.current(0); setHasReset(true) }}>Reset</Button>

          <Popconfirm
            title="Delete the blocks"
            description="Are you sure to claer the workspce?"
            onConfirm={handleClear}
            onCancel={() => { }}
            okText="Yes"
            cancelText="No"
          >
            <Button size='large' type="primary" danger>Clear</Button>
          </Popconfirm>

        </div> 
      </div>
    </div>
  );
}

export default App;




const createGrid = (i) => {
  return MapLoader(i);
};



function Gaming({ colorShapeRef, moveRef, positionRef, gridRef, changeShapeRef, selectedShapeRef, startAtRef, resetRef, checkRef, i }) {
  const customShapes = cubesData[i];
  const [grid, setGrid] = useState(createGrid(i));
  const [currentPosition, setCurrentPosition] = useState({ row: 0, col: 0 });
  const [selectedShape, setSelectedShape] = useState("0"); // 当前选择的自定义形状
  var SIZEX = grid.map.length;
  var SIZEY = grid.map[0].length;
  const [positionChange, setPositionChange] = useState(0)
  // 移动当前位置的函数
  const move = (direction) => {
    let { row, col } = positionRef.current;
    if (direction === "up" && row > 0) row--;
    if (direction === "down" && row < SIZEX - 1) row++;
    if (direction === "left" && col > 0) col--;
    if (direction === "right" && col < SIZEY - 1) col++;
    positionRef.current.row = row;
    positionRef.current.col = col
    let random = Math.random() * 100
    setPositionChange(random)
    console.log(positionRef.current)
  };

  const check = () => {
    return gridRef.current.map[positionRef.current.row][positionRef.current.col].name;
  };

  const startAt = (x, y) => {
    let random = Math.random() * 100
    positionRef.current.row = x;
    positionRef.current.col = y
    setPositionChange(random)
  }
  //初始数据设置
  useEffect(() => {
    gridRef.current = grid;
    selectedShapeRef.current = selectedShape;
    positionRef.current = currentPosition;
  }, [])
  //内部数据更新 
  //
  useEffect(() => {
    setCurrentPosition(positionRef.current)
    setGrid(gridRef.current)
    setSelectedShape(selectedShapeRef);
  }, [positionChange])

  //暴露函数定义
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
    if (startAtRef) {
      startAtRef.current = startAt
    }
    if (resetRef) {
      resetRef.current = resetGame
    }
    if (checkRef) {
      checkRef.current = check
    }
  }, [currentPosition]);

  //重开游戏
  const resetGame = (id) => {
    positionRef.current = { row: 0, col: 0 }
    gridRef.current = createGrid(id)
    selectedShapeRef.current = "L"
    SIZEX = gridRef.current.map.length;
    SIZEY = gridRef.current.map[0].length;
    let random = Math.random() * 100
    setPositionChange(random)
  }

  // 选择自定义形状
  const selectShape = (shape) => {
    selectedShapeRef.current = shape
    let random = Math.random() * 100
    setPositionChange(random)
  };

  // 涂色功能：根据当前选择的自定义形状涂色
  const colorShape = () => {
    let random = Math.random() * 100

    const { row, col } = positionRef.current;
    const shape = customShapes[selectedShapeRef.current];
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
    <div className="grid">{renderGrid()}</div>
  );
}



