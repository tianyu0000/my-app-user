import React from "react";
import classNames from "classnames/bind";
import styles from './styles.module.scss';
import { Button, Form, Input, Modal, Toast } from "antd-mobile";
import { ServicesApi } from "@/services/request-api";

const cx = classNames.bind(styles);

interface childProps {
  handleChangePwd: Function
}
const ChangePwd: React.FC<childProps> = (props) => {
  const [form] = Form.useForm()
  //密码格式校验正则表达式
  const reg_passWord = /^[a-zA-Z0-9]{6,16}$/;
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
  //更改密码
  const doChangePwd = () => {
    if (form.getFieldValue('pwd_1') && form.getFieldValue('pwd_2')) {
      if (form.getFieldValue('pwd_1') === form.getFieldValue('pwd_2')) {
        props.handleChangePwd(form.getFieldValue('pwd_1'));
        Toast.show({ icon: 'success', content: '修改密码成功!' })
        Modal.clear();
      } else {
        Toast.show({ icon: 'fail', content: '两次输入的密码不一致!' })
      }
    } else {
      Toast.show({ icon: 'fail', content: '输入的密码不能为空!' })
    }
  }
  return <div className={cx('main')}><Form layout='horizontal' form={form}>
    <Form.Item
      label='输入密码'
      name='pwd_1'
      rules={[{ validator: checkPwd }]}
    >
      <Input placeholder='请输入6-16位数字或英文字母' type='password' clearable />
    </Form.Item>
    <Form.Item
      label='再次确认密码'
      name='pwd_2'
      rules={[{ validator: checkPwd }]}
      extra={
        <Button color="primary" size="small" onClick={doChangePwd}>确认更改</Button>
      }
    >
      <Input placeholder='再次确认密码' type='password' clearable />
    </Form.Item>
  </Form></div>
}

export default ChangePwd;