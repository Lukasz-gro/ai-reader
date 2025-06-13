export interface User {
    id: string;
    username: string;
    email: string;
    /** BCrypt, Argon2, etc. – already hashed */
    passwordHash: string;
    roles: UserRole[];
    createdAt: Date;
}

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}
