import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Avatar, Button, List, Modal, Space } from 'antd-mobile';
import { deleteUserInfo, getUserInfo, saveUserInfo } from '@/utils/storageUtils';
import { useHistory } from 'react-router-dom';
import { ApiPaths } from '@/services/api-path';
import { UserInfo } from '@/services/entities';
import ChangeAvatar from './components/changeAvatar';
import { ServicesApi } from '@/services/request-api';
import ChangePwd from './components/changePwd';
import ChangeTel from './components/changeTel';
import ChangeEmail from './components/changeEmail';

const cx = classNames.bind(styles);

const PersonalCenter: React.FC = () => {
  const { ChangeUserInfo, getOrdersByUserId } = ServicesApi;
  const history = useHistory();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  //注销登录
  const doSignOut = () => {
    deleteUserInfo();
    history.replace(ApiPaths.login);
  }
  //修改头像
  const doChangeAvatar = (avatar: string) => {
    let { photo, ...rest } = getUserInfo();
    saveUserInfo(
      {
        ...rest,
        photo: avatar
      });
    setUserInfo(getUserInfo());
    ChangeUserInfo({
      name: userInfo?.name!,
      photo: avatar
    })
  }
  //修改密码
  const doChangePwd = (pwd: string) => {
    ChangeUserInfo({
      name: userInfo?.name!,
      password: pwd
    })
  }
  //修改手机号
  const doChangeTel = (tel: string) => {
    let { userTel, ...rest } = getUserInfo();
    saveUserInfo(
      {
        ...rest,
        userTel: tel
      });
    setUserInfo(getUserInfo());
    ChangeUserInfo({
      name: userInfo?.name!,
      userTel: tel
    })
  }
  //修改邮箱
  const doChangeEmail = (email: string) => {
    let { userEmail, ...rest } = getUserInfo();
    saveUserInfo(
      {
        ...rest,
        userEmail: email
      });
    setUserInfo(getUserInfo());
    ChangeUserInfo({
      name: userInfo?.name!,
      userEmail: email
    })
  }

  useEffect(() => {
    let userInfo = getUserInfo();
    setUserInfo(userInfo);
  }, [])
  return <div className={cx('main')}>
    <List mode='card' className={cx('list')}>
      <List.Item className={cx('info-list')}>
        <Space direction='vertical' className={cx('info')}>
          <div className={cx('avatar')}>
            <Avatar src={userInfo?.photo!} style={{ '--size': '90px' }} />
          </div>
          <div>用户名: {userInfo?.name}</div>
          <div>手机号: {userInfo?.userTel}</div>
          <div>电子邮箱: {userInfo?.userEmail}</div>
        </Space>
      </List.Item>
      <List.Item onClick={() => {
        Modal.show({
          content: <ChangeAvatar handleSetInfo={doChangeAvatar} />,
          closeOnMaskClick: true,
          showCloseButton: true,
        })
      }}>更改头像</List.Item>
      <List.Item onClick={() => {
        Modal.show({
          content: <ChangePwd handleChangePwd={doChangePwd} />,
          closeOnMaskClick: true,
          showCloseButton: true,
        })
      }}>更改密码</List.Item>
      <List.Item onClick={() => {
        Modal.show({
          content: <ChangeTel handleChangeTel={doChangeTel} />,
          closeOnMaskClick: true,
          showCloseButton: true,
        })
      }}>更改手机号</List.Item>
      <List.Item onClick={() => {
        Modal.show({
          content: <ChangeEmail handleChangeEmail={doChangeEmail} />,
          closeOnMaskClick: true,
          showCloseButton: true,
        })
      }}>更改邮箱</List.Item>
      <List.Item>
        <div className={cx('signOut-btn')}>
          <Button color='danger' size='small' onClick={doSignOut}>注销登录</Button>
        </div>
      </List.Item>
    </List>

  </div>;
};

export default PersonalCenter;
