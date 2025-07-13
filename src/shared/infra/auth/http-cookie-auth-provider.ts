import { User } from '@/shared/entities/user';
import { AuthProvider } from '@/shared/application/ports/out/auth-provider';
import { HttpClient, HttpError } from '@/shared/application/ports/out/http-client';

export class HttpCookieAuthProvider implements AuthProvider {
    constructor(private readonly httpClient: HttpClient) {}

    async getAuthenticatedUser(): Promise<User | null> {
        try {
            const response = await this.httpClient.get<{ user: User }>('/auth/me');
            return response.data.user;
        } catch (error) {
            if (error instanceof HttpError && error.status === 401) {
                return null;
            }
            throw error;
        }
    }

    async login(email: string, password: string): Promise<User> {
        await this.httpClient.post<{ message: string }>('/auth/login', {
            email,
            password,
        });

        const userResponse = await this.httpClient.get<{ user: User }>('/auth/me');
        return userResponse.data.user;
    }

    async register(email: string, password: string): Promise<void> {
        await this.httpClient.post<{ message: string }>('/auth/register', {
            email,
            password,
        });
    }

    async logout(): Promise<void> {
        //TODO add on backend
        await this.httpClient.post('/auth/logout');
    }
} 
