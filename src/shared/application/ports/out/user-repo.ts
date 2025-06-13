import { User } from '@/shared/entities/user';

export interface UserRepo {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    upsert(user: User): Promise<User>;
}
