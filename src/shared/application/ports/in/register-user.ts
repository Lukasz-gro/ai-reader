import { User } from '@/shared/entities/user';
import { UserRepo } from '@/shared/application/ports/out/user-repo';
import { PasswordHasher } from '@/shared/ports/out/password-hasher';

export interface RegisterUser {
    execute(
        userRepo: UserRepo,
        passwordHasher: PasswordHasher,
        username: string,
        email: string,
        plainPassword: string,
    ): Promise<User>;
}
