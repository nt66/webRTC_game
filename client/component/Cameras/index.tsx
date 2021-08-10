import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';

const Cameras = () => {
  return (
    <div className={styles.camerasMain}>
      <div className={styles.camera}></div>
      <div className={styles.camera} style={{ marginLeft: '100px' }}></div>
    </div>
  )
}

export default Cameras;
