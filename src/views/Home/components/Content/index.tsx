import React, { useEffect, useState } from "react";
import styles from './styles.module.scss'
import classNames from "classnames/bind";
import { CapsuleTabs, Divider, Empty, Image, SpinLoading } from "antd-mobile";
import { RoomInfo } from "@/services/entities";
import { ServicesApi } from "@/services/request-api";
import { useHistory } from "react-router-dom";
import routerPath from "@/router/router-path";

const cx = classNames.bind(styles);

const Content: React.FC = () => {
  const history = useHistory();
  const { getRoomList } = ServicesApi;
  const [roomList, setRoomList] = useState<RoomInfo[]>([]);
  const [selectArea_hotRoom, setSelectArea_hotRoom] = useState<string>('成都');
  const [selectArea_disCountRoom, setSelectArea_disCountRoom] = useState<string>('成都');
  const [selectArea_qualityRoom, setSelectArea_qualityRoom] = useState<string>('成都');
  const RoomDetail = (item: RoomInfo) => {
    history.replace(routerPath.Room, item)
  }
  useEffect(() => {
    getRoomList().then((res) => {
      setRoomList(res)
    });
  }, [])
  return <><div id='jpfy'>
    <Divider
      contentPosition='center'
      style={{
        color: '#1677ff',
        borderColor: '#1677ff',
        borderStyle: 'dashed',
      }}
    >
      热门房源
    </Divider>
  </div>
    <CapsuleTabs style={{ width: '100%' }} onChange={(key) => {
      setSelectArea_hotRoom(key);
    }}>
      <CapsuleTabs.Tab title='成都' key='成都' />
      <CapsuleTabs.Tab title='重庆' key='重庆' />
      <CapsuleTabs.Tab title='宜宾' key='宜宾' />
    </CapsuleTabs>
    {roomList.filter((item) => {
      if (item.r_tag === selectArea_hotRoom && item.r_type === '热门房源') { return item; }
    }).length != 0 ? <div className={cx('room-list')} >{roomList.filter((item) => {
      if (item.r_tag === selectArea_hotRoom && item.r_type === '热门房源') { return item; }
    }).map((item: RoomInfo, index: number) =>
      <div key={index} className={cx('room-card')} onClick={() => { RoomDetail(item) }}>
        <Image src={item.r_head} width={'100%'} height={'5rem'} fit='cover' style={{ borderRadius: 10 }} />
        <div className={cx('describe')}>
          <div className={cx('mini-font')}>酒店式公寓:{item.r_bedrooms}室{item.r_wc}卫{item.r_beds}床</div>
          <div className={cx('title')}>{item.r_title}</div>
          <div className={cx('price')}>￥{item.r_price}</div>
          <div className={cx('tag-row')}>
            <div className={cx('tag_1')}>快速入住</div>
            <div className={cx('tag_2')}>热门房源</div>
          </div>
        </div>
      </div>
    )}</div> : <div className={cx('emputy')}><Empty description='暂无数据' /></div>}
    <Divider />

    <div id='thfy'>
      <Divider
        contentPosition='center'
        style={{
          color: '#1677ff',
          borderColor: '#1677ff',
          borderStyle: 'dashed',
        }}
      >
        特惠房源
      </Divider>
    </div>
    <CapsuleTabs style={{ width: '100%' }} onChange={(key) => {
      setSelectArea_disCountRoom(key);
    }}>
      <CapsuleTabs.Tab title='成都' key='成都' />
      <CapsuleTabs.Tab title='重庆' key='重庆' />
      <CapsuleTabs.Tab title='宜宾' key='宜宾' />
    </CapsuleTabs>
    {roomList.filter((item) => {
      if (item.r_tag === selectArea_disCountRoom && item.r_type === '特惠房源') { return item; }
    }).length != 0 ?
      <div className={cx('room-list')} >{roomList.filter((item) => {
        if (item.r_tag === selectArea_disCountRoom && item.r_type === '特惠房源') { return item; }
      }).map((item: RoomInfo, index: number) =>
        <div key={index} className={cx('room-card')} onClick={() => { RoomDetail(item) }}>
          <Image src={item.r_head} width={'100%'} height={'5rem'} fit='cover' style={{ borderRadius: 10 }} />
          <div className={cx('describe')}>
            <div className={cx('mini-font')}>酒店式公寓:{item.r_bedrooms}室{item.r_wc}卫{item.r_beds}床</div>
            <div className={cx('title')}>{item.r_title}</div>
            <div className={cx('price')}>￥{item.r_price}</div>
            <div className={cx('tag-row')}>
              <div className={cx('tag_1')}>快速入住</div>
              <div className={cx('tag_2')}>特惠房源</div>
            </div>
          </div>
        </div>)}</div> : <div className={cx('emputy')}><Empty description='暂无数据' /></div>}
    <Divider />

    <div id='pzfy'>
      <Divider
        contentPosition='center'
        style={{
          color: '#1677ff',
          borderColor: '#1677ff',
          borderStyle: 'dashed',
        }}
      >
        品质房源
      </Divider>
    </div>
    <CapsuleTabs style={{ width: '100%' }} onChange={(key) => {
      setSelectArea_qualityRoom(key);
    }}>
      <CapsuleTabs.Tab title='成都' key='成都' />
      <CapsuleTabs.Tab title='重庆' key='重庆' />
      <CapsuleTabs.Tab title='宜宾' key='宜宾' />
    </CapsuleTabs>
    {roomList.filter((item) => {
      if (item.r_tag === selectArea_qualityRoom && item.r_type === '品质房源') { return item; }
    }).length ? <div className={cx('room-list')} > {roomList.filter((item) => {
      if (item.r_tag === selectArea_qualityRoom && item.r_type === '品质房源') { return item; }
    }).map((item: RoomInfo, index: number) =>
      <div key={index} className={cx('room-card')} onClick={() => { RoomDetail(item) }}>
        <Image src={item.r_head} width={'100%'} height={'5rem'} fit='cover' style={{ borderRadius: 10 }} />
        <div className={cx('describe')}>
          <div className={cx('mini-font')}>酒店式公寓:{item.r_bedrooms}室{item.r_wc}卫{item.r_beds}床</div>
          <div className={cx('title')}>{item.r_title}</div>
          <div className={cx('price')}>￥{item.r_price}</div>
          <div className={cx('tag-row')}>
            <div className={cx('tag_1')}>快速入住</div>
            <div className={cx('tag_2')}>品质房源</div>
          </div>
        </div>
      </div>
    )}</div> : <div className={cx('emputy')}><Empty description='暂无数据' /></div>}
    <Divider />

  </>
}
export default Content;