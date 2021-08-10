import React,{ Component } from 'react';
import icon from '../../assets/game.png';
import styles from './index.less';

const Top = () =>{
  return (
    <div className={styles.topMain}>
      <img className={styles.icon} alt="" src={icon} />
      <div className={styles.projectName}>
        <span>webRTC Game</span>
      </div>
    </div>
  )
}

export default Top