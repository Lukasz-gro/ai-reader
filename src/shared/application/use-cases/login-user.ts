import { User } from '@/shared/entities/user';
import { LoginUser } from '../ports/in/login-user';
import { AuthProvider } from '../ports/out/auth-provider';

export class LoginUserUseCase implements LoginUser {
    constructor(private readonly authProvider: AuthProvider) {}

    async execute(email: string, password: string): Promise<User> {
        return await this.authProvider.login(email, password);
    }
} 
