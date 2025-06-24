import { useContext } from 'react';
import { AuthActionsCtx, AuthActions } from '../context/AuthContext';

export function useAuthStateSetters(): AuthActions {
    const authActions = useContext(AuthActionsCtx);
    if (!authActions) {
        throw new Error('useAuthStateSetters must be used inside <AuthProvider>');
    }
    return authActions;
} 