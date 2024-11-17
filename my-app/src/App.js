import './App.css';
import { Row, Col, Button } from 'antd';
import { useState } from 'react';
import DisplayBtn from './displayBtn/displayBtn';
import MapLoader from "./levelSelection"
import WorkingSpace from './workingSpace';
import Gaming from './gaming';

function App() {
  const [row, setRow] = useState(4)
  const [col, setCol] = useState(3)
  const [funRow, SetFunRow] = useState(3)
  const [funCol, SetFunCol] = useState(3)

  const [fun, setFun] = useState()
  const [displayFun, setDisplayFun] = useState({})
  //记录命令的内容
  const [command, setCommand] = useState() 


  const handleStart = (code) => {
    try {
      eval(code);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className="container">
      <div className="left" style={{ display: "gird", gridTemplateRows: `repeat(${row}, 1fr)`, gridTemplateColumns: `repeat(${col}, 1fr)` }}>
        <Gaming></Gaming>
      </div>
      <div className="right">
        <WorkingSpace setCommand={setCommand}></WorkingSpace>
        <div className="right-bottom">
          <Button type='primary' onClick={() => { handleStart(command) }}>Start</Button>
          <Button type='primary'>Clear</Button>
          <Button type='primary'>Reset</Button>

        </div> 
      </div>
    </div>
  );
}

export default App;
