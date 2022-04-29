import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Button, Form, Input, Modal, Space, Toast } from 'antd-mobile';
import { saveUserInfo } from '@/utils/storageUtils';
import { ServicesApi } from '@/services/request-api';
import { useHistory } from 'react-router-dom';
import routerPath from '@/router/router-path';
import UserRegister from './components/UserRegister';

const cx = classNames.bind(styles);

const Login: React.FC = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [userPwd, setPwd] = useState("");
  const { Login } = ServicesApi;
  //登陆
  const login = () => {
    if (userName && userPwd) {
      Login({
        name: userName,
        password: userPwd
      }).then((res) => {
        saveUserInfo(res.data)
        switch (res.status) {
          case 1000:
            Toast.show({ icon: 'success', content: `欢迎您~用户：${res.data.name}` })
            history.push(routerPath.Home);
            break;
          case 1001:
            Toast.show({ icon: 'fail', content: "登陆失败,该用户未注册!" })
            break;
          case 1002:
            Toast.show({ icon: 'fail', content: "登录失败,密码错误!" })
            break;
          case 1003:
            Toast.show({ icon: 'fail', content: "系统错误,查询数据库失败!" })
            break;
          case 1004:
            Toast.show({ icon: 'fail', content: "登陆失败,未输入账号或密码!" })
            break;
          default:
            console.log(res.data);
        }
      });
    } else {
      Toast.show({ icon: 'fail', content: '账号或密码不能为空' })
    }
  }
  useEffect(() => {
    Toast.show({ duration: 1000, content: '请登录!' })
  }, [])
  return (
    <div className={cx('main')}>
      <Form layout='horizontal'
        footer={
          <div className={cx('btn-group')}>
            <Space >
              <Button block color='primary' onClick={login} size='small' className={cx('login-btn')}>
                登录
              </Button>
              <Button block color='primary' size='small' className={cx('register-btn')}
                onClick={() =>
                  Modal.show({
                    content: (<UserRegister />),
                    closeOnMaskClick: true,
                    showCloseButton: true,
                  })
                }>
                注册
              </Button>
            </Space>
          </div>
        }>
        <Form.Item label='用户名' name='username' rules={[{ required: true, message: '请输入ID!' }]}>
          <Input placeholder='请输入用户ID' clearable onChange={event => { setUserName(event.toString()) }} />
        </Form.Item>
        <Form.Item label='密码' name='password' rules={[{ required: true, message: '请输入密码!' }]}
          extra={
            <div onClick={() => history.replace(routerPath.ForgetPwd)} className={styles.extraPart}>
              <a>忘记密码</a>
            </div>} >
          <Input placeholder='请输入密码' clearable type='password' onChange={event => { setPwd(event.toString()) }} />
        </Form.Item>
      </Form>
    </div>);
};

export default Login;
