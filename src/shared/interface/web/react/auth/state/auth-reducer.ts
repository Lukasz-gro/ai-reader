import { AuthAction } from './auth-actions';
import { AuthState } from './auth-state';

export function authStateReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'REQUEST':
            return { status: 'loading', loading: true };
        case 'SUCCESS':
            return { status: 'success', data: {
                user: action.payload,
                source: action.source
            } };
        case 'FAILED':
            return { status: 'error', error: action.payload };
        default:
            return state;
    }
}
