import { authController } from '@/shared/interface/controllers/auth-controller';
import { getSessionCookie } from '@/shared/infra/auth/session-cookies';
import { User, UserRole } from '@/shared/entities/user';
import { redirect } from 'next/navigation';

export async function getCurrentUser(): Promise<User | null> {
    try {
        const sessionId = await getSessionCookie();
        if (!sessionId || sessionId.trim().length === 0) {
            return null;
        }
    
        return await authController.findUserBySessionId(sessionId);
    
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}

export async function requireAuth(): Promise<User> {
    const user = await getCurrentUser();
    if (!user) {
        redirect('/login');
    }
    return user;
}

export async function requireRole(role: UserRole): Promise<User> {
    const user = await requireAuth();
    if (!user.roles.includes(role)) {
        throw new Error('Insufficient permissions');
    }
    return user;
}

export async function isAuthenticated(): Promise<boolean> {
    const user = await getCurrentUser();
    return user !== null;
} 
