import { useContext } from 'react';
import { AuthStateCtx } from '@/shared/interface/web/react/auth/context/AuthContext';

export function useActiveUserId(): string | null {
    const state = useContext(AuthStateCtx);
    if (!state) throw new Error('useActiveUserId must be used inside <UserProvider>');
    return state.status === 'success' ? state.data.user?.id ?? null : null;
}
