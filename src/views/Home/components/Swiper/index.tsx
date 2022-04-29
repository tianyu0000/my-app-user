import { Swiper } from "antd-mobile";
import React from "react";
import SwiperImg_1 from '@/assets/swiper_1.png'
import SwiperImg_2 from '@/assets/swiper_2.png'
import SwiperImg_3 from '@/assets/swiper_3.png'
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);
const backgroundImgs = [SwiperImg_1, SwiperImg_2, SwiperImg_3]
const SwiperImgs: React.FC = () => {
  const items = backgroundImgs.map((imgs, index) => (
    <Swiper.Item key={index}>
      <div className={cx('content')} style={{ 'backgroundImage': `url(${imgs})` }}></div>
    </Swiper.Item>
  ))

  return <>
    <Swiper autoplay loop style={{ '--border-radius': '10px' }}>{items}</Swiper>
  </>
};
export default SwiperImgs;