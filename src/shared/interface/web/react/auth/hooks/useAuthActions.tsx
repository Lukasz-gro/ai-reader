import { useAuthController } from './useAuthController';

export function useAuthActions() {
    const { authController } = useAuthController();

    const login = async (email: string, password: string) => {
        await authController.login(email, password);
    };

    const logout = async () => {
        await authController.logout();
    };

    return { login, logout };
} 