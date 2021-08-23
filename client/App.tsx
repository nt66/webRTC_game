import React from 'react'
import ReactDOM from 'react-dom'
import { Spin } from 'antd'
import { useSelector, useDispatch } from 'dva'
import { Left, Top, Right, Screen, Cameras } from './component'
import app from './models/index'
import styles from './App.less'

const App = () => {
  const dispatch = useDispatch()
  const {
    calling,
  } = useSelector(({ global }) => ({
    ...global,
  }))
  return (
    <>
      <div className={styles.mainV}>
        <Top />
        <div className={styles.mainContent}>
          <Left />
          <div className={styles.screen}>
            <Screen />
            <Cameras />
          </div>
          <Right />
        </div>
      </div>
      {calling && <Spin tip="视频发起中..." className={styles.spin}></Spin>}
    </>
  )
}

app.router(() => <App />)
app.start('#root')

export default App
