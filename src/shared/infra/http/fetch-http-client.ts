import {
    HttpClient,
    HttpResponse,
    RequestConfig,
    HttpError
} from '@/shared/application/ports/out/http-client';

type FetchRequestConfig = RequestConfig & {
    signal?: AbortSignal;
};

export class FetchHttpClient implements HttpClient {
    private readonly baseURL: string;
    private readonly defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json'
    };

    constructor(baseURL: string = '/api') {
        this.baseURL = baseURL;
    }

    async get<T = unknown>(
        url: string,
        config?: FetchRequestConfig
    ): Promise<HttpResponse<T>> {
        return this.doRequest<T>('GET', url, undefined, config);
    }

    async post<T = unknown>(
        url: string,
        data?: unknown,
        config?: FetchRequestConfig
    ): Promise<HttpResponse<T>> {
        return this.doRequest<T>('POST', url, data, config);
    }

    async put<T = unknown>(
        url: string,
        data?: unknown,
        config?: FetchRequestConfig
    ): Promise<HttpResponse<T>> {
        return this.doRequest<T>('PUT', url, data, config);
    }

    async delete<T = unknown>(
        url: string,
        config?: FetchRequestConfig
    ): Promise<HttpResponse<T>> {
        return this.doRequest<T>('DELETE', url, undefined, config);
    }

    async *stream<T = unknown>(
        url: string,
        data?: unknown,
        config?: FetchRequestConfig
    ): AsyncGenerator<T> {
        const res = await fetch(this.resolve(url), {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
            headers: { ...this.defaultHeaders, ...config?.headers },
            credentials: 'include',
            signal: config?.signal
        });

        if (!res.ok) {
            throw new HttpError(res.statusText, res.status);
        }
        if (!res.body) {
            throw new HttpError('Streaming not supported by browser', 0);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                const lines = buffer.split('\n');
                buffer = lines.pop()!;
                for (const line of lines) {
                    if (line.trim() !== '') yield JSON.parse(line) as T;
                }
            }
            if (buffer.trim() !== '') yield JSON.parse(buffer) as T;
        } finally {
            reader.releaseLock?.();
        }
    }

    private async doRequest<T>(
        method: string,
        url: string,
        body?: unknown,
        config?: FetchRequestConfig
    ): Promise<HttpResponse<T>> {
        const isFormData = body instanceof FormData;
        const headers: HeadersInit = { ...config?.headers };
        let parsedBody: BodyInit | undefined;

        if (body !== undefined) {
            parsedBody = isFormData
                ? (body as FormData)
                : JSON.stringify(body);
        }

        if (!isFormData) {
            headers['Content-Type'] ??= 'application/json';
        }

        try {
            const res = await fetch(this.resolve(url), {
                method,
                body: parsedBody,
                headers: { ...headers, ...config?.headers },
                credentials: 'include',
                signal: config?.signal
            });

            const data = (await (res.headers
                .get('content-type')
                ?.includes('application/json')
                ? res.json()
                : res.text())) as T;

            if (!res.ok) throw new HttpError(res.statusText, res.status, data);

            return {
                data,
                status: res.status,
                headers: Object.fromEntries(res.headers.entries())
            };
        } catch (err: unknown) {
            if (err instanceof HttpError) throw err;
            const message =
                err instanceof Error ? err.message : 'HTTP request failed';
            throw new HttpError(message, 0, err);
        }
    }

    private resolve(url: string): string {
        return url.startsWith('http') ? url : `${this.baseURL}${url}`;
    }
}

export const httpClient = new FetchHttpClient();
