import React from "react";
import classNames from "classnames/bind";
import styles from './styles.module.scss';
import { Button, Form, Input, Modal, Toast } from "antd-mobile";

const cx = classNames.bind(styles);

interface childProps {
  handleChangeTel: Function
}
const ChangeTel: React.FC<childProps> = (props) => {
  const [form] = Form.useForm()
  //手机号校验正则表达式
  const reg_userTel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
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
  //更改邮箱
  const doChangeTel = () => {
    if (form.getFieldValue('tel_1') && form.getFieldValue('tel_2')) {
      if (form.getFieldValue('tel_1') === form.getFieldValue('tel_2')) {
        props.handleChangeTel(form.getFieldValue('tel_1'));
        Toast.show({ icon: 'success', content: '修改手机号成功!' })
        Modal.clear();
      } else {
        Toast.show({ icon: 'fail', content: '两次输入的手机号不一致!' })
      }
    } else {
      Toast.show({ icon: 'fail', content: '输入的手机号不能为空!' })
    }
  }
  return <div className={cx('main')}><Form layout='horizontal' form={form}>
    <Form.Item
      label='输入手机号'
      name='tel_1'
      rules={[{ validator: checkMobile }]}
    >
      <Input placeholder='请输入将要修改手机号' clearable />
    </Form.Item>
    <Form.Item
      label='再次输入'
      name='tel_2'
      rules={[{ validator: checkMobile }]}
    >
      <Input placeholder='再次确认手机号' clearable />
    </Form.Item>
  </Form>
    <div className={cx('btn')}>
      <Button color="primary" size="small" onClick={doChangeTel}>确认更改</Button>
    </div>
  </div>
}

export default ChangeTel;