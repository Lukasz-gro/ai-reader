import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ROUTES } from './routePaths';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { ChatPage } from './ChatPage';
import { Quiz } from './Quiz';

export const routes: RouteObject[] = [
    {
        path: ROUTES.HOME,
        element: <HomePage />,
    },
    {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
    },
    {
        path: ROUTES.REGISTER,
        element: <RegisterPage />,
    },
    {
        path: ROUTES.CHAT,
        element: <ChatPage />,
    },
    {
        path: ROUTES.QUIZ,
        element: <Quiz />,
    },
]; 
