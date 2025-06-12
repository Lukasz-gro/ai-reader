import { SessionRepo } from '@/shared/application/ports/out/session-repo';
import { Session } from '@/shared/entities/session';

export class InMemorySessionRepo implements SessionRepo {
    private sessions: Session[] = [];

    async create(session: Session): Promise<Session> {
        // Clean up expired sessions before adding new one
        this.cleanupExpiredSessions();
        
        this.sessions.push(session);
        return session;
    }

    async findById(id: string): Promise<Session | null> {
        // Clean up expired sessions before searching
        this.cleanupExpiredSessions();
        
        const session = this.sessions.find(s => s.id === id);
        
        // Double-check if found session is still valid
        if (session && this.isSessionExpired(session)) {
            await this.invalidate(session.id);
            return null;
        }
        
        return session || null;
    }

    async findByUserId(userId: string): Promise<Session[]> {
        // Clean up expired sessions before searching
        this.cleanupExpiredSessions();
        
        return this.sessions.filter(s => s.userId === userId && !this.isSessionExpired(s));
    }

    async invalidate(sessionId: string): Promise<void> {
        this.sessions = this.sessions.filter(s => s.id !== sessionId);
    }

    private cleanupExpiredSessions(): void {
        const now = Date.now();
        this.sessions = this.sessions.filter(s => s.expiresAt > now);
    }

    private isSessionExpired(session: Session): boolean {
        return session.expiresAt <= Date.now();
    }
} 
