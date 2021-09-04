import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './index.less'
import imgUrl from '@/assets/lesson/01/p1.png';

const Viewer = () => {
  // const imgUrl = await require("@/assets/lesson/01/p1.png")
  return (
    <div className={styles.viewer}>
      <div>
        <img src={imgUrl} alt="img" />
      </div>
    </div>
  )
}
export default Viewer;
