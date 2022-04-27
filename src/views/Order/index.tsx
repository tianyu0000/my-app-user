import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Button, Card, Empty, Popover, SafeArea, Toast } from 'antd-mobile';
import {
  CloseOutline,
  HandPayCircleOutline,
  FillinOutline,
  TransportQRcodeOutline,
} from 'antd-mobile-icons'
import { ServicesApi } from '@/services/request-api';
import { OrderInfo } from '@/services/entities';
import { Action } from 'antd-mobile/es/components/popover'
import { List } from 'rc-field-form';
import { useHistory } from 'react-router-dom';
import routerPath from '@/router/router-path';

const cx = classNames.bind(styles);
interface childProps {
  handleRes: Function;
}
const Order: React.FC<childProps> = ({handleRes}) => {
  const history = useHistory();
  const { getOrdersByUserId } = ServicesApi;
  const [orderList, setOrderList] = useState<OrderInfo[]>([]);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>();
  const refMap = useRef<OrderInfo>();
  //o_state===1
  const actions_notPay: Action[] = [
    { key: 'payment', icon: <HandPayCircleOutline />, text: '付款', onClick: () => { doPayOrder() } },
    { key: 'cancelOrder', icon: <CloseOutline />, text: '取消订单', onClick: () => { doCancelOrder() } },
  ]
  //o_state===2
  const actions_notCheck: Action[] = [
    { key: 'cancelOrder', icon: <CloseOutline />, text: '取消订单', onClick: () => { doCancelOrder() } },
  ]
  //o_state===4
  const actions_finishOrder: Action[] = [
    { key: 'feedback', icon: <FillinOutline />, text: '订单反馈', onClick: () => { doOrderFeedBack() } }
  ]

  //根据用户id获取所有订单
  const doOrdersByUserId = () => {
    getOrdersByUserId({
      o_user_id: "1111"
    }).then((res) => {
      res.map((item, index) => {
        Object.assign(item, {
          key: index + 1
        })
      })
      setOrderList(res);
    })
  }
  //订单付款
  const doPayOrder = () => {
    // console.log('付款');

  }
  //订单反馈
  const doOrderFeedBack = () => {
    // history.replace(routerPath.FeedBack,orderInfo);
  }
  //取消订单
  const doCancelOrder = () => {

  }
  useEffect(() => {
    doOrdersByUserId();

  }, [])
  return <div className={cx('main')}> {orderList.length === 0 ?
    <Empty
      style={{ padding: '64px 0' }}
      imageStyle={{ width: 128 }}
      description='暂无订单'
    /> :
    <div> {orderList.map((item, index) =>
      <div key={index} className={cx('card')}>
        <Card title={'房间号:' + item.o_room_id} key={index} bodyClassName={cx('card-body')}>
          <div className={cx('card-content')}>
            <div>订单号: {item.o_id}</div>
            <div>订单价格: {item.o_money} 元</div>
            <div>订单创建时间: {item.o_createDate}</div>
            <div>订单状态: {item.o_state === 1 ? <span className={cx('warning')}>待支付···</span> : (item.o_state === 2 ? <span className={cx('warning')}>已支付,待核销···</span> : (item.o_state === 4 ? <span className={cx('success')}>订单完成√</span> : <span className={cx('fail')}>订单已取消×</span>))}</div>
          </div>
          <div className={cx('action-btn')}>
            <Popover.Menu
              mode='dark'
              actions={item.o_state === 1 ? actions_notPay : (item.o_state === 2 ? actions_notCheck : (item.o_state === 4 ? actions_finishOrder : []))}
              placement='left-start'
              trigger='click'
            >
              <Button color='primary' size='small' disabled={item.o_state === 3 ? true : false} onClick={() => { setOrderInfo(item)}}>操作</Button>
            </Popover.Menu>
          </div>
        </Card>
      </div>
    )}</div>}
  </div>
    ;
};

export default Order;
