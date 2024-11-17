import React, { useState, useEffect } from 'react';

import levelsData from './levels.json'; 

const MapLoader = (levelNumber) => {
  const level = levelsData[levelNumber];
  return (level);
};
export default MapLoader;
