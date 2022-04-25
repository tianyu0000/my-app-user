import React from 'react';
import {
  Redirect, RouteProps, Route as ReactRouter,
} from 'react-router-dom';
import routerPath from '@/router/router-path';
import Home from '@/views/Home';
import { getUserInfo } from '@/utils/storageUtils';
import BasicLayout from '@/Layouts/basic-layout';
import PersonalCenter from '@/views/PersonalCenter';

export const LoginPartRoute: React.FC<RouteProps> = (props) => {
  const { component: Component, ...rest } = props;
  if (!Component) return null;

  return (
    <BasicLayout>
      <ReactRouter
        {...rest}
        render={() => {
          if (getUserInfo()) {
            return (
              <>
                <Redirect to={routerPath.Home} />
                <Home />
              </>
            );
          }
          return (
            <ReactRouter {...props} />
          );
        }}
      />
    </BasicLayout>
  );
};
