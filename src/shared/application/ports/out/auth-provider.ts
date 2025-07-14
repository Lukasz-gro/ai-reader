import { AsyncResult } from '@/shared/entities/result';
import { User } from '@/shared/entities/user';

export interface AuthProvider {
    getAuthenticatedUser(): AsyncResult<User | null, Error>;
    login(email: string, password: string): AsyncResult<User, Error>;
    register(email: string, password: string): AsyncResult<void, Error>;
    logout(): AsyncResult<void, Error>;
}
