import { User } from '@/shared/entities/user';
import { AuthProvider } from '@/shared/application/ports/out/auth-provider';
import { HttpClient, HttpError } from '@/shared/application/ports/out/http-client';

export class HttpCookieAuthProvider implements AuthProvider {
    constructor(private readonly httpClient: HttpClient) {}

    async getAuthenticatedUser(): Promise<User | null> {
        try {
            const response = await this.httpClient.get<User>('/auth/me');
            return response.data;
        } catch (error) {
            if (error instanceof HttpError && error.status === 401) {
                return null;
            }
            throw error;
        }
    }

    async login(email: string, password: string): Promise<User> {
        const response = await this.httpClient.post<User>('/auth/login', {
            email,
            password,
        });

        return response.data;
    }

    async logout(): Promise<void> {
        await this.httpClient.post('/auth/logout');
    }
} 