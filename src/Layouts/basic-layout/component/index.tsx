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
const Bottom: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location



  const setRouteActive = (value: string) => {
    history.push(value)
  }

  const tabs = [
    {
      key: routerPath.Home,
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: routerPath.Order,
      title: '我的订单',
      icon: <ReceivePaymentOutline />,
    },
    {
      key: routerPath.PersonalCenter,
      title: '个人中心',
      icon: <UserOutline />,
    },
  ]

  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}
export default Bottom;