import { useContext } from 'react';
import { AuthDispatchCtx } from '../context/AuthContext';

export function useAuthDispatch() {
    const dispatch = useContext(AuthDispatchCtx);
    if (!dispatch) {
        throw new Error('useAuthDispatch must be used inside <AuthProvider>');
    }
    return dispatch;
}
