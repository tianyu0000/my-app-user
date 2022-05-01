import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';
import routerPath from '@/router/router-path';
import { RoomInfo, UserInfo } from '@/services/entities';
import Icon_1 from '@/assets/icon_1.png'
import Icon_2 from '@/assets/icon_2.png'
import Icon_3 from '@/assets/icon_3.png'
import Icon_4 from '@/assets/icon_4.png'
import { Button, NavBar, Swiper, Image, ImageViewer, Divider, Empty, Form, Toast } from 'antd-mobile';
import DatePick from './components/DatePicker';
import { ServicesApi } from '@/services/request-api';
import { v4 as uuidv4 } from 'uuid'
import { getUserInfo } from '@/utils/storageUtils';
import moment from 'moment'
import CountDownText from './components/LoadingToast';

const cx = classNames.bind(styles);
interface Date {
  date_start: string,
  date_end: string
}
const Room: React.FC = () => {
  const [form] = Form.useForm()
  const { createOrder, getRoomDetail, updateRoomDate } = ServicesApi;
  const history = useHistory();
  const [roomInfo, setRoomInfo] = useState<RoomInfo>();
  const [roomInfo_new, setRoomInfo_new] = useState<RoomInfo>();
  const [userInfo, serUserInfo] = useState<UserInfo>();
  const [visible, setVisible] = useState(false)

  const getRoomDetailById = (key: RoomInfo) => {
    getRoomDetail({
      _id: key._id
    }).then(res => {
      setRoomInfo_new(res.data)

    })
  }
  const checkDate = () => {
    let symbol = 0;
    roomInfo_new?.r_date.map((item: Date) => {
      if (moment(form.getFieldValue('date_start')).format('YYYY-MM-DD') > item.date_end || moment(form.getFieldValue('date_end')).format('YYYY-MM-DD') < item.date_start) {
        return true
      } else {
        symbol++
      }
    })
    console.log(roomInfo_new?.r_date);
    console.log(symbol);

    if (symbol === 0) {
      return true
    } else {
      return false
    }

  }

  //预订房间
  const orderRoom = () => {


    // //判断日期是否为空
    if (form.getFieldValue('date_start') && form.getFieldValue('date_end')) {
      //判断起始日期是否在前
      if (moment(form.getFieldValue('date_start')).format('YYYY-MM-DD') < moment(form.getFieldValue('date_end')).format('YYYY-MM-DD')) {
        //判断起始日期是否在今天之后
        if (moment(form.getFieldValue('date_start')).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD')) {
          //判断日期区间是否与其他订单时间重叠
          if (checkDate()) {
            Toast.show({ icon: 'loading', content: <CountDownText />, duration: 3000 });
            //生成订单id
            let o_id = uuidv4();
            //创建订单时间
            let date = moment().format('YYYY-MM-DD HH:mm:ss');
            //创建订单
            createOrder({
              o_id: o_id,
              o_room_id: roomInfo?._id!,
              o_roomDate_start: moment(form.getFieldValue('date_start')).format('YYYY-MM-DD'),
              o_roomDate_end: moment(form.getFieldValue('date_end')).format('YYYY-MM-DD'),
              o_money: roomInfo?.r_price!,
              o_userTel: userInfo?.userTel!,
              o_createDate: date,
              o_user_id: userInfo?._id!,
              o_user_name: userInfo?.name!
            }).then(res => {
              console.log(res);
            })
            //将订单选择的时间放入对应房间的时间数组中
            updateRoomDate({
              o_room_id: roomInfo?._id!,
              o_roomDate_start: moment(form.getFieldValue('date_start')).format('YYYY-MM-DD'),
              o_roomDate_end: moment(form.getFieldValue('date_end')).format('YYYY-MM-DD')
            })
            setTimeout(() => {
              history.replace(routerPath.Order);
            }, 3000)
          } else {
            Toast.show({
              icon: 'fail',
              content: <div className={cx('notice')}><div>您选择日期与其他订单有重叠</div><div>请查看该房间已预订日期表来选择其他日期~</div></div>,
              duration: 3000
            })
          }
        } else {
          Toast.show({ icon: 'fail', content: '请选择当天或之后的日期' })
        }
      } else {
        Toast.show({ icon: 'fail', content: '起始日期必须早于截止日期!' })
      }


      // getRoomDetail({
      //   _id: roomInfo?._id!
      // }).then(res => {
      //   console.log(res);
      // })

    } else {
      Toast.show({ icon: 'fail', content: '请选择起始、截止日期!' })

    }

  }
  useEffect(() => {
    if (history.location.state) {
      const roomInfo = history.location.state;
      const userInfo = getUserInfo();
      setRoomInfo(roomInfo as RoomInfo);
      serUserInfo(userInfo);
      getRoomDetailById(roomInfo as RoomInfo)
    } else {
      history.replace(routerPath.NotFind)
    }


  }, [])
  return <div className={cx('main')}>
    <div className={cx('navBar')}>
      <NavBar onBack={() => { history.replace(routerPath.Home) }}>
        房间信息
      </NavBar>
    </div>
    <div className={cx('photo-view')}>
      <Image src={roomInfo?.r_head!} width={'100%'} height={'100%'} fit='cover' onClick={() => {
        setVisible(true)
      }} />
      <ImageViewer
        image={roomInfo?.r_head!}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
      />
    </div>
    <Divider />
    <div className={cx('room-title')}>
      <div className={cx('mini-font')}>
        {roomInfo?.r_tag}市·{roomInfo?.r_type}·{roomInfo?.r_bedrooms}室{roomInfo?.r_wc}卫{roomInfo?.r_beds}床·可住{roomInfo?.r_people}人
      </div>
      <div className={cx('title')}>{roomInfo?.r_title}</div>
      <div className={cx('tag-group')}>
        <div className={cx('tag_1')}>优质套房</div><div className={cx('tag')}>环境舒适</div><div className={cx('tag')}>入住体验好</div>
        <div className={cx('tag')}>极速入住</div><div className={cx('tag')}>WI-FI</div>
      </div>
    </div>
    <Divider />
    <div className={cx('room-introduction')}>
      <div className={cx('title')}>套房信息概览</div>
      <div className={cx('icon-group')}>
        <div className={cx('icon')}>
          <Image src={Icon_1} width={'2.4rem'} />
          <div>{roomInfo?.r_bedrooms}间卧室</div>
        </div>
        <div className={cx('icon')}>
          <Image src={Icon_2} width={'2.4rem'} />
          <div>{roomInfo?.r_beds}张床</div>
        </div>
        <div className={cx('icon')}>
          <Image src={Icon_3} width={'2.4rem'} />
          <div>{roomInfo?.r_wc}个卫生间</div>
        </div>
        <div className={cx('icon')}>
          <Image src={Icon_4} width={'2.4rem'} />
          <div>宜住{roomInfo?.r_people}人</div>
        </div>
      </div>
      <div className={cx('describe')}>
        <div>描述信息</div>
        <div className={cx('text')}>{roomInfo?.r_desc}</div>
      </div>
    </div>
    <div className={cx('room-all-date')}>
      <div className={cx('title')}>已预订列表</div>
      <div className={cx('table')}>

        {roomInfo_new?.r_date.length != 0 ? roomInfo_new?.r_date.map((item: Date, index: number) =>
          <table key={index}>
            <thead>
              <tr>
                <th>起始日期</th>
                <th></th>
                <th>截止日期</th>
              </tr>
            </thead>
            <tbody className={cx('table-body')}>
              <tr className={cx('table-row')} >
                <td>{item.date_start}</td>
                <td>--------------</td>
                <td>{item.date_end}</td>
              </tr></tbody>
          </table>) : <Empty description='暂无预订' />}

      </div>
    </div>
    <div className={cx('user-comment')}>
      <div className={cx('title')}>客户评价·({roomInfo?.r_comment.length})条</div>
      <Divider />
      <div className={cx('content')}>
        {roomInfo?.r_comment.length !== 0 ? 1 : <Empty description='sorry,暂无评论' />}
      </div>
      <Divider />
    </div>
    <div className={cx('footer')}>
      <div className={cx('create-order')}>
        <div className={cx('price')}>￥{roomInfo?.r_price}</div>
        <div className={cx('date-form')}>
          <Form form={form}><DatePick /></Form>
        </div>
        <button className={cx('btn')} onClick={() => orderRoom()}>预订</button>
      </div>
    </div>
  </div>;
};

export default Room;
