import React, { useRef, useState } from "react";
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Button, Form, ImageUploader, Input, Modal, Toast } from "antd-mobile";
import { ServicesApi } from "@/services/request-api";
import { ImageUploadItem } from "antd-mobile/es/components/image-uploader";
import { v4 as uuidv4 } from 'uuid';
import { upload } from '@/utils/ali-oss';

const cx = classNames.bind(styles);

const UserRegister: React.FC = () => {
  //手机号格式校验正则表达式
  const reg_userTel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  //邮箱格式校验正则表达式
  const reg_userEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
  //用户名格式校验正则表达式
  const reg_useName = /^[a-zA-Z0-9_-]{3,15}$/;
  //密码格式校验正则表达式
  const reg_passWord = /^[a-zA-Z0-9]{6,16}$/;
  const [form] = Form.useForm();
  const avatarRef = useRef<string>("");
  const { Register } = ServicesApi;
  const [fileList, setFileList] = useState<ImageUploadItem[]>();
  //上传图片
  const uploadImg = async (file: File) => {
    let objName = uuidv4();
    let res = await upload(`${objName}`, file)
    avatarRef.current = res!;
    return { url: res! }
  }
  //校验手机号格式
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
  //校验邮箱格式
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
  //校验用户名格式
  const checkUserName = (_: any, value: string) => {
    if (value.length == 0) {
      return Promise.reject(new Error('请输入用户名!'))
    } else {
      if (reg_useName.test(value)) {
        return Promise.resolve()
      } else {
        return Promise.reject(new Error('格式错误!用户名由3-15位英文大小写、数字、下划线"_"组成!'))
      }
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
  //注册
  const doUserRegister = () => {
    if (form.getFieldValue('pwd_1') === form.getFieldValue('pwd_2')) {
      if((form.getFieldValue('userTel')===undefined || form.getFieldValue('userTel').length===0)){
        Toast.show({icon:'fail',content:'手机号不能为空'})
      }else{
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
      }
    } else {
      Toast.show({ icon: 'fail', content: '两次输入的密码不一致' });
    }

  }
  return <div className={cx('main')}>
    <Form layout='horizontal' mode='card' form={form} >
      <div className={cx('avatar')}>
        <ImageUploader
          value={fileList}
          onChange={setFileList}
          upload={uploadImg}
          maxCount={1}
        />
      </div>
      <Form.Header>用户名:</Form.Header>
      <Form.Item name="name" rules={[{ validator: checkUserName }]}>
        <Input placeholder='请输入' />
      </Form.Item>
      <Form.Header>密码:</Form.Header>
      <Form.Item name="pwd_1" rules={[{ validator: checkPwd, }]}>
        <Input placeholder='请输入密码' type='password' />
      </Form.Item>
      <Form.Item name="pwd_2" rules={[{ validator: checkPwd, }]}>
        <Input placeholder='请再次输入密码' type='password' />
      </Form.Item>
      <Form.Header>手机号:</Form.Header>
      <Form.Item name="userTel" rules={[{ required:true,validator: checkMobile }]}>
        <Input placeholder='请输入' />
      </Form.Item>
      <Form.Header>电子邮箱:</Form.Header>
      <Form.Item name="userEmail" rules={[{ validator: checkEmail }]}>
        <Input placeholder='请输入' />
      </Form.Item>
    </Form>
    <div className={cx('register-btn')}>
      <Button color='primary' size='middle' onClick={doUserRegister} >注册</Button>
    </div>
  </div>;
}

export default UserRegister;