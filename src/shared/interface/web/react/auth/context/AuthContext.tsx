import { createContext, Dispatch, ReactNode, useEffect, useReducer } from 'react';
import { UserAuthController } from '@/shared/interface/controllers/user-auth-controller';
import { isOk } from '@/shared/entities/result';
import { AuthState } from '../state/auth-state';
import { AuthAction } from '../state/auth-actions';
import { authStateReducer } from '../state/auth-reducer';

export const AuthStateCtx = createContext<AuthState | null>(null);
export const AuthDispatchCtx = createContext<Dispatch<AuthAction> | null>(null);
export const AuthControllerCtx = createContext<UserAuthController | null>(null);

export function AuthProvider({ 
    children, 
    controller 
}: { 
    readonly children: ReactNode;
    readonly controller: UserAuthController;
}) {
    const [state, dispatch] = useReducer(authStateReducer, {
        status: 'loading',
        loading: true
    });

    useEffect(() => {
        let ignore = false;

        const initializeAuth = async () => {
            dispatch({ type: 'REQUEST' });
            const userResult = await controller.getCurrentUser();

            if (ignore) {
                return;
            }
            if (isOk(userResult)) {
                dispatch({
                    type: 'SUCCESS',
                    payload: userResult.value,
                    source: 'refresh'
                });
            } else {
                dispatch({
                    type: 'FAILED',
                    payload: userResult.error.message
                });
            }
        };
        void initializeAuth();

        return () => {
            ignore = true;
        };
    }, [controller]);

    return (
        <AuthControllerCtx.Provider value={controller}>
            <AuthDispatchCtx.Provider value={dispatch}>
                <AuthStateCtx.Provider value={state}>
                    {children}
                </AuthStateCtx.Provider>
            </AuthDispatchCtx.Provider>
        </AuthControllerCtx.Provider>
    );
} 
