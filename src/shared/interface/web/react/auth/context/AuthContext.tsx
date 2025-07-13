import { createContext, useEffect, useState, useMemo } from 'react';
import { User } from '@/shared/entities/user';
import { UserAuthController } from '@/shared/interface/controllers/user-auth-controller';

interface AuthSuccessState {
    status: 'success';
    user: User | null;
}

interface AuthLoadingState {
    status: 'loading';
    loading: true;
}

interface AuthErrorState {
    status: 'error';
    error: string;
}

export type AuthState = AuthSuccessState | AuthLoadingState | AuthErrorState;

export interface AuthActions {
    setUser: (user: User | null) => void;
    setError: (error: string | null) => void;
    setLoading: (loading: boolean) => void;
}

export const AuthStateCtx = createContext<AuthState | null>(null);
export const AuthActionsCtx = createContext<AuthActions | null>(null);
export const AuthControllerCtx = createContext<UserAuthController | null>(null);

export function AuthProvider({ 
    children, 
    controller 
}: { 
    readonly children: React.ReactNode;
    readonly controller: UserAuthController;
}) {
    const [state, setState] = useState<AuthState>({
        status: 'loading',
        loading: true
    });

    useEffect(() => {
        let ignore = false;
        
        const initializeAuth = async () => {
            try {
                const user = await controller.getCurrentUser();
                if (!ignore) {
                    setState({
                        status: 'success',
                        user
                    });
                }
            } catch (error) {
                if (!ignore) {
                    setState({
                        status: 'error',
                        error: (error as Error).message ?? 'Authentication error'
                    });
                }
            }
        };

        initializeAuth();

        return () => {
            ignore = true;
        };
    }, [controller]);

    const authActions: AuthActions = useMemo(() => ({
        setUser: (user) => setState({ status: 'success', user }),
        setError: (error) => setState({ status: 'error', error: error ?? 'Unknown error' }),
        setLoading: (loading) => {
            if (loading) {
                setState({ status: 'loading', loading: true });
            } else {
                setState({ status: 'success', user: null });
            }
        }
    }), []);

    return (
        <AuthControllerCtx.Provider value={controller}>
            <AuthActionsCtx.Provider value={authActions}>
                <AuthStateCtx.Provider value={state}>
                    {children}
                </AuthStateCtx.Provider>
            </AuthActionsCtx.Provider>
        </AuthControllerCtx.Provider>
    );
} 
