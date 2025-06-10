import bcrypt from 'bcrypt';
import { PasswordHasher } from '@/shared/ports/out/password-hasher';

const SALT_ROUNDS = 12;

export class BcryptPasswordHasher implements PasswordHasher {
    async hash(plain: string): Promise<string> {
        return bcrypt.hash(plain, SALT_ROUNDS);
    }

    async compare(plain: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plain, hash);
    }
}
