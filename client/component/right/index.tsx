import React, { Component, useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'dva';

import styles from './index.less';

const Right = () => {
  const [tabIdx, setTabIdx] = useState(0);

  // tab切换
  const tabTrigger = (idx: number) => {
    setTabIdx(idx);
  }

  // 内容渲染
  const tabContent = () =>{
    return (
      <div className={styles.myId}>
        <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    )
  }

  return (
    <div className={styles.RightMain}>
      <div className={styles.RightContent}>
        <aside className={styles.aSd} >
          <header>
            <ol className={styles.nav}>
              <li className={styles.navItem} onClick={() => tabTrigger(0)} >
                <span style={{ color: `${tabIdx === 0?'rgb(242, 244, 245)':'rgb(153, 153, 153)'}` }}>连接</span>
                <span className={tabIdx === 0? styles.navUnderline:''}></span>
              </li>
              <li className={styles.navItem} onClick={() => tabTrigger(1)} >
                <span style={{ color: `${tabIdx === 1?'rgb(242, 244, 245)':'rgb(153, 153, 153)'}` }}>消息</span>
                <span className={tabIdx === 1? styles.navUnderline:''}></span>
              </li>
            </ol>
          </header>
          <div className={styles.main}>
            {/* {tabIdx} */}
            { tabContent() }
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Right;