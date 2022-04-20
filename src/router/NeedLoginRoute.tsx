import React from 'react';
import {
  Redirect, RouteProps, Route as ReactRouter,
} from 'react-router-dom';
import routerPath from '@/router/router-path';
import { getUserInfo } from '@/utils/storageUtils';

import BasicLayout from '@/Layouts/basic-layout/index';
import Login from '@/views/Login';

export const NeedLoginRoute: React.FC<RouteProps> = (props) => {
  const { component: Component, ...rest } = props;
  if (!Component) return null;

  return (
    <BasicLayout>
      <ReactRouter
        {...rest}
        render={() => {
          if (!getUserInfo()) {
            return (
              <ReactRouter>
                <Redirect to={routerPath.Login} />
                <Login />
              </ReactRouter>
            );
          }
          return <ReactRouter {...props} />;
        }}
      />
    </BasicLayout>
  );
};
