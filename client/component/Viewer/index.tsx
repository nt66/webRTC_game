import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { StepForwardOutlined, StepBackwardOutlined, EditOutlined } from '@ant-design/icons'
import socket from '@/utils/socket'
import { connect } from 'dva'

import styles from './index.less'
import lessonConfig from '@/assets/lesson/01/lessonConfig.json'

const Viewer = () => {
  const [currentIdx, setCurrentIdx] = useState(1) // 当前胶片序号
  const [imgUrl, setImgUrl] = useState(null) // 当前胶片地址
  useEffect(() => {
    const img = require(`@/assets/lesson/01/p${currentIdx}.png`) // 动态获取胶片
    setImgUrl(img) 
  }, [currentIdx])

  useEffect(()=>{
    socket.on('playppt',(data:any)=>{
      flipPage(data)
    })
  },[])

  const flipPage =(data:any)=>{
    const { type, idx} = data
    if (idx >= 0 && idx <= Number(lessonConfig.length)) {
      setCurrentIdx(idx)
    }
  }

  // 轮播
  const play = (type: string) => {
    if (type === 'forward') {
      // 前进
      if (currentIdx+1 > 0 && currentIdx+1 <= Number(lessonConfig.length)) {
        socket.emit('flipOver',{type,idx:currentIdx+1})
      }
    } else {
      // 后退
      if (currentIdx-1 > 0 && currentIdx-1 <= Number(lessonConfig.length)) {
        socket.emit('flipOver',{type,idx:currentIdx-1})
      }
    }
  }

  // 绘图
  const paint = () => {
    
  }

  return (
    <div className={styles.viewer}>
      <div className={styles.pptView}>
        <img src={imgUrl?.default || null} alt="img" />
        <canvas />
      </div>
      <div className={styles.tool} >
        <Button type="primary" shape="circle" onClick={() => play('forward')} icon={<StepForwardOutlined />} style={{ marginBottom: '30px' }}  ></Button>
        <Button type="primary" shape="circle" onClick={() => play('back')} icon={<StepBackwardOutlined />} style={{ marginBottom: '30px' }} ></Button>
        <Button type="primary" shape="circle" onClick={paint} icon={<EditOutlined />} style={{ marginBottom: '30px' }} ></Button>
      </div>
    </div>
  )
}
export default Viewer
