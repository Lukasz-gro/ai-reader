import { AsyncResult } from '@/shared/entities/result';
import { User } from '@/shared/entities/user';

export interface LoginUser {
    execute(email: string, password: string): AsyncResult<User, Error>;
}
