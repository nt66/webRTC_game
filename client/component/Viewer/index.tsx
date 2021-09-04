import React, { Component } from 'react'
import { Button } from 'antd'
import { StepForwardOutlined, StepBackwardOutlined,EditOutlined } from '@ant-design/icons'
import { connect } from 'dva'
import styles from './index.less'
import imgUrl from '@/assets/lesson/01/p1.png';

const Viewer = () => {
  // const imgUrl = await require("@/assets/lesson/01/p1.png")
  return (
    <div className={styles.viewer}>
      <div className={styles.pptView}>
        <img src={imgUrl} alt="img" />
      </div>
      <div className={styles.tool} >
        <Button type="primary" shape="circle"  icon={<StepForwardOutlined />} style={{marginBottom:'30px'}}  ></Button>
        <Button type="primary" shape="circle"  icon={<StepBackwardOutlined />} style={{marginBottom:'30px'}} ></Button>
        <Button type="primary" shape="circle"  icon={<EditOutlined />} style={{marginBottom:'30px'}} ></Button>
      </div>

    </div>
  )
}
export default Viewer;
