import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss"
import classNames from "classnames/bind";
import { Button, DotLoading, Form, Input, Toast } from "antd-mobile";
import { useHistory } from "react-router-dom";
import routerPath from "@/router/router-path";
import { UserInfo } from "@/services/entities";
import { ServicesApi } from "@/services/request-api";
import { FORMERR } from "dns";

const cx = classNames.bind(styles);

const ForgetPwd: React.FC = () => {
  const { getUserInfoByName, ChangeUserInfo } = ServicesApi
  const history = useHistory();
  const [userName, setUserName] = useState<string>();
  const UserInfoRef = useRef<UserInfo>();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [visible, setVisible] = useState<boolean>(false);
  const [identity, setIdentity] = useState<boolean>(false);
  const myRef = React.createRef<any>()
  //三个步骤对应的表单
  const [step_1] = Form.useForm();
  const [step_2] = Form.useForm();
  const [step_3] = Form.useForm();
  //密码格式校验正则表达式
  const reg_passWord = /^[a-zA-Z0-9]{6,16}$/;
  //确认用户名
  const doConfirmName = () => {
    if (step_1.getFieldValue('userName') === undefined || step_1.getFieldValue('userName').length === 0) {
      Toast.show({ icon: 'fail', content: '请输入用户名' })
    } else {
      getUserInfoByName({ name: step_1.getFieldValue('userName') }).then(res => {
        if (res) {
          setVisible(true);
          setUserName(step_1.getFieldValue('userName'))
          UserInfoRef.current = res;
          setUserInfo(UserInfoRef.current)
        } else {
          Toast.show({ icon: 'fail', content: '该用户不存在!' })
        }
      })
    }
  }
  //重置用户名
  const doResetName = () => {
    setVisible(false);
    setIdentity(false);
    console.log(document.getElementById('tel'));
    
    setUserName("");
  }
  //确认手机号
  const doConfirmTel = () => {
    if (step_2.getFieldValue('userTelNumber') == UserInfoRef.current?.userTel) {
      setIdentity(true);
    } else {
      Toast.show({ icon: 'fail', content: '手机号错误!请再次尝试!' })
    }
  }

  //更改密码
  const doChangePwd = () => {
    if (step_3.getFieldValue('pwd_1') && step_3.getFieldValue('pwd_2')) {
      if (step_3.getFieldValue('pwd_1') === step_3.getFieldValue('pwd_2')) {
        ChangeUserInfo({
          name: userInfo?.name!,
          password: step_3.getFieldValue('pwd_1')
        })
        Toast.show({
          icon: 'success', duration: 3000, content: <> <div className={cx('center')}>修改密码成功!</div>
            正在跳转至登录页面~<DotLoading /></>
        })

        setTimeout(() => {
          history.replace(routerPath.Login)
        }, 3000)
      } else {
        Toast.show({ icon: 'fail', content: '两次输入的密码不一致!' })
      }
    } else {
      Toast.show({ icon: 'fail', content: '输入的密码不能为空!' })
    }
  }
  //校验密码格式
  const checkPwd = (_: any, value: string) => {
    if (value.length == 0) {
      return Promise.reject(new Error('请输入密码'))
    } else {
      if (reg_passWord.test(value)) {
        return Promise.resolve()
      } else {
        return Promise.reject(new Error('格式错误!请输入6-16位数字或英文字母!'))
      }
    }
  }
  useEffect(() => {

  }, [])
  return <div className={cx('main')}>
    <Form layout='horizontal' form={step_1} >
      <Form.Header >Step 1</Form.Header>
      <Form.Item label='用户名' name='userName' extra={
        <div className={styles.extraPart}>
          {userName ? <a onClick={doResetName}>重置</a> : <a onClick={doConfirmName}>确认</a>}
        </div>} >
        <Input disabled={visible} placeholder='请输入用户名'></Input>
      </Form.Item>
    </Form>
    {userName ? <div>
      <Form form={step_2} layout='horizontal' initialValues={{}}>
        <Form.Header >Step 2</Form.Header>
        <Form.Item label='手机号'>
          <Input placeholder='请输入内容' value={userInfo?.userTel.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')} readOnly />
        </Form.Item>
        <Form.Item 
        label='确认手机号'
          name='userTelNumber'
          extra={
            identity ?<div style={{'color':'green','fontSize':'20px'}}>√</div> :
            <div className={styles.extraPart}>
            <a onClick={doConfirmTel}>确认</a>
          </div>
          }
          >
          <Input id="tel" value="" placeholder='请输入完整手机号码' disabled={identity} />
        </Form.Item>
      </Form>

      {identity ? <div >
        <Form layout="horizontal" form={step_3}>
          <Form.Header>Step 3</Form.Header>
          <Form.Item name='pwd_1' label='输入密码' rules={[{ validator: checkPwd }]}>
            <Input type='password' placeholder="请输入6-16位数字或英文字母"></Input>
          </Form.Item>
          <Form.Item name='pwd_2' label='再次确认' rules={[{ validator: checkPwd }]}>
            <Input type='password' placeholder="再次确认密码"></Input>
          </Form.Item>
        </Form>
        <div className={cx('btn-group')}>
          <Button color="primary" onClick={doChangePwd}>确认修改</Button>
          <Button color="warning" onClick={() => history.replace(routerPath.Login)}>返回登录页面</Button>
        </div>
      </div> : <></>}
    </div> : <div></div>}
  </div>
}

export default ForgetPwd;