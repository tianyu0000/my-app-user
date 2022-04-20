import React, { Children } from 'react'
import { NavBar, TabBar } from 'antd-mobile'
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  MemoryRouter as Router,
  RouteProps,
  Link,
} from 'react-router-dom'
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
  ReceivePaymentOutline
} from 'antd-mobile-icons'
import className from "classnames/bind";

import styles from './styles.module.scss'
import routerPath from '@/router/router-path'
import Home from '@/views/Home'
import Order from '@/views/Order'
import PersonalCenter from '@/views/PersonalCenter'
import Bottom from './component';
const cx = className.bind(styles);



const BasicLayout: React.FC<RouteProps> = ({ children }) => {
  const history = useHistory();

  return (
    <div className={cx('app')}>
      <div className={styles.top}>

      </div>
      <div className={cx('body')}>
        {children}
      </div>
      <div className={cx('bottom')}>
        <Bottom />
      </div>
    </div>
  )
}

export default BasicLayout;