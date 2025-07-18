import { useAuthController } from './useAuthController';
import { useAuthDispatch } from './useAuthDipatch';
import { useCallback } from 'react';
import { runAuthAction } from '../state/auth-actions';

export function useAuthActions() {
    const { authController } = useAuthController();
    const dispatch = useAuthDispatch();

    const login = useCallback((email: string, password: string) => {
        runAuthAction(
            () => authController.login(email, password),
            dispatch,
            'login',
            user => user
        );
    }, [authController, dispatch]);

    const logout = useCallback(() => {
        runAuthAction(
            () => authController.logout(),
            dispatch,
            'logout',
            () => null
        );
    }, [authController, dispatch]);

    const register = useCallback((email: string, password: string) => {
        runAuthAction(
            () => authController.register(email, password),
            dispatch,
            'register',
            () => null
        );
    }, [authController, dispatch]);

    return { login, logout, register };
} 
