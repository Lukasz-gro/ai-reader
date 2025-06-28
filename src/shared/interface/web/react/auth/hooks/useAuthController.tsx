import { useContext } from 'react';
import { AuthControllerCtx } from '../context/AuthContext';
import { UserAuthController } from '@/shared/interface/controllers/user-auth-controller';

export function useAuthController(): { authController: UserAuthController } {
    const authController = useContext(AuthControllerCtx);
    if (!authController) {
        throw new Error('useAuthController must be used inside <AuthProvider>');
    }
    return { authController };
} 
