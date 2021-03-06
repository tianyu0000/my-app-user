import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Button, Form, Input, Space, TextArea, Toast } from 'antd-mobile';
import { getUserInfo } from '@/utils/storageUtils';
import { OrderInfo, UserInfo } from '@/services/entities';
import { useHistory } from 'react-router-dom';
import routerPath from '@/router/router-path';
import { ServicesApi } from '@/services/request-api';

const cx = classNames.bind(styles);

interface childProps {
  inputValue: string,
}
const FeedBack: React.FC<childProps> = ({ inputValue }) => {
  const history = useHistory();
  const { sendEmail } = ServicesApi;
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [orderInfo, setOrderInfo] = useState<OrderInfo>();

  const doSendEmail = () => {
    if (userInfo?.userEmail.length === 0) {
      Toast.show({ icon: 'fail', content: <div className={cx('center')}><div>您尚未设置电子邮箱地址</div><div>请在个人中心页面设置您的邮箱</div></div>,duration:3000 })
    } else {
      if (form.getFieldValue('text') === undefined || form.getFieldValue('text').length === 0) {
        Toast.show({ icon: 'fail', content: '内容为空!' })
      } else {
        sendEmail({
          o_id: orderInfo?.o_id!,
          o_room_id: orderInfo?.o_room_id!,
          username: userInfo?.name!,
          address: userInfo?.userEmail!,
          content: form.getFieldValue('text')
        })
        Toast.show({ icon: 'success', content: '反馈提交成功!' })
        setTimeout(() => {
          history.replace(routerPath.Order)
        }, 3000)
      }
    }
  }
  useEffect(() => {
    if (history.location.state) {
      //  有值，正常流程，接下来操作：
      const userInfo = getUserInfo();
      const orderInfo = history.location.state;
      setUserInfo(userInfo);
      setOrderInfo(orderInfo as OrderInfo)
    } else {
      //没有值,跳转notFind
      history.replace(routerPath.NotFind)
    }
  }, [])
  return <div className={cx('main')}>
    <div className={cx('top-area')}>
      <Space justify='center' direction='vertical' block>
        <div>尊敬的顾客:{userInfo?.name},您好~</div>
        <Space >
          {userInfo?.userEmail ? <div className={cx('vertical-center')}> 您的邮箱地址为:{userInfo?.userEmail}</div> : <div className={cx('vertical-center')}> 您尚未设置电子邮箱地址！</div>}
        </Space>
        <Space >
          <div className={cx('vertical-center')}> 订单编号:{orderInfo?.o_id}</div>
        </Space>
      </Space>
    </div>
    <div className={cx('content')}>
      <Form layout='horizontal' form={form}>
        <Form.Item name='text'>
          <TextArea rows={8} maxLength={150} showCount={true} placeholder='请输入您需要反馈的内容，最大字数为150字。'></TextArea>
        </Form.Item>
      </Form >
    </div>
    <div className={cx('btn-group')}>
      <Button color='primary' onClick={doSendEmail} >提交反馈</Button>
      <Button color='warning' onClick={() => { history.replace(routerPath.Order) }}  >返回</Button>
    </div>

  </div>;
};

export default FeedBack;
