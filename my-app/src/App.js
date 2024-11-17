import './App.css';
import { Row, Col, Button } from 'antd';
import { useState } from 'react';
import DisplayBtn from './displayBtn/displayBtn';
import MapLoader from "./levelSelection"
import { List, use } from 'echarts';
import WorkingSpace from './workingSpace';

function App() {
  const [row, setRow] = useState(4)
  const [col, setCol] = useState(3)
  const [funRow, SetFunRow] = useState(3)
  const [funCol, SetFunCol] = useState(3)

  const [fun, setFun] = useState()
  const [displayFun, setDisplayFun] = useState({})

  const [command, setCommand] = useState() 
  return (
    <div className="container">
      <div className="left" style={{ display: "gird", gridTemplateRows: `repeat(${row}, 1fr)`, gridTemplateColumns: `repeat(${col}, 1fr)` }}>
        {/* {[...Array(row * col)].map((_, index) => (
          <div key={index} className="grid-item">
            {`Item ${index + 1}`}
          </div>
        ))} */}
        <MapLoader levelNumber={0} />
      </div>
      <div className="right">
        {/* <div className="right-top" style={{ display: "gird", gridTemplateRows: `repeat(${funRow}, 1fr)`, gridTemplateColumns: `repeat(${funCol}, 1fr)` }}>


        </div>
        <div className="right-mid">
           右边底部内容
          右边底部
        </div>
        <div className="right-bottom">
          <Button type='primary'>Start</Button>
          <Button type='primary'>Clear</Button>

        </div> */}

        <WorkingSpace setCommand={setCommand}></WorkingSpace>
        <div className="right-bottom">
          <Button type='primary' onClick={() => { alert(command) }}>Start</Button>
          <Button type='primary'>Clear</Button>

        </div> 
      </div>
    </div>
  );
}

export default App;
