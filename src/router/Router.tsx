import React from 'react';
import { Router as BaseRouter, Switch, Route, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from '@/views/Login';
import Home from '@/views/Home'
import routerPath from '@/router/router-path';
import Room from '@/views/Room';
import Order from '@/views/Order';
import PersonalCenter from '@/views/PersonalCenter'
import BasicLayout from '@/Layouts/basic-layout';
import { LoginPartRoute } from './LoginPartRoute';
import { NeedLoginRoute } from './NeedLoginRoute';
import NotFind from '@/views/NotFind';
import ForgetPwd from '@/views/ForgetPwd';
import FeedBack from '@/views/FeedBack';
const Router: React.FC = () => {
  const history = createBrowserHistory();
  return (
    <BaseRouter history={history}>
      <Switch>
        <LoginPartRoute path={routerPath.Home} exact component={Home} />
        <LoginPartRoute path={routerPath.ForgetPwd} exact component={ForgetPwd} />
        <NeedLoginRoute path={routerPath.Room} exact component={Room} />
        <NeedLoginRoute path={routerPath.Login} exact component={Login} />
        <NeedLoginRoute path={routerPath.Order} exact component={Order} />
        <NeedLoginRoute path={routerPath.FeedBack} exact component={FeedBack} />
        <NeedLoginRoute path={routerPath.PersonalCenter} exact component={PersonalCenter} />
        <NeedLoginRoute path="*" exact component={NotFind} />
      </Switch>
    </BaseRouter>
  );
};

export default Router;
