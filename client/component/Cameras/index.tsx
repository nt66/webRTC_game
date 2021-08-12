import React, { useEffect,useRef } from 'react';
import { connect } from 'dva';
import socket from '@/utils/socket';
import style from './index.less';

const Cameras = () => {
  const videoMine = useRef(null)
  const videoStudent = useRef(null)

  const  getUserMedia =()=> {
    // 兼容浏览器的getUserMedia写法
    let mineVideo = videoMine.current

    let getUserMedia = (navigator.getUserMedia)
    // 获取本地的媒体流，并绑定到一个audio标签上输出，并且发送这个媒体流给其他客户端
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, {
        'audio': true,
        'video': true
      }, (stream) => {
        // 绑定本地媒体流到audio标签用于输出
        mineVideo.srcObject = stream
        resolve()
      }, function (error) {
        reject(error)
        console.log(error)
        // 处理媒体流创建失败错误
      })
    })
  }

  // const getPeerConnection =()=> {
  //   let audioBox = this.$refs['audio-box']
  //   let iceServer = {
  //     'iceServers': [
  //     ]
  //   }
  //   // 兼容浏览器的PeerConnection写法
  //   let PeerConnection = (window.RTCPeerConnection ||
  //                 window.webkitRTCPeerConnection ||
  //                 window.mozRTCPeerConnection)
  //   // 创建
  //   let peer = new PeerConnection(iceServer)
  //   // 向PeerConnection中加入需要发送的流
  //   peer.addStream(this.localStream)

  //   // 如果检测到媒体流连接到本地，将其绑定到一个audio标签上输出
  //   peer.onaddstream = function (event) {
  //     // console.log('event-stream', event);
  //     let audios = document.querySelector('#' + v.account)
  //     if (audios) {
  //       audios.srcObject = event.stream
  //     } else {
  //       let audio = document.createElement('audio')
  //       audio.controls = true
  //       audio.autoplay = 'autoplay'
  //       audio.srcObject = event.stream
  //       audio.id = v.account
  //       audioBox.append(audio)
  //     }
  //   }
  //   // 发送ICE候选到其他客户端
  //   peer.onicecandidate = (event) => {
  //     if (event.candidate) {
  //       socket.emit('__ice_candidate', {'candidate': event.candidate, roomid: this.$route.params.roomid, account: v.account})
  //     }
  //   }
  //   console.log('v.account', v.account)
  //   this.peerList[v.account] = peer
  // }

  useEffect(()=>{
    getUserMedia().then(()=>{
      socket.emit('join')
    });

    socket.on('join',()=>{
      console.log('joina....')
      // getPeerConnection()
      // console.log('joinb....',b)
    })
  })

  return (
    <div className={style.camerasMain}>
      <div className={style.camera}> 
        <video className={style.videoMine} ref={videoMine}></video>
      </div>
      <div className={style.camera} style={{ marginLeft: '100px' }}>
        <video className={style.videoStudent} ref={videoStudent}></video>
      </div>
    </div>
  )
}

export default Cameras;
