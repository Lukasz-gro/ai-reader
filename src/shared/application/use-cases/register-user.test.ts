import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RegisterUserUseCase } from './register-user';
import { InMemoryUserRepo } from '@/shared/infra/auth/in-memory-user-repo';
import { MockPasswordHasher } from '@/shared/infra/mocks/mock-password-hasher';
import { MockUser } from '@/shared/infra/mocks/mock-user';
import { UserRole } from '@/shared/entities/user';

describe('register user use case', () => {
    let useCase: RegisterUserUseCase;
    let userRepo: InMemoryUserRepo;
    let passwordHasher: MockPasswordHasher;

    const TEST_USERNAME = 'newuser';
    const TEST_EMAIL = 'newuser@example.com';
    const TEST_PASSWORD = 'password123';

    beforeEach(() => {
        useCase = new RegisterUserUseCase();
        userRepo = new InMemoryUserRepo();
        passwordHasher = new MockPasswordHasher();
    });

    describe('successful registration', () => {
        it('should create new user with correct data', async () => {
            const result = await useCase.execute(
                userRepo,
                passwordHasher,
                TEST_USERNAME,
                TEST_EMAIL,
                TEST_PASSWORD
            );

            expect(result.username).toBe(TEST_USERNAME);
            expect(result.email).toBe(TEST_EMAIL);
            expect(result.passwordHash).toBe(`hashed_${TEST_PASSWORD}`);
            expect(result.roles).toEqual([UserRole.USER]);
            expect(result.id).toBeDefined();
            expect(result.createdAt).toBeInstanceOf(Date);
        });

        it('should generate unique user ID', async () => {
            const firstResult = await useCase.execute(
                userRepo,
                passwordHasher,
                'user1',
                'user1@example.com',
                TEST_PASSWORD
            );

            const secondResult = await useCase.execute(
                userRepo,
                passwordHasher,
                'user2',
                'user2@example.com',
                TEST_PASSWORD
            );

            expect(firstResult.id).not.toBe(secondResult.id);
        });

        it('should set creation timestamp to current time', async () => {
            const fixedDate = new Date('2030-01-01T00:00:00Z');
            vi.useFakeTimers();
            vi.setSystemTime(fixedDate);

            const result = await useCase.execute(
                userRepo,
                passwordHasher,
                TEST_USERNAME,
                TEST_EMAIL,
                TEST_PASSWORD,
            );

            expect(result.createdAt).toEqual(fixedDate);

            vi.useRealTimers();
        });

        it('should store user in repository', async () => {
            const result = await useCase.execute(
                userRepo,
                passwordHasher,
                TEST_USERNAME,
                TEST_EMAIL,
                TEST_PASSWORD
            );

            const storedUser = await userRepo.findById(result.id);
            expect(storedUser).toEqual(result);
        });

        it('should hash the password before storing', async () => {
            const result = await useCase.execute(
                userRepo,
                passwordHasher,
                TEST_USERNAME,
                TEST_EMAIL,
                TEST_PASSWORD
            );

            expect(result.passwordHash).not.toBe(TEST_PASSWORD);
            expect(result.passwordHash).toBe(`hashed_${TEST_PASSWORD}`);
        });

        it('should assign USER role by default', async () => {
            const result = await useCase.execute(
                userRepo,
                passwordHasher,
                TEST_USERNAME,
                TEST_EMAIL,
                TEST_PASSWORD
            );

            expect(result.roles).toEqual([UserRole.USER]);
            expect(result.roles).toHaveLength(1);
        });
    });

    describe('failed registration', () => {
        it('should throw error when email already exists', async () => {
            const existingUser = new MockUser()
                .withEmail(TEST_EMAIL)
                .build();
            
            await userRepo.upsert(existingUser);

            await expect(useCase.execute(
                userRepo,
                passwordHasher,
                TEST_USERNAME,
                TEST_EMAIL,
                TEST_PASSWORD
            )).rejects.toThrow('Email already taken');
        });

        it('should not create user when email already exists', async () => {
            const existingUser = new MockUser()
                .withEmail(TEST_EMAIL)
                .build();
            
            await userRepo.upsert(existingUser);

            try {
                await useCase.execute(
                    userRepo,
                    passwordHasher,
                    TEST_USERNAME,
                    TEST_EMAIL,
                    TEST_PASSWORD
                );
            } catch {
                // Expected to throw
            }

            const finalUser = await userRepo.findByEmail(TEST_EMAIL);
            expect(finalUser).toEqual(existingUser);
        });
    });

    describe('edge cases', () => {
        it.each([
            ['', TEST_EMAIL, TEST_PASSWORD],
            [TEST_USERNAME, '', TEST_PASSWORD],
            [TEST_USERNAME, 'different@example.com', ''],
        ])(
            'should handle empty input gracefully (username: "%s", email: "%s", password: "%s")',
            async (username, email, password) => {
                const result = await useCase.execute(
                    userRepo,
                    passwordHasher,
                    username,
                    email,
                    password,
                );

                expect(result.username).toBe(username);
                expect(result.email).toBe(email);
                expect(result.passwordHash).toBe(`hashed_${password}`);
            },
        );

        it('should propagate password hashing failures', async () => {
            const hashSpy = vi.spyOn(passwordHasher, 'hash');
            hashSpy.mockRejectedValue(new Error('Password hashing failed'));

            await expect(useCase.execute(
                userRepo,
                passwordHasher,
                TEST_USERNAME,
                TEST_EMAIL,
                TEST_PASSWORD
            )).rejects.toThrow('Password hashing failed');
        });

        it('should propagate user repository failures', async () => {
            const upsertSpy = vi.spyOn(userRepo, 'upsert');
            upsertSpy.mockRejectedValue(new Error('Database error'));

            await expect(useCase.execute(
                userRepo,
                passwordHasher,
                TEST_USERNAME,
                TEST_EMAIL,
                TEST_PASSWORD
            )).rejects.toThrow('Database error');
        });

        it('should propagate email lookup failures', async () => {
            const findByEmailSpy = vi.spyOn(userRepo, 'findByEmail');
            findByEmailSpy.mockRejectedValue(new Error('Database lookup failed'));

            await expect(useCase.execute(
                userRepo,
                passwordHasher,
                TEST_USERNAME,
                TEST_EMAIL,
                TEST_PASSWORD
            )).rejects.toThrow('Database lookup failed');
        });
    });

    describe('registration with different inputs', () => {
        it.each([
            ['user@domain.com', 'email_user_1'],
            ['user.name@domain.co.uk', 'email_user_2'],
            ['user+tag@domain.org', 'email_user_3'],
        ])('should handle email format %s', async (email, username) => {
            const result = await useCase.execute(
                userRepo,
                passwordHasher,
                username,
                email,
                TEST_PASSWORD,
            );
            expect(result.email).toBe(email);
        });

        it.each([
            'simple',
            'with_underscore',
            'with-dash',
            'with123numbers',
        ])('should handle username format %s', async (usernameFormat) => {
            const result = await useCase.execute(
                userRepo,
                passwordHasher,
                usernameFormat,
                `${usernameFormat}@example.com`,
                TEST_PASSWORD,
            );
            expect(result.username).toBe(usernameFormat);
        });
    });
});
