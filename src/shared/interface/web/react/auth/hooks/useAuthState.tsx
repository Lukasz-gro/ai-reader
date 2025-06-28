import { useContext } from 'react';
import { AuthStateCtx, AuthState } from '../context/AuthContext';

export function useAuthState(): AuthState {
    const authState = useContext(AuthStateCtx);
    if (!authState) {
        throw new Error('useAuthState must be used inside <AuthProvider>');
    }
    return authState;
} 
