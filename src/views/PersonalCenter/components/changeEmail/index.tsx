import React from "react";
import classNames from "classnames/bind";
import styles from './styles.module.scss';
import { Button, Form, Input, Modal, Toast } from "antd-mobile";

const cx = classNames.bind(styles);

interface childProps {
  handleChangeEmail: Function
}
const ChangeEmail: React.FC<childProps> = (props) => {
  //邮箱校验正则表达式
  const reg_userEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
  const [form] = Form.useForm()
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
  //更改邮箱
  const doChangeEmail = () => {
    if (form.getFieldValue('email_1') && form.getFieldValue('email_2')) {
      if (form.getFieldValue('email_1') === form.getFieldValue('email_2')) {
        props.handleChangeEmail(form.getFieldValue('email_1'));
        Toast.show({ icon: 'success', content: '修改邮箱成功!' })
        Modal.clear();
      } else {
        Toast.show({ icon: 'fail', content: '两次输入的邮箱地址不一致!' })
      }
    } else {
      Toast.show({ icon: 'fail', content: '输入的邮箱地址不能为空!' })
    }
  }
  return <div className={cx('main')}><Form layout='horizontal' form={form}>
    <Form.Item
      label='输入邮箱地址'
      name='email_1'
      rules={[{ validator: checkEmail }]}
    >
      <Input placeholder='请输入将要修改的邮箱地址' clearable />
    </Form.Item>
    <Form.Item
      label='再次输入'
      name='email_2'
      rules={[{ validator: checkEmail }]}
      extra={
        <Button color="primary" size="small" onClick={doChangeEmail}>确认更改</Button>
      }
    >
      <Input placeholder='再次确认邮箱地址' clearable />
    </Form.Item>
  </Form></div>
}

export default ChangeEmail;