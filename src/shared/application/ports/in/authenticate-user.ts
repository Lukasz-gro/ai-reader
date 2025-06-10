import { Session } from '@/shared/entities/session';
import { UserRepo } from '@/shared/application/ports/out/user-repo';
import { PasswordHasher } from '@/shared/ports/out/password-hasher';
import { SessionRepo } from '@/shared/application/ports/out/session-repo';

export interface AuthenticateUser {
    execute(
        userRepo: UserRepo,
        passwordHasher: PasswordHasher,
        sessionRepo: SessionRepo,
        email: string,
        plainPassword: string,
        ipAddress?: string,
        userAgent?: string,
    ): Promise<Session | null>;
}
