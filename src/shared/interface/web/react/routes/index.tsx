import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ROUTES } from './routePaths';
import { Home } from './Home';
import { Quiz } from './Quiz';
import { Login } from './Login';
import { Register } from './Register';
// TODO: Add other route components as they are created
// import { Chat } from './Chat';

export const routes: RouteObject[] = [
    {
        path: ROUTES.HOME,
        element: <Home />,
    },
    {
        path: ROUTES.LOGIN,
        element: <Login />,
    },
    {
        path: ROUTES.REGISTER,
        element: <Register />,
    },
    // TODO: Add more routes as they are implemented
    // {
    //   path: ROUTES.CHAT,
    //   element: <Chat />,
    // },
    // {
    //     path: ROUTES.QUIZ,
    //     element: <Quiz />,
    // },
]; 
