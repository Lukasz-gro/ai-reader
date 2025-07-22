export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    CHAT: '/chat/:projectId?',
    QUIZ: '/quiz/:projectId?',
} as const;

export const buildRoute = {
    home: () => ROUTES.HOME,
    login: () => ROUTES.LOGIN,
    register: () => ROUTES.REGISTER,
    chat: (projectId?: string) => projectId ? `/chat/${projectId}` : '/chat',
    quiz: (projectId?: string) => projectId ? `/quiz/${projectId}` : '/quiz',
} as const;

export type RouteKey = keyof typeof ROUTES; 
