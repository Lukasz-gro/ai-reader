import { User } from '@/shared/entities/user';
import { LoginUser } from '../ports/in/login-user';
import { AuthProvider } from '../ports/out/auth-provider';
import { AsyncResult } from '@/shared/entities/result';

export class LoginUserUseCase implements LoginUser {
    constructor(private readonly authProvider: AuthProvider) {}

    execute(email: string, password: string): AsyncResult<User, Error> {
        return this.authProvider.login(email, password);
    }
} 
