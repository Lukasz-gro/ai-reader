import { getCurrentUser } from './auth-middleware';
import { redirect } from 'next/navigation';
import { User, UserRole } from '@/shared/entities/user';

interface AuthGuardOptions {
    redirectTo?: string;
    message?: string;
}

export async function requireAuthWithRedirect(options: AuthGuardOptions = {}): Promise<User> {
    const { redirectTo = '/login', message = 'auth-required' } = options;
    
    const user = await getCurrentUser();
    if (!user) {
        const redirectUrl = message ? `${redirectTo}?message=${message}` : redirectTo;
        redirect(redirectUrl);
    }
    return user;
}

export async function requireRoleWithRedirect(
    role: UserRole, 
    options: AuthGuardOptions = {}
): Promise<User> {
    const user = await requireAuthWithRedirect(options);
    
    if (!user.roles.includes(role)) {
        const { redirectTo = '/login', message = 'insufficient-permissions' } = options;
        const redirectUrl = message ? `${redirectTo}?message=${message}` : redirectTo;
        redirect(redirectUrl);
    }
    
    return user;
}

export async function checkAuthStatus(): Promise<{ user: User | null; isAuthenticated: boolean }> {
    const user = await getCurrentUser();
    return {
        user,
        isAuthenticated: user !== null
    };
} 
