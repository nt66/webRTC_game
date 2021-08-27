import React, { useEffect,useRef,useState } from 'react'
import { Modal, Button,message } from 'antd'
import { useSelector, useDispatch } from 'dva'
import socket from '@/utils/socket'
import Peer from "simple-peer"
import style from './index.less'

const Cameras = () => {
  const videoMine = useRef()
  const videoOther = useRef()
  const connectionRef = useRef()
  const [receivingCall, setReceivingCall] = useState(false) // 有人call你了
  const [stream, setStream ] = useState() // 音视频流
  const [caller,setCaller] = useState() // 发起者
  const [callerName, setCallerName] = useState() // 发起者名字
  const [callerSignal, setCallerSignal] = useState()
  const dispatch = useDispatch()
  const {
    myName,
    myID,
    otherID,
    otherName,
    calling,
  } = useSelector(({ global}) => ({
    ...global,
  }));

  // getlocalmedia
  const  getUserMedia =()=> {
    let mineVideo = videoMine.current
    navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(stream=>{
      mineVideo.srcObject = stream
      setStream(stream)
    })
  }

  // peerConnection
  const callUser = () => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})

		peer.on("signal", (data) => {
			socket.emit("callUser", {
        userToCall: otherID,
				signalData: data,
				from: myID,
        name:myName,
			})
		})

		peer.on("stream", (stream) => {
      videoOther.current.srcObject = stream
		})

		socket.on("callAccepted", (signal) => {
			peer.signal(signal)
      dispatch({
        type:'global/setCalling',
        payload: false
      })
		})
    socket.on('callReject',()=>{
      message.info('对方已拒绝!!!');
      dispatch({
        type:'global/setCalling',
        payload: false
      })  
    })
		connectionRef.current = peer
	}

  // answer
  const answerCall =()=>{
    setReceivingCall(false)
    
    const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})

    peer.on('signal',(data)=>{
      socket.emit('answerCall',{signal:data, to:caller})
    })

    peer.on('stream',(stream)=>{
      videoOther.current.srcObject = stream
      dispatch({
        type:'global/setCalling',
        payload: false
      })      
    })
    socket.on('callReject',()=>{
      dispatch({
        type:'global/setCalling',
        payload: false
      })  
    })
    peer.signal(callerSignal)
    connectionRef.current = peer 
  }

  // reject
  const rejectCall =()=>{
    setReceivingCall(false)
    socket.emit('rejectCall')
    // dispatch({
    //   type:'global/setCalling',
    //   payload: false
    // })     
  }

  useEffect(()=>{
    getUserMedia()
    socket.on('me',(id)=>{
      // 设置用户的socketID
      dispatch({
        type: 'global/setMyID',
        payload: id,
      });
      console.log('id',id)
    })

    socket.on('callUser',(data)=>{
      setReceivingCall(true)
			setCaller(data.from)
			setCallerSignal(data.signal)
      setCallerName(data.name)
    })
  },[])

  useEffect(()=>{
    if(calling){
      callUser()
    }
  },[calling])

  return (
    <div className={style.camerasMain}>
      <div className={style.camera}> 
        <video className={style.videoMine} ref={videoMine}  autoplay="autoplay"></video>
      </div>
      <div className={style.camera} style={{ marginLeft: '100px' }}>
        <video className={style.videoStudent} ref={videoOther}  autoplay="autoplay"></video>
      </div>
      <Modal
          title="视频邀请"
          visible={receivingCall}
          onOk={answerCall}
          onCancel={rejectCall}
          okText="确认"
          cancelText="取消"
        >
          <p>{callerName} 正邀请你视频通话...是否接受?</p>
        </Modal>
    </div>
  )
}

export default Cameras;