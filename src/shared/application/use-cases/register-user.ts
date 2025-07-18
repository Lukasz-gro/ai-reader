import { RegisterUser } from '../ports/in/register-user';
import { AuthProvider } from '../ports/out/auth-provider';
import { AsyncResult } from '@/shared/entities/result';

export class RegisterUserUseCase implements RegisterUser {
    constructor(private readonly authProvider: AuthProvider) {}

    execute(email: string, password: string): AsyncResult<void, Error> {
        return this.authProvider.register(email, password);
    }
} 
