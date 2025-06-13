import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthenticateUserUseCase } from './authenticate-user';
import { InMemoryUserRepo } from '@/shared/infra/auth/in-memory-user-repo';
import { InMemorySessionRepo } from '@/shared/infra/auth/in-memory-session-repo';
import { MockPasswordHasher } from '@/shared/infra/mocks/mock-password-hasher';
import { MockUser } from '@/shared/infra/mocks/mock-user';
import { User, UserRole } from '@/shared/entities/user';

describe('authenticate user use case', () => {
    let useCase: AuthenticateUserUseCase;
    let userRepo: InMemoryUserRepo;
    let sessionRepo: InMemorySessionRepo;
    let passwordHasher: MockPasswordHasher;

    const TEST_EMAIL = 'test@example.com';
    const TEST_PASSWORD = 'password123';
    const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

    const testUser: User = new MockUser()
        .withId('user-123')
        .withUsername('testuser')
        .withEmail(TEST_EMAIL)
        .withPasswordHash('hashed_password123')
        .withRoles([UserRole.USER])
        .withCreatedAt(new Date('2024-01-01'))
        .build();

    beforeEach(() => {
        useCase = new AuthenticateUserUseCase();
        userRepo = new InMemoryUserRepo();
        sessionRepo = new InMemorySessionRepo();
        passwordHasher = new MockPasswordHasher();
    });

    describe('successful authentication', () => {
        beforeEach(async () => {
            await userRepo.upsert(testUser);
        });

        it('should return session when credentials are valid', async () => {
            const result = await useCase.execute(
                userRepo,
                passwordHasher,
                sessionRepo,
                TEST_EMAIL,
                TEST_PASSWORD
            );

            expect(result).toBeDefined();
            expect(result!.userId).toBe(testUser.id);
            expect(result!.id).toBeDefined();
            expect(result!.expiresAt).toBeGreaterThan(Date.now());
        });

        it('should create session with correct expiration time', async () => {
            const fixedNow = new Date('2030-01-01T00:00:00Z');
            vi.useFakeTimers();
            vi.setSystemTime(fixedNow);

            const result = await useCase.execute(
                userRepo,
                passwordHasher,
                sessionRepo,
                TEST_EMAIL,
                TEST_PASSWORD,
            );

            expect(result!.expiresAt).toEqual(fixedNow.getTime() + SESSION_DURATION_MS);

            vi.useRealTimers();
        });

        it('should include optional parameters in session', async () => {
            const ipAddress = '192.168.1.1';
            const userAgent = 'Mozilla/5.0 Test Browser';

            const result = await useCase.execute(
                userRepo,
                passwordHasher,
                sessionRepo,
                TEST_EMAIL,
                TEST_PASSWORD,
                ipAddress,
                userAgent
            );

            expect(result!.ipAddress).toBe(ipAddress);
            expect(result!.userAgent).toBe(userAgent);
        });

        it('should store session in repository', async () => {
            const result = await useCase.execute(
                userRepo,
                passwordHasher,
                sessionRepo,
                TEST_EMAIL,
                TEST_PASSWORD
            );

            const storedSession = await sessionRepo.findById(result!.id);
            expect(storedSession).toEqual(result);
        });

        it('should generate unique session ID', async () => {
            const firstResult = await useCase.execute(
                userRepo,
                passwordHasher,
                sessionRepo,
                TEST_EMAIL,
                TEST_PASSWORD
            );

            const secondResult = await useCase.execute(
                userRepo,
                passwordHasher,
                sessionRepo,
                TEST_EMAIL,
                TEST_PASSWORD
            );

            expect(firstResult!.id).not.toBe(secondResult!.id);
        });
    });

    describe('failed authentication', () => {
        it.each([
            ['nonexistent@example.com', 'password123'],
            [TEST_EMAIL, 'wrongpassword'],
        ])('should return null and create no session for email=%s / password=%s', async (email, password) => {
            await userRepo.upsert(testUser);

            const result = await useCase.execute(
                userRepo,
                passwordHasher,
                sessionRepo,
                email,
                password,
            );

            expect(result).toBeNull();

            const allSessions = await sessionRepo.findByUserId(testUser.id);
            expect(allSessions).toHaveLength(0);
        });
    });

    describe('edge cases', () => {
        it('should handle invalid input gracefully', async () => {
            await userRepo.upsert(testUser);

            const emptyEmailResult = await useCase.execute(
                userRepo,
                passwordHasher,
                sessionRepo,
                '',
                'password123'
            );

            const emptyPasswordResult = await useCase.execute(
                userRepo,
                passwordHasher,
                sessionRepo,
                TEST_EMAIL,
                ''
            );

            expect(emptyEmailResult).toBeNull();
            expect(emptyPasswordResult).toBeNull();
        });

        it('should propagate session creation failures', async () => {
            await userRepo.upsert(testUser);
            const sessionCreateSpy = vi.spyOn(sessionRepo, 'create');
            sessionCreateSpy.mockRejectedValue(new Error('Session creation failed'));

            await expect(useCase.execute(
                userRepo,
                passwordHasher,
                sessionRepo,
                TEST_EMAIL,
                TEST_PASSWORD
            )).rejects.toThrow('Session creation failed');
        });

        it('should propagate password comparison failures', async () => {
            await userRepo.upsert(testUser);
            const compareSpy = vi.spyOn(passwordHasher, 'compare');
            compareSpy.mockRejectedValue(new Error('Password comparison failed'));

            await expect(useCase.execute(
                userRepo,
                passwordHasher,
                sessionRepo,
                TEST_EMAIL,
                TEST_PASSWORD
            )).rejects.toThrow('Password comparison failed');
        });
    });
}); 
