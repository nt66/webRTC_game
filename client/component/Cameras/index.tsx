import React, { useEffect,useRef,useState } from 'react'
import { connect } from 'dva'
import socket from '@/utils/socket'
import Peer from "simple-peer"
import style from './index.less'

const Cameras = () => {
  const videoMine = useRef()
  const videoOther = useRef()
  const connectionRef = useRef()
  const [me, setMe] = useState()
  const [stream, setStream ] = useState()
  const [caller,setCaller] = useState()
  const [callerSignal, setCallerSignal] = useState()


  // getlocalmedia
  const  getUserMedia =()=> {
    let mineVideo = videoMine.current
    navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(stream=>{
      mineVideo.srcObject = stream
      setStream(stream)
    })
  }

  // peerConnection
  const callUser = (id) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				signalData: data,
				from: id,
			})
		})

		peer.on("stream", (stream) => {
      console.log('stream',stream)
      videoOther.current.srcObject = stream
		})

		socket.on("callAccepted", (signal) => {
			// setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

  useEffect(()=>{
    getUserMedia()
    // 监听&获取当前用户id
    socket.on('me',(id)=>{
      // console.log('my id is:',id)
      setMe(id)
      callUser(id)
    })
    socket.on('callUser',(data)=>{
      console.log('data',data)
			setCaller(data.from)
			setCallerSignal(data.signal)
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
