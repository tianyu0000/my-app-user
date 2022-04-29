import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Button, Divider, NoticeBar, Toast } from 'antd-mobile';
import SwiperImgs from './components/Swiper';
import TapToTop from './components/TapToTop';
import { ServicesApi } from '@/services/request-api';
import { RoomInfo } from '@/services/entities';
import Content from './components/Content';

const cx = classNames.bind(styles);

const Home: React.FC = () => {


  const scrollToAnchor = (id: string) => {
    if (id) {
      document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  }

  return <div className={cx('main')} id='main'>
    <div className={cx('header')}>
      <NoticeBar content='欢迎使用在线酒店预订系统~' color='alert' closeable />
      <SwiperImgs />
      <div className={cx('control-btn')}>
        <Button color='primary' style={{ '--border-radius': '20px' }} onClick={() => scrollToAnchor('jpfy')}> 精品房源</Button>
        <Button color='primary' style={{ '--border-radius': '20px' }} onClick={() => scrollToAnchor('thfy')}> 特惠房源</Button>
        <Button color='primary' style={{ '--border-radius': '20px' }} onClick={() => scrollToAnchor('pzfy')}> 品质房源</Button>
      </div>
    </div>
    <div className={cx('content')}>
      <Content />
    </div>

    <TapToTop />
  </div>;
};

export default Home;
