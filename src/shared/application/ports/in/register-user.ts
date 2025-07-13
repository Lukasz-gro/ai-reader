export interface RegisterUser {
    execute(email: string, password: string): Promise<void>;
} 