import { User } from '@/shared/entities/user';

export interface LoginUser {
    execute(email: string, password: string): Promise<User>;
} 
