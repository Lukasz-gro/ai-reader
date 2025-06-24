import { User } from '@/shared/entities/user';
import { AuthProvider } from '@/shared/application/ports/out/auth-provider';
import { HttpClient, HttpError } from '@/shared/application/ports/out/http-client';

export class HttpCookieAuthProvider implements AuthProvider {
    private currentUser: User | null = null;

    constructor(private readonly httpClient: HttpClient) {}

    private handleAuthError(error: unknown): void {
        if (this.isUnauthorizedError(error)) {
            this.currentUser = null;
        }
    }

    private isUnauthorizedError(error: unknown): boolean {
        return error instanceof HttpError && error.status === 401;
    }

    getAuthenticatedUser(): User | null {
        return this.currentUser;
    }

    async login(email: string, password: string): Promise<User> {
        const response = await this.httpClient.post<User>('/auth/login', {
            email,
            password,
        });

        this.currentUser = response.data;
        return response.data;
    }

    async logout(): Promise<void> {
        try {
            await this.httpClient.post('/auth/logout');
            this.currentUser = null;
        } catch (error) {
            this.currentUser = null;
            throw error;
        }
    }

    async initializeFromServer(): Promise<User | null> {
        try {
            const response = await this.httpClient.get<User>('/auth/me');
            this.currentUser = response.data;
            return response.data;
        } catch (error) {
            this.handleAuthError(error);
            return null;
        }
    }
} 