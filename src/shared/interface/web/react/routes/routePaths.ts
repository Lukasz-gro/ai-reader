export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    CHAT: '/chat',
    QUIZ: '/quiz',
} as const;

export const buildRoute = {
    home: () => ROUTES.HOME,
    login: () => ROUTES.LOGIN,
    register: () => ROUTES.REGISTER,
    chat: () => ROUTES.CHAT,
    quiz: () => ROUTES.QUIZ,
} as const;

export type RouteKey = keyof typeof ROUTES; 
