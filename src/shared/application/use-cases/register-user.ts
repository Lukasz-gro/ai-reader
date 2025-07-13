import { RegisterUser } from '../ports/in/register-user';
import { AuthProvider } from '../ports/out/auth-provider';

export class RegisterUserUseCase implements RegisterUser {
    constructor(private readonly authProvider: AuthProvider) {}

    async execute(email: string, password: string): Promise<void> {
        await this.authProvider.register(email, password);
    }
} 