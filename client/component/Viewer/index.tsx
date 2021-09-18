import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import { StepForwardOutlined, StepBackwardOutlined, EditOutlined } from '@ant-design/icons'
import socket from '@/utils/socket'
import { connect } from 'dva'

import styles from './index.less'
import lessonConfig from '@/assets/lesson/01/lessonConfig.json'
const Viewer = () => {
  const canvas2d = useRef(null) // canvas ref
  const [currentIdx, setCurrentIdx] = useState(1) // 当前胶片序号
  const [imgUrl, setImgUrl] = useState(null) // 当前胶片地址
  const [locationArr,setLocaltionArr] = useState([]) // 路径
  const [isDraw, setIsDraw ] = useState(false) // 是否绘图状态

  useEffect(() => {
    const img = require(`@/assets/lesson/01/p${currentIdx}.png`) // 动态获取胶片
    setImgUrl(img)
  }, [currentIdx])

  useEffect(() => {
    socket.on('playppt', (data: any) => {
      flipPage(data)
    })
  }, [])

  // 翻页边界
  const flipPage = (data: any) => {
    const { type, idx } = data
    if (idx >= 0 && idx <= Number(lessonConfig.length)) {
      setCurrentIdx(idx)
    }
  }

  // 轮播
  const play = (type: string) => {
    if (type === 'forward') {
      // 前进
      if (currentIdx + 1 > 0 && currentIdx + 1 <= Number(lessonConfig.length)) {
        socket.emit('flipOver', { type, idx: currentIdx + 1 })
      }
    } else {
      // 后退
      if (currentIdx - 1 > 0 && currentIdx - 1 <= Number(lessonConfig.length)) {
        socket.emit('flipOver', { type, idx: currentIdx - 1 })
      }
    }
  }

  // 绘图
  // 44 55  1899 1098
  const mouseEvent = (e:React.MouseEvent) => {
    let ctx = canvas2d.current.getContext('2d')
    e.persist()
    // console.log(canvas2d.current.offsetLeft, canvas2d.current.offsetTop)
    if (e.type === 'mousedown' ) {
      setIsDraw(true)
      console.log('e:::',e.pageX,e.pageY)
      locationArr.push([e.pageX-41, e.pageY-52])
    }
    if (e.type === 'mousemove' && isDraw){
      locationArr.push([e.pageX-41, e.pageY-52])
      ctx.strokeStyle = 'red'
      ctx.lineJoin = "round"
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(locationArr[locationArr.length-2][0], locationArr[locationArr.length-2][1])
      ctx.lineTo(locationArr[locationArr.length - 1][0], locationArr[locationArr.length - 1][1])
      ctx.closePath()
      ctx.stroke()
    }
    if (e.type === 'mouseup') {
      setIsDraw(false)
      locationArr = []
    }
  }

  // 绘图笔触开关
  const paint = () => {
    // setIsDraw(true)
  }

  return (
    <div className={styles.viewer}>
      <div className={styles.pptView}>
        <img src={imgUrl?.default || null} alt="img" />
        <canvas
          width="1855"
          height="1043"
          className={styles.canvas}
          ref={canvas2d}
          onMouseDown={mouseEvent}
          onMouseMove={mouseEvent}
          onMouseUp={mouseEvent}
        />
      </div>
      <div className={styles.tool} >
        <Button type="primary" shape="circle" onClick={() => play('forward')} icon={<StepForwardOutlined />} style={{ marginBottom: '30px' }} ></Button>
        <Button type="primary" shape="circle" onClick={() => play('back')} icon={<StepBackwardOutlined />} style={{ marginBottom: '30px' }} ></Button>
        <Button type="primary" shape="circle" onClick={paint} icon={<EditOutlined />} style={{ marginBottom: '30px' }} ></Button>
      </div>
    </div>
  )
}
export default Viewer
