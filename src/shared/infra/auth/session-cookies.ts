export const SESSION_COOKIE_NAME = 'ai-reader-session';

async function getCookieStore() {
    // Dynamically import to avoid static "next/headers" usage during build analysis
    const { cookies } = await import('next/headers');
    return cookies();
}

export async function setSessionCookie(sessionId: string): Promise<void> {
    const cookieStore = await getCookieStore();
  
    cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
        httpOnly: true,                    // Prevents XSS attacks
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'strict',               // CSRF protection
        maxAge: 60 * 60 * 24 * 30,       // 30 days (matches session duration)
        path: '/',                        // Available across entire site
    });
}

export async function getSessionCookie(): Promise<string | null> {
    const cookieStore = await getCookieStore();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    return sessionCookie?.value || null;
}

export async function clearSessionCookie(): Promise<void> {
    const cookieStore = await getCookieStore();
  
    cookieStore.set(SESSION_COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,                        // Immediately expire
        path: '/',
    });
} 
