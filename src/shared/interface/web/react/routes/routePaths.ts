export const ROUTES = {
  HOME: '/',
  CHAT: '/chat/:projectId?',
  QUIZ: '/quiz/:projectId?',
} as const;

// Helper functions for building routes with parameters
export const buildRoute = {
  home: () => ROUTES.HOME,
  chat: (projectId?: string) => projectId ? `/chat/${projectId}` : '/chat',
  quiz: (projectId?: string) => projectId ? `/quiz/${projectId}` : '/quiz',
} as const;

export type RouteKey = keyof typeof ROUTES; 