import React, { useState, useEffect } from 'react';
function MapRender({ mapData, x, y }) {
  console.log(mapData.map[x][y])
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
                backgroundColor: block == "$null" ? 'transparent' : (block == "$filled" ? 'black' : 'white'),
                border: block == "$null" ? '1px transparent' : (x == rowIndex && y == colIndex ? '2px solid red' : '1px solid black'),
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

export default MapRender;