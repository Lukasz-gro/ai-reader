'use server';

import { authController } from '@/shared/interface/controllers/auth-controller';
import { validateLoginInput, validateRegistrationInput } from '@/shared/interface/validation/auth-validation';
import { setSessionCookie, getSessionCookie, clearSessionCookie } from '@/shared/infra/auth/session-cookies';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export interface AuthActionResult {
  success: boolean;
  errors?: { field: string; message: string }[];
}

export async function registerAction(
    prevState: AuthActionResult | null,
    formData: FormData
): Promise<AuthActionResult> {
    try {
        const username = formData.get('username')?.toString()?.trim() || '';
        const email = formData.get('email')?.toString()?.trim() || '';
        const password = formData.get('password')?.toString() || '';
    
        const validationResult = validateRegistrationInput(username, email, password);
        if (!validationResult.success) {
            return { success: false, errors: validationResult.errors };
        }
    
        await authController.register(username, email, password);
    
        redirect('/login?message=registration-success');
        
    } catch (error) {
        if (
            (error instanceof Error && error.message === 'NEXT_REDIRECT') ||
            (typeof error === 'object' && error !== null && 'digest' in (error as { digest?: string }) && (error as { digest?: string }).digest === 'NEXT_REDIRECT')
        ) {
            throw error;
        }
        const message = error instanceof Error ? error.message : 'Registration failed';
        return { 
            success: false, 
            errors: [{ field: 'general', message }] 
        };
    }
}

export async function loginAction(
    prevState: AuthActionResult | null,
    formData: FormData
): Promise<AuthActionResult> {
    try {
        const email = formData.get('email')?.toString()?.trim() || '';
        const password = formData.get('password')?.toString() || '';
    
        const validationResult = validateLoginInput(email, password);
        if (!validationResult.success) {
            return { success: false, errors: validationResult.errors };
        }
    
        const httpHeaders = await headers();
        const session = await authController.authenticate(
            email, 
            password,
            httpHeaders.get('x-forwarded-for') || undefined,
            httpHeaders.get('user-agent') || undefined
        );
    
        if (!session) {
            return { 
                success: false, 
                errors: [{ field: 'general', message: 'Invalid email or password' }] 
            };
        }
    
        await setSessionCookie(session.id);
        redirect('/dashboard');
        
        return { success: true };
    
    } catch (error) {
        if (
            (error instanceof Error && error.message === 'NEXT_REDIRECT') ||
            (typeof error === 'object' && error !== null && 'digest' in (error as { digest?: string }) && (error as { digest?: string }).digest === 'NEXT_REDIRECT')
        ) {
            throw error;
        }
        return { 
            success: false, 
            errors: [{ field: 'general', message: 'Login failed. Please try again.' }] 
        };
    }
}

export async function logoutAction(): Promise<void> {
    try {
        const sessionId = await getSessionCookie();
    
        if (sessionId) {
            await authController.invalidateSession(sessionId);
        }
    } catch (error) {
        console.error('Error invalidating session:', error);
    } finally {
        await clearSessionCookie();
        redirect('/login?message=logged-out');
    }
} 
