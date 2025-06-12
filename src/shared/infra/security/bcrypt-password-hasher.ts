import bcrypt from 'bcryptjs';
import { PasswordHasher } from '@/shared/ports/out/password-hasher';

const SALT_ROUNDS = 12;

export class BcryptPasswordHasher implements PasswordHasher {
    async hash(plain: string): Promise<string> {
        return Promise.resolve(bcrypt.hashSync(plain, SALT_ROUNDS));
    }

    async compare(plain: string, hash: string): Promise<boolean> {
        return Promise.resolve(bcrypt.compareSync(plain, hash));
    }
}
