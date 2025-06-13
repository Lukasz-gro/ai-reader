import { RegisterUser } from '@/shared/application/ports/in/register-user';
import { User, UserRole } from '@/shared/entities/user';
import { UserRepo } from '@/shared/application/ports/out/user-repo';
import { PasswordHasher } from '@/shared/ports/out/password-hasher';
import { v4 as uuidv4 } from 'uuid';

export class RegisterUserUseCase implements RegisterUser {
    async execute(
        userRepo: UserRepo,
        passwordHasher: PasswordHasher,
        username: string,
        email: string,
        plainPassword: string,
    ): Promise<User> {
        const existing = await userRepo.findByEmail(email);
        if (existing) {
            throw new Error('Email already taken');
        }

        const passwordHash = await passwordHasher.hash(plainPassword);

        const now = new Date();
        const user: User = {
            id: uuidv4(),
            username,
            email,
            passwordHash,
            roles: [UserRole.USER],
            createdAt: now,
        };

        return userRepo.upsert(user);
    }
}
