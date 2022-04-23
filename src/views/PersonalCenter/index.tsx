import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Avatar, Button, List, Space } from 'antd-mobile';
import { deleteUserInfo, getUserInfo } from '@/utils/storageUtils';
import { useHistory } from 'react-router-dom';
import { ApiPaths } from '@/services/api-path';
import { UserInfo } from '@/services/entities';

const cx = classNames.bind(styles);

const Home: React.FC = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  //注销登录
  const doSignOut = () => {
    deleteUserInfo();
    history.replace(ApiPaths.login);
  }
  const handleClick = () => {

  }
  //修改头像
  const changeAvatar = () => {

  }
  useEffect(() => {
    let userInfo = getUserInfo();
    setUserInfo(userInfo);
  }, [])
  return <>
    <List mode='card' className={cx('list')}>
      <List.Item className={cx('info-list')}>
        <Space direction='vertical' className={cx('info')}>
          <div className={cx('avatar')}>
            <Avatar src={userInfo?.photo!} style={{ '--size': '90px' }} onClick={changeAvatar} />
          </div>
          <div>ID: {userInfo?.name}</div>
          <div>手机号: {userInfo?.userTel}</div>
          <div>邮箱: {userInfo?.userEmail}</div>
        </Space>
      </List.Item>
      <List.Item onClick={handleClick}>
        更改密码
      </List.Item>
      <List.Item onClick={handleClick}>更改手机号</List.Item>
      <List.Item onClick={handleClick}>更改邮箱</List.Item>
      <List.Item>
        <div className={cx('signOut-btn')}>
          <Button color='danger' size='small' onClick={doSignOut}>注销登录</Button>
        </div>
      </List.Item>
    </List>

  </>;
};

export default Home;
