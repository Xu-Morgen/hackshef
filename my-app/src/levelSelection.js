import React, { useState, useEffect } from 'react';

function MapLoader({ levelNumber }) {
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // 从 public/levels.json 获取数据
    fetch('/levels.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch the map data');
        }
        return response.json();
      })
      .then(data => {
        // 获取对应关卡的地图数据
        const levelMapData = data[levelNumber];
        if (levelMapData) {
          setMapData(levelMapData);
        } else {
          throw new Error(`Level ${levelNumber} not found`);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [levelNumber]); // 当关卡编号变动时重新加载

  if (loading) {
    return <p>Loading map data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Map for Level {levelNumber}</h2>
      <Map mapData={mapData}></Map>
    </div>
  );
}


function Map({ mapData }) {
  // 设置地图容器的最大尺寸和每个方块的尺寸
  const blockSize = 40; // 每个方块的像素大小
  const mapSize = 10; // 最大地图大小 10x10
  const containerSize = blockSize * mapSize; // 容器大小
  
  // 获取地图的行列数
  const rows = mapData.map.length;
  const cols = mapData.map[0].length;

  // 计算地图显示的偏移量以便居中
  const horizontalOffset = (containerSize - cols * blockSize) / 2;
  const verticalOffset = (containerSize - rows * blockSize) / 2;
  
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // 满屏高度
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(${rows}, ${blockSize}px)`,
          gridTemplateColumns: `repeat(${cols}, ${blockSize}px)`,
          gap: '1px',
          position: 'relative',
          left: `${horizontalOffset}px`,
          top: `${verticalOffset}px`,
        }}
      >
        {mapData.map.map((row, rowIndex) =>
          row.map((block, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: blockSize,
                height: blockSize,
                backgroundColor: block == "$null" ? 'transparent' : 'white',
                border: block == "$null" ? '1px transparent' : '1px solid #ccc',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {block && <span>{block.name}</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}


export default MapLoader;
