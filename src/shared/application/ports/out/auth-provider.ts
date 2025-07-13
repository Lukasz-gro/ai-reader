import { User } from '@/shared/entities/user';

export interface AuthProvider {
    getAuthenticatedUser(): Promise<User | null>;
    login(email: string, password: string): Promise<User>;
    register(email: string, password: string): Promise<void>;
    logout(): Promise<void>;
}
