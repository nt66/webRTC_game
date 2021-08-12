import React, { useEffect,useRef } from 'react';
import { connect } from 'dva';
import socket from '@/utils/socket';
import style from './index.less';

const Cameras = () => {
  const videoMine = useRef(null);
  const videoStudent = useRef(null);
  // console.log('socket',socket)
  useEffect(()=>{
  //  const  
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
