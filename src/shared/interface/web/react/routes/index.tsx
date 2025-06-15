import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ROUTES } from './routePaths';
import { Home } from './Home';
import { Quiz } from './Quiz';
// TODO: Add other route components as they are created
// import { Chat } from './Chat';

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  // TODO: Add more routes as they are implemented
  // {
  //   path: ROUTES.CHAT,
  //   element: <Chat />,
  // },
  {
    path: ROUTES.QUIZ,
    element: <Quiz />,
  },
]; 