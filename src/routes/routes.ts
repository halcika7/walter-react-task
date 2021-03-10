import { FC, lazy } from 'react';

type Route = {
  path: string;
  exact: boolean;
  Component: FC<Record<string, any>>;
};

export const routes: Route[] = [
  {
    path: '/',
    exact: true,
    Component: lazy(() => import('../pages/Home')),
  },
  {
    path: '/article/:title',
    exact: false,
    Component: lazy(() => import('../pages/Article')),
  },
  {
    path: '/404',
    exact: true,
    Component: lazy(() => import('../pages/404')),
  },
];
