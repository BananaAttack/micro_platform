// import { RouteConfig } from "react-router-config";
// import Loadable from 'react-loadable';
// import React from 'react';
import Home from '../pages/home';
import About from '../pages/about';

const routes = [
  {
    path: '/react-app/home',
    component: Home
    // component: Loadable({
    //   loader: () => import('../pages/home'),
    //   loading: () => React.createElement('span', null, 'loading...'),
    // }),
  },
  {
    path: '/react-app/about',
    component: About
    // component: Loadable({
    //   loader: () => import('../pages/about'),
    //   loading: () => React.createElement('span', null, 'loading...'),
    // }),
  },
];

export default routes;