import { LogoutUser } from '../ports/in/logout-user';
import { AuthProvider } from '../ports/out/auth-provider';

export class LogoutUserUseCase implements LogoutUser {
    constructor(private readonly authProvider: AuthProvider) {}

    async execute(): Promise<void> {
        await this.authProvider.logout();
    }
} 
