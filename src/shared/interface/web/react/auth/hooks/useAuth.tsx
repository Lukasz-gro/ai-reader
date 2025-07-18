import { useContext } from 'react';
import { AuthState } from '../state/auth-state';
import { AuthStateCtx } from '../context/AuthContext';

export function useAuth(): AuthState {
    const authState = useContext(AuthStateCtx);
    if (!authState) {
        throw new Error('useProjects must be used inside <AuthProvider>');
    }
    return authState;
}
