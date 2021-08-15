import React, { useEffect,useRef,useState } from 'react'
import { connect } from 'dva'
import socket from '@/utils/socket'
import style from './index.less'

const Cameras = () => {
  const videoMine = useRef()
  const videoOther = useRef()
  const [stream, setStream ] = useState()

  // getlocalmedia
  const  getUserMedia =()=> {
    let mineVideo = videoMine.current
    navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(stream=>{
      mineVideo.srcObject = stream
      setStream(stream)
    })
  }

  useEffect(()=>{
    getUserMedia()

    socket.on('me',(id)=>{
      console.log('my id is:',id)
    })

    socket.on('callUser',(data)=>{
      console.log('data',data)
    })

  },[])

  return (
    <div className={style.camerasMain}>
      <div className={style.camera}> 
        <video className={style.videoMine} ref={videoMine}  autoplay="autoplay"></video>
      </div>
      <div className={style.camera} style={{ marginLeft: '100px' }}>
        <video className={style.videoStudent} ref={videoOther}  autoplay="autoplay"></video>
      </div>
    </div>
  )
}

export default Cameras;
