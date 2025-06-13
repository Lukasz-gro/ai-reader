import { Session } from '@/shared/entities/session';

export interface SessionRepo {
    create(session: Session): Promise<Session>;
    findById(id: string): Promise<Session | null>;
    findByUserId(userId: string): Promise<Session[]>;
    invalidate(sessionId: string): Promise<void>;
}
