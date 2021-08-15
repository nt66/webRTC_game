import React, { useEffect,useRef } from 'react';
import { connect } from 'dva';
import socket from '@/utils/socket';
import style from './index.less';

const Cameras = () => {
  const videoMine = useRef(null)
  const videoStudent = useRef(null)

  // getlocalmedia
  const  getUserMedia =()=> {
    // 兼容浏览器的getUserMedia写法
    let mineVideo = videoMine.current
    let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia )
    // 获取本地的媒体流，并绑定到一个audio标签上输出，并且发送这个媒体流给其他客户端
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, {
        'audio': true,
        'video': true
      }, (stream) => {
        // 绑定本地媒体流到video标签用于输出
        mineVideo.srcObject = stream
        resolve()
      }, function (error) {
        reject(error)
        console.log(error)
        // 处理媒体流创建失败错误
      })
    })
  }

  // peerConnection
  const getPeerConnection =()=> {

  }

  useEffect(()=>{
    getUserMedia().then(()=>{
      socket.emit('join')
    });

    socket.on('join',()=>{
      getPeerConnection()
    })
  })

  return (
    <div className={style.camerasMain}>
      <div className={style.camera}> 
        <video className={style.videoMine} ref={videoMine}  autoplay="autoplay"></video>
      </div>
      <div className={style.camera} style={{ marginLeft: '100px' }}>
        <video className={style.videoStudent} ref={videoStudent}  autoplay="autoplay"></video>
      </div>
    </div>
  )
}

export default Cameras;
