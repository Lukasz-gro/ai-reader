import { UserRepo } from '@/shared/application/ports/out/user-repo';
import { SessionRepo } from '@/shared/application/ports/out/session-repo';
import { PasswordHasher } from '@/shared/ports/out/password-hasher';
import { RegisterUser } from '@/shared/application/ports/in/register-user';
import { AuthenticateUser } from '@/shared/application/ports/in/authenticate-user';
import { User } from '@/shared/entities/user';
import { Session } from '@/shared/entities/session';
import { InMemoryUserRepo } from '@/shared/infra/auth/in-memory-user-repo';
import { InMemorySessionRepo } from '@/shared/infra/auth/in-memory-session-repo';
import { BcryptPasswordHasher } from '@/shared/infra/security/bcrypt-password-hasher';
import { RegisterUserUseCase } from '@/shared/application/use-cases/register-user';
import { AuthenticateUserUseCase } from '@/shared/application/use-cases/authenticate-user';

export class AuthController {
    constructor(
    private readonly userRepo: UserRepo,
    private readonly sessionRepo: SessionRepo,
    private readonly passwordHasher: PasswordHasher,
    private readonly registerUserUseCase: RegisterUser,
    private readonly authenticateUserUseCase: AuthenticateUser,
    ) {}

    async register(username: string, email: string, password: string): Promise<User> {
        const sanitizedUsername = username.trim();
        const sanitizedEmail = email.trim().toLowerCase();
    
        if (!sanitizedUsername || !sanitizedEmail || !password) {
            throw new Error('All fields are required');
        }

        return await this.registerUserUseCase.execute(
            this.userRepo,
            this.passwordHasher,
            sanitizedUsername,
            sanitizedEmail,
            password
        );
    }

    async authenticate(email: string, password: string, ipAddress?: string, userAgent?: string): Promise<Session | null> {
        const sanitizedEmail = email.trim().toLowerCase();
    
        if (!sanitizedEmail || !password) {
            return null;
        }

        return await this.authenticateUserUseCase.execute(
            this.userRepo,
            this.passwordHasher,
            this.sessionRepo,
            sanitizedEmail,
            password,
            ipAddress,
            userAgent
        );
    }

    async invalidateSession(sessionId: string): Promise<void> {
        if (!sessionId || sessionId.trim().length === 0) {
            throw new Error('Session ID is required');
        }
    
        return await this.sessionRepo.invalidate(sessionId.trim());
    }

    async findUserBySessionId(sessionId: string): Promise<User | null> {
        if (!sessionId || sessionId.trim().length === 0) {
            return null;
        }
    
        const session = await this.sessionRepo.findById(sessionId.trim());
        if (!session) return null;
        return await this.userRepo.findById(session.userId);
    }
}

let _authController: AuthController | null = null;

export const authController = {
    get instance(): AuthController {
        if (!_authController) {
            const userRepo = new InMemoryUserRepo();
            const sessionRepo = new InMemorySessionRepo();
            const passwordHasher = new BcryptPasswordHasher();
            const registerUserUseCase = new RegisterUserUseCase();
            const authenticateUserUseCase = new AuthenticateUserUseCase();

            _authController = new AuthController(
                userRepo,
                sessionRepo,
                passwordHasher,
                registerUserUseCase,
                authenticateUserUseCase,
            );
        }
        return _authController;
    },

    async register(username: string, email: string, password: string): Promise<User> {
        return this.instance.register(username, email, password);
    },

    async authenticate(email: string, password: string, ipAddress?: string, userAgent?: string): Promise<Session | null> {
        return this.instance.authenticate(email, password, ipAddress, userAgent);
    },

    async invalidateSession(sessionId: string): Promise<void> {
        return this.instance.invalidateSession(sessionId);
    },

    async findUserBySessionId(sessionId: string): Promise<User | null> {
        return this.instance.findUserBySessionId(sessionId);
    }
}; 
