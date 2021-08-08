import React, { Component, useEffect, useState } from 'react';
import { Input } from 'antd';
import { connect } from 'dva';

import styles from './index.less';

const Right = () => {
  const [tabIdx, setTabIdx] = useState(0);

  // tab切换
  const tabTrigger = (idx: number) => {
    setTabIdx(idx);
  }

  return (
    <div className={styles.RightMain}>
      <div className={styles.RightContent}>
        <aside className={styles.aSd} >
          <header>
            <ol className={styles.nav}>
              <li className={styles.navItem} onClick={() => tabTrigger(0)} >
                <span style={{ color: `${tabIdx === 0?'rgb(242, 244, 245)':'rgb(153, 153, 153)'}` }}>讨论</span>
                <span className={tabIdx === 0? styles.navUnderline:''}></span>
              </li>
              <li className={styles.navItem} onClick={() => tabTrigger(1)} >
                <span style={{ color: `${tabIdx === 1?'rgb(242, 244, 245)':'rgb(153, 153, 153)'}` }}>成员</span>
                <span className={tabIdx === 1? styles.navUnderline:''}></span>
              </li>
            </ol>
          </header>
          <div className={styles.main}>
            {tabIdx}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Right;