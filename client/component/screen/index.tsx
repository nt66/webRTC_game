import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';

const Screen = () => {
  return (
    <div className={styles.screenMain}>
      <div className={styles.gameContainer}></div>
    </div>
  )
}
export default Screen;
