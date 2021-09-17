import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import { StepForwardOutlined, StepBackwardOutlined, EditOutlined } from '@ant-design/icons'
import socket from '@/utils/socket'
import { connect } from 'dva'

import styles from './index.less'
import lessonConfig from '@/assets/lesson/01/lessonConfig.json'
let locationArr = [];
const Viewer = () => {
  const canvas2d = useRef(null)
  const [currentIdx, setCurrentIdx] = useState(1) // 当前胶片序号
  const [imgUrl, setImgUrl] = useState(null) // 当前胶片地址

  useEffect(() => {
    const img = require(`@/assets/lesson/01/p${currentIdx}.png`) // 动态获取胶片
    setImgUrl(img)
  }, [currentIdx])

  useEffect(() => {
    socket.on('playppt', (data: any) => {
      flipPage(data)
    })
  }, [])

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
  const mouseEvent = (e:React.MouseEvent) => {
    let ctx = canvas2d.current.getContext('2d');
    e.persist();
    // console.log(canvas2d.current.offsetLeft, canvas2d.current.offsetTop)
    // console.log('eeee',e);
    if (e.type === 'mousedown') {
      locationArr.push([e.pageX-341,e.pageY-135]);
    }
    if (e.type === 'mousemove') {
      locationArr.push([e.pageX-341 , e.pageY-135]);
      ctx.strokeStyle = 'red';
      // ctx.lineJoin = "round";
      ctx.lineWidth = 2;
      ctx.beginPath();
      locationArr.length > 1 && ctx.moveTo(locationArr[locationArr.length - 2][0], locationArr[locationArr.length - 2][1]);
      ctx.lineTo(locationArr[locationArr.length - 1][0], locationArr[locationArr.length - 1][1]);
      ctx.closePath();
      ctx.stroke();  //描边
    }
    if (e.type === 'mouseup') {
      // console.log('locationArr',locationArr);
    }
  }

  // 绘图笔触开关
  const paint = () => {
    // let ctx = canvas2d.current.getContext('2d');
    // console.log(Object.getPrototypeOf(ctx));
    // (function () {
    //     Object.getPrototypeOf(ctx).Triangle = function (x, y, r) {
    //         this.save();
    //         this.translate(x, y);
    //         this.rotate(r);
    //         this.beginPath();
    //         this.moveTo(0, 0);
    //         this.lineTo(10, 0);
    //         this.lineTo(0, 10);
    //         this.lineTo(-10, 0);
    //         this.closePath();
    //         this.fill();
    //         this.restore();
    //     }
    //     Object.getPrototypeOf(ctx).line = function (x, y, x1, y1) {
    //         this.save();
    //         this.beginPath();
    //         this.moveTo(x, y);
    //         this.lineTo(x1, y1);
    //         this.stroke();
    //         this.restore();
    //     }
    // })();
    // ctx.lineWidth = 5;
    // ctx.strokeStyle = "#7C8B8C";
    // ctx.line(0, 0, 420, 410);
    // ctx.Triangle(420, 410, -Math.PI * .4);
  }

  return (
    <div className={styles.viewer}>
      <div className={styles.pptView}>
        {/* <img src={imgUrl?.default || null} alt="img" /> */}
        <canvas
          className={styles.canvas}
          ref={canvas2d}
          onMouseDown={mouseEvent}
          onMouseMove={mouseEvent}
          onMouseUp={mouseEvent}
        />
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
