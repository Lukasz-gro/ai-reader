import { AuthenticateUser } from '@/shared/application/ports/in/authenticate-user';
import { Session } from '@/shared/entities/session';
import { UserRepo } from '@/shared/application/ports/out/user-repo';
import { PasswordHasher } from '@/shared/ports/out/password-hasher';
import { SessionRepo } from '@/shared/application/ports/out/session-repo';
import { v4 as uuidv4 } from 'uuid';

export class AuthenticateUserUseCase implements AuthenticateUser {
    async execute(
        userRepo: UserRepo,
        passwordHasher: PasswordHasher,
        sessionRepo: SessionRepo,
        email: string,
        plainPassword: string,
        ipAddress?: string,
        userAgent?: string,
    ): Promise<Session | null> {
        const user = await userRepo.findByEmail(email);
        if (!user) {
            return null;
        }

        const passwordMatches = await passwordHasher.compare(plainPassword, user.passwordHash);
        if (!passwordMatches) {
            return null;
        }

        const session: Session = {
            id: uuidv4(),
            userId: user.id,
            expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30,
            ipAddress,
            userAgent,
        };

        return sessionRepo.create(session);
    }
}
