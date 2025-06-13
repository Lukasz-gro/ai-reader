export interface Session {
    id: string;
    userId: string;
    expiresAt: number;
    ipAddress?: string;
    userAgent?: string;
}
