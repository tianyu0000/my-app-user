import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Button, Form, Input, Space, TextArea, Toast } from 'antd-mobile';
import { getUserInfo } from '@/utils/storageUtils';
import { UserInfo } from '@/services/entities';
import { useHistory } from 'react-router-dom';
import routerPath from '@/router/router-path';
import { ServicesApi } from '@/services/request-api';

const cx = classNames.bind(styles);

interface childProps {
  inputValue: string,
}
const FeedBack: React.FC<childProps> = ({inputValue}) => {
  const history = useHistory();
  const { sendEmail } = ServicesApi;
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const doSendEmail = () => {
    if (!form.getFieldValue('text') || form.getFieldValue('text').length === 0) {
      Toast.show({ icon: 'fail', content: '内容为空!' })
    } else {
      // sendEmail({})
      Toast.show({ icon: 'success', content: '反馈提交成功!' })
      setTimeout(() => {
        history.replace(routerPath.Order)
      }, 3000)
    }
  }
  useEffect(() => {
    if (history.location.state) {
      //  有值，正常流程，接下来操作：
      const userInfo = getUserInfo();
      setUserInfo(userInfo);
    } else {
      // 没值。错误流程，跳转404？
    }
  }, [])
  return <div className={cx('main')}>
    <div className={cx('top-area')}>
      <Space justify='center' direction='vertical' block>
        <div>尊敬的顾客:{userInfo?.name},您好~</div>
        <Space >
          <div className={cx('vertical-center')}> 您的邮件地址为:</div>
          <Input value={userInfo?.userEmail} readOnly></Input>
        </Space>
        <Space >
          <div className={cx('vertical-center')}> 您要反馈的订单编号为:</div>
          <Input value={userInfo?.userEmail} readOnly></Input>
        </Space>
      </Space>
    </div>

    <Form layout='horizontal' form={form}>
      <Form.Item name='text'>
        <TextArea rows={8} maxLength={150} showCount={true} placeholder='请输入您需要反馈的内容，最大字数为150字。'></TextArea>
      </Form.Item>
    </Form >
    <div className={cx('btn-group')}>
      <Button color='primary' onClick={doSendEmail} >提交反馈</Button>
      <Button color='warning' onClick={() => { history.replace(routerPath.Order) }}  >返回</Button>
    </div>

  </div>;
};

export default FeedBack;
