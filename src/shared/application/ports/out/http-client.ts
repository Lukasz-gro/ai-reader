export interface HttpResponse<T = unknown> {
    data: T;
    status: number;
    headers: Record<string, string>;
}

export class HttpError extends Error {
    constructor(
        message: string,
        public readonly status: number,
        public readonly response?: unknown
    ) {
        super(message);
        this.name = 'HttpError';
    }
}

export interface HttpClient {
    get<T = unknown>(url: string, config?: RequestConfig): Promise<HttpResponse<T>>;
    stream<T = unknown>(url: string, config?: RequestConfig): AsyncGenerator<T>;
    post<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<HttpResponse<T>>;
    put<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<HttpResponse<T>>;
    delete<T = unknown>(url: string, config?: RequestConfig): Promise<HttpResponse<T>>;
}

export interface RequestConfig {
    headers?: Record<string, string>;
    timeout?: number;
} 
