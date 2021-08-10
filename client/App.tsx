import React from 'react';
import ReactDOM from 'react-dom';
import { Left, Top, Right, Screen, Cameras } from './component';
import app from './models/index';
import styles from './App.less';

const App = () => {
  return (
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
  )
}

app.router(() => <App />);
app.start('#root');
