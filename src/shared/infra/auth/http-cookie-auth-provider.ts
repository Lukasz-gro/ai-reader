import { User } from '@/shared/entities/user';
import { AuthProvider } from '@/shared/application/ports/out/auth-provider';
import { HttpClient, HttpError } from '@/shared/application/ports/out/http-client';
import { AsyncResult, isNok, ok, tryResult } from '@/shared/entities/result';

export class HttpCookieAuthProvider implements AuthProvider {
    constructor(private readonly httpClient: HttpClient) {}

    async getAuthenticatedUser(): AsyncResult<User | null, Error> {
        return tryResult(async () => {
            const response = await this.httpClient.get<{ user: User }>('/auth/me');
            return response.data.user;
        }).then(r => {
            return isNok(r) && r.error instanceof HttpError && r.error.status === 401
                ? ok(null)
                : r;
        });
    }

    async login(email: string, password: string): AsyncResult<User, Error> {
        return tryResult(async () => {
            await this.httpClient.post<{ message: string }>('/auth/login', {
                email,
                password,
            });

            const userResponse = await this.httpClient.get<{ user: User }>('/auth/me');
            return userResponse.data.user;
        });
    }

    async register(email: string, password: string): AsyncResult<void, Error> {
        return tryResult(async () => {
            await this.httpClient.post('/auth/register', { email, password });
        });
    }

    async logout(): AsyncResult<void, Error> {
        return tryResult(async () => {
            await this.httpClient.post('/auth/logout');
        });
    }
} 
