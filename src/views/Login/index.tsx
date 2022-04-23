import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Button, Dialog, Form, ImageUploader, Input, Modal, Space, Toast } from 'antd-mobile';
import { deleteUserInfo, saveUserInfo } from '@/utils/storageUtils';
import { ServicesApi } from '@/services/request-api';
import { useHistory } from 'react-router-dom';
import routerPath from '@/router/router-path';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
import { upload } from '@/utils/ali-oss';
import { v4 as uuidv4 } from 'uuid';

const cx = classNames.bind(styles);

const Home: React.FC = () => {
  const history = useHistory();
  //手机号校验正则表达式
  const reg_userTel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  //邮箱校验正则表达式
  const reg_userEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
  const [form] = Form.useForm();
  const avatarRef = useRef<string>("");
  const [userName, setUserName] = useState("");
  const [userPwd, setPwd] = useState("");
  const { Login, Register } = ServicesApi;
  const [fileList, setFileList] = useState<ImageUploadItem[]>();
  //登陆
  const login = () => {
    console.log('登录===>userName:' + userName + ",userPwd:" + userPwd);
    if (userName && userPwd) {
      Login({
        name: userName,
        password: userPwd
      }).then((res) => {
        saveUserInfo(res.data)
        console.log(res);
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
  //注册
  const doUserRegister = () => {
    if (form.getFieldValue('pwd_1') === form.getFieldValue('pwd_2')) {
      Register({
        name: form.getFieldValue('name'),
        password: form.getFieldValue('pwd_1'),
        photo: avatarRef.current,
        userTel: form.getFieldValue('userTel'),
        userEmail: form.getFieldValue('userEmail')
      }).then(res => {
        switch (res.status) {
          case 1000:
            Toast.show({ icon: 'success', content: "注册成功!" })
            Modal.clear();
            break;
          case 1001:
            Toast.show({ icon: 'fail', content: "该用户名已注册!" })
            break;
          case 1002:
            Toast.show({ icon: 'fail', content: "注册失败!" })
            break;
          case 1003:
            Toast.show({ icon: 'fail', content: "数据库查询出错!" })
            break;
          case 1004:
            Toast.show({ icon: 'fail', content: "注册失败,未输入账号或密码!" })
            break;
          default:
            console.log(res);
        }
      })
    } else {
      Toast.show({ icon: 'fail', content: '两次输入的密码不一致' });
    }

  }
  //校验手机号
  const checkMobile = (_: any, value: string) => {
    if (value.length == 11) {
      if (reg_userTel.test(value)) {
        return Promise.resolve()
      } else {
        return Promise.reject(new Error('手机号格式错误!'))
      }
    } else {
      return Promise.reject(new Error('请输入11位手机号!'))
    }
  }
  //校验手机号
  const checkEmail = (_: any, value: string) => {
    if (value.length >= 1) {
      if (reg_userEmail.test(value)) {
        return Promise.resolve()
      } else {
        return Promise.reject(new Error('邮箱格式错误!'))
      }
    } else {
      return Promise.reject(new Error('请输入邮箱号!'))
    }
  }
  //忘记密码
  const forgetPwd = () => {
    console.log("忘记密码");
  }
  //上传图片
  const uploadImg = async (file: File) => {
    let objName = uuidv4();
    let res = await upload(`${objName}`, file)
    avatarRef.current = res!;
    return { url: res! }
  }
  useEffect(() => {
    Toast.show({ content: '请登录!' })
  }, [])
  return (<>
    <div>
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
                    content: (<>
                      <Form layout='horizontal' mode='card' form={form}>
                        <ImageUploader
                          value={fileList}
                          onChange={setFileList}
                          upload={uploadImg}
                          maxCount={1}
                          className={cx('avatar')}
                        />
                        <Form.Header>账号:</Form.Header>
                        <Form.Item name="name" rules={[{ required: true }]}>
                          <Input placeholder='请输入' />
                        </Form.Item>
                        <Form.Header>密码:</Form.Header>
                        <Form.Item name="pwd_1" rules={[{ required: true, }]}>
                          <Input placeholder='请输入密码' type='password' />
                        </Form.Item>
                        <Form.Item name="pwd_2" rules={[{ required: true, }]}>
                          <Input placeholder='再次输入密码' type='password' />
                        </Form.Item>
                        <Form.Header>手机号:</Form.Header>
                        <Form.Item name="userTel" rules={[{ validator: checkMobile }]}>
                          <Input placeholder='请输入' />
                        </Form.Item>
                        <Form.Header>电子邮箱:</Form.Header>
                        <Form.Item name="userEmail" rules={[{ validator: checkEmail }]}>
                          <Input placeholder='请输入' />
                        </Form.Item>
                      </Form>
                      <Button color='primary' size='small' onClick={doUserRegister}>注册</Button>
                    </>),
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
        <Form.Item label='密码' name='password' rules={[{ required: true, message: '请输入密码!' }]} >
          <Input placeholder='请输入密码' clearable type='password' onChange={event => { setPwd(event.toString()) }} />
        </Form.Item>
      </Form>
    </div></>);
};

export default Home;
