import React, { Component, useEffect, useState } from 'react'
import { Form, Input, Button, message } from 'antd';
import { PhoneOutlined, CopyOutlined, CopyFilled } from '@ant-design/icons'
import { CopyToClipboard } from "react-copy-to-clipboard"
import { useSelector, useDispatch } from 'dva'
import styles from './index.less'
const Right = () => {
  const [form] = Form.useForm()
  const [tabIdx, setTabIdx] = useState(0)
  const dispatch = useDispatch()
  // const [validateFields, setFieldsValue] = form

  const {
    myName,
    myID,
    otherID,
    otherName,
  } = useSelector(({ global}) => ({
    ...global,
  }));

  // tab切换
  const tabTrigger = (idx: number) => {
    setTabIdx(idx);
  }

  // 视频发起
  const callUser = () => {
    form.validateFields().then((values) => {
      const { userName, userID } = values
      dispatch({
        type: 'global/callVideo',
        payload: {
          myName: userName,
          otherID: userID,
          calling: true,
        }
      })
    })
  }

  // 本机ID拷贝
  const copyID = () => {
    message.info('拷贝成功!!!');
  }

  // 内容渲染
  const tabContent = () => {
    return (
      tabIdx === 0 && <div className={styles.myId}>
        <Form
          form={form}
          layout="vertical"
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
        >
          <Form.Item
            label="我的名字"
            name="userName"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="对方账号ID"
            name="userID"
          >
            <Input />
          </Form.Item>
          <div className={styles.btns}>
            <CopyToClipboard text={myID} >
              <Button type="dashed" shape="round" icon={<CopyOutlined />} onClick={() => copyID()}>复制我的ID</Button>
            </CopyToClipboard>
            <Button
              type="primary"
              shape="round"
              icon={<PhoneOutlined />}
              style={{marginTop:'20px'}}
              onClick={() => callUser()}
            >视频发起</Button>
          </div>
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
              <li className={styles.navItem} onClick={() => tabTrigger(0)}>
                <span style={{ color: `${tabIdx === 0 ? 'rgb(242, 244, 245)' : 'rgb(153, 153, 153)'}` }}>连接</span>
                <span className={tabIdx === 0 ? styles.navUnderline : ''}></span>
              </li>
              <li className={styles.navItem} onClick={() => tabTrigger(1)} >
                <span style={{ color: `${tabIdx === 1 ? 'rgb(242, 244, 245)' : 'rgb(153, 153, 153)'}` }}>消息</span>
                <span className={tabIdx === 1 ? styles.navUnderline : ''}></span>
              </li>
            </ol>
          </header>
          <div className={styles.main}>
            {tabContent()}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Right;