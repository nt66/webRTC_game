import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';

const Screen = ({children}) => {
  return (
    <div className={styles.screenMain}>
      <div className={styles.gameContainer}>
        {children}
      </div>
    </div>
  )
}
export default Screen;
