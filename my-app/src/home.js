import React, { useEffect, useState } from 'react';
import { a } from '@react-spring/web';
import { useSpring } from '@react-spring/core';
import { useNavigate } from 'react-router-dom'; // 用于导航
import styles from './styles.module.css';

export default function Home(i) {
  const [flipped, setFlipped] = useState(false);
  const [fly, setFly] = useState(false);
  const navigate = useNavigate();

  // 动画配置
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg) ${fly ? 'translateX(0)' : 'translateX(-100vw)'}`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  // 页面加载时触发动画
  useEffect(() => {
    setFly(true);
    setTimeout(() => setFlipped(true), 1500); // 延迟触发翻转动画
  }, []);

  // 点击后跳转页面
  const handleClick = () => {
    navigate('/i'); // 跳转到新页面
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <a.div
        className={`${styles.c} ${styles.back}`}
        style={{ opacity: opacity.to(o => 1 - o), transform }}
      >
        1
      </a.div>
      <a.div
        className={`${styles.c} ${styles.front}`}
        style={{
          opacity,
          transform,
          rotateX: '180deg',
        }}
      >
        2
      </a.div>
    </div>
  );
}
