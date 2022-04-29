import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';
import routerPath from '@/router/router-path';
import { RoomInfo } from '@/services/entities';
import { Button, NavBar } from 'antd-mobile';

const cx = classNames.bind(styles);

const Room: React.FC = () => {
  const history = useHistory();
  const [roomInfo, setRoomInfo] = useState<RoomInfo>();
  useEffect(() => {
    if (history.location.state) {
      const roomInfo = history.location.state;
      setRoomInfo(roomInfo as RoomInfo);
    } else {
      history.replace(routerPath.NotFind)
    }

  })
  return <div className={cx('main')}>
    <div className={cx('navBar')}>
      <NavBar onBack={() => { history.replace(routerPath.Home) }}>
        房间信息
      </NavBar>
    </div>
  </div>;
};

export default Room;
