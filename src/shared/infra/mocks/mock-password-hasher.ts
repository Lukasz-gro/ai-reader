import { PasswordHasher } from '@/shared/ports/out/password-hasher';

export class MockPasswordHasher implements PasswordHasher {
    async hash(plain: string): Promise<string> {
        return Promise.resolve(`hashed_${plain}`);
    }

    async compare(plain: string, hash: string): Promise<boolean> {
        return Promise.resolve(hash === `hashed_${plain}`);
    }
} 
