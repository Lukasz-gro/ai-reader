import { createContext, useEffect, useState, useMemo } from 'react';
import { User } from '@/shared/entities/user';
import { UserAuthController } from '@/shared/interface/controllers/user-auth-controller';

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

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
        user: null,
        isLoading: true,
        error: null
    });

    useEffect(() => {
        let ignore = false;
        
        const initializeAuth = async () => {
            try {
                const user = await controller.getCurrentUser();
                if (!ignore) {
                    setState({
                        user,
                        isLoading: false,
                        error: null
                    });
                }
            } catch (error) {
                if (!ignore) {
                    setState({
                        user: null,
                        isLoading: false,
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
        setUser: (user) => setState(prev => ({ ...prev, user, error: null })),
        setError: (error) => setState(prev => ({ ...prev, error })),
        setLoading: (isLoading) => setState(prev => ({ ...prev, isLoading }))
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
