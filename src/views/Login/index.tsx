import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Button, Dialog, Form, ImageUploader, Input, Modal, Space, Toast } from 'antd-mobile';
import { saveUserInfo } from '@/utils/storageUtils';
import { ServicesApi } from '@/services/request-api';
import { useHistory } from 'react-router-dom';
import routerPath from '@/router/router-path';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
import { upload } from '@/utils/ali-oss';
import { v4 as uuidv4 } from 'uuid';
import { url } from 'inspector';

const cx = classNames.bind(styles);

const Home: React.FC = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [userPwd, setPwd] = useState("");
  const { Login } = ServicesApi;
  const [fileList, setFileList] = useState<ImageUploadItem[]>([])
  const urlRef = useRef<string>();
  //登陆
  const login = async () => {
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
            Toast.show({ content: `欢迎您~用户：${userName}` })
            history.push(routerPath.Home);
            break;
          case 1001:
            Toast.show("登陆失败,该用户未注册!")
            break;
          case 1002:
            Toast.show("登录失败,密码错误!")
            break;
          case 1003:
            Toast.show("系统错误,查询数据库失败!")
            break;
          default:
            console.log(res.data);
        }
      });
    } else {
      Toast.show('账号或密码不能为空')
    }
  }
  //注册
  const register = () => {
    console.log('注册');
  }
  //忘记密码
  const forgetPwd = () => {
    console.log("忘记密码");
  }
  //上传图片
  const uploadImg: any = async (file: any) => {
    console.log(file);
    let objName = uuidv4();
    upload(`${objName}`, file).then(res => {
      if (res) {
        urlRef.current = res;
        setFileList([{ url: urlRef.current }]);
      }
    });
    return { url: urlRef.current }
  }

  useEffect(() => {
    console.log(fileList);

  }, [fileList])
  return (<>
    <div>
      <Form layout='vertical'
        footer={
          <Space style={{ '--gap': '50px' }}>
            <Button block color='primary' onClick={login} size='small'>
              登录
            </Button>
            <Button block color='primary' size='small'
              onClick={() =>
                Modal.show({
                  content: (<>
                    <Form layout='horizontal' mode='card'>
                      <ImageUploader
                        onChange={setFileList}
                        upload={uploadImg}
                      />
                      <Form.Header>账号:</Form.Header>
                      <Form.Item>
                        <Input placeholder='请输入' />
                      </Form.Item>
                      <Form.Item label='密码'>
                        <Input placeholder='请输入' type='password' />
                      </Form.Item>
                      <Form.Header />
                      <Form.Item label='手机号'>
                        <Input placeholder='请输入' />
                      </Form.Item>
                      <Form.Item label='邮箱'>
                        <Input placeholder='请输入' />
                      </Form.Item>
                    </Form>
                    <Button color='primary' size='small'>注册</Button>
                  </>),
                  closeOnMaskClick: true,
                })
              }>
              注册
            </Button>
          </Space>

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