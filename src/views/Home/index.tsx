import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Button, Divider, NoticeBar, Toast } from 'antd-mobile';
import SwiperImgs from './components/Swiper';
import TapToTop from './components/TapToTop';
import { ServicesApi } from '@/services/request-api';
import { RoomInfo, UserInfo } from '@/services/entities';
import Content from './components/Content';
import { getUserInfo } from '@/utils/storageUtils';

const cx = classNames.bind(styles);

const Home: React.FC = () => {

  const [userInfo, setUserInfo] = useState<UserInfo>();
  const scrollToAnchor = (id: string) => {
    if (id) {
      document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  }
  useEffect(() => {
    let userInfo = getUserInfo();
    setUserInfo(userInfo);
  }, [])
  return <div className={cx('main')} id='main'>
    <div className={cx('header')}>
      <div className={cx('notice')}>
        <NoticeBar content={`尊敬的用户${userInfo?.name},欢迎使用在线酒店客房预订系统~`} color='alert' />
      </div>
      <SwiperImgs />
      <div className={cx('control-btn')}>
        <Button color='primary' style={{ '--border-radius': '20px' }} onClick={() => scrollToAnchor('jpfy')}> 精品套房</Button>
        <Button color='primary' style={{ '--border-radius': '20px' }} onClick={() => scrollToAnchor('thfy')}> 特惠套房</Button>
        <Button color='primary' style={{ '--border-radius': '20px' }} onClick={() => scrollToAnchor('pzfy')}> 品质套房</Button>
      </div>
    </div>
    <div className={cx('content')}>
      <Content />
    </div>

    <TapToTop />
  </div>;
};

export default Home;
