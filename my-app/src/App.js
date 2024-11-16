import './App.css';
import { Row, Col, Button } from 'antd';
import { useState } from 'react';
import MapLoader from "./levelSelection"

function App() {
  const [row, setRow] = useState(4)
  const [col, setCol] = useState(3)
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
        <div className="right-top">
          <Button type='primary'>Fun1</Button>
          <Button type='primary'>Fun1</Button>
          <Button type='primary'>Fun1</Button>
          <Button type='primary'>Fun1</Button>
        </div>
        <div className="right-mid">
          {/* 右边底部内容 */}
          右边底部
        </div>
        <div className="right-bottom">
          <Button type='primary'>Start</Button>
          <Button type='primary'>Clear</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
