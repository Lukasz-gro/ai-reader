import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { HttpClient, HttpResponse, RequestConfig, HttpError } from '@/shared/application/ports/out/http-client';

export class AxiosHttpClient implements HttpClient {
    private static instance: AxiosInstance | null = null;

    private getAxiosInstance(): AxiosInstance {
        if (!AxiosHttpClient.instance) {
            AxiosHttpClient.instance = axios.create({
                baseURL: process.env.VITE_API_BASE_URL ?? '/api',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            this.setupInterceptors();
        }

        return AxiosHttpClient.instance;
    }

    private setupInterceptors(): void {
        if (!AxiosHttpClient.instance) return;

        AxiosHttpClient.instance.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                const status = error.response?.status ?? 0;
                const message = error.message || 'HTTP request failed';
                return Promise.reject(new HttpError(message, status, error.response?.data));
            }
        );
    }

    private mapAxiosResponse<T>(axiosResponse: AxiosResponse<T>): HttpResponse<T> {
        return {
            data: axiosResponse.data,
            status: axiosResponse.status,
            headers: axiosResponse.headers as Record<string, string>,
        };
    }

    async get<T = unknown>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
        const response = await this.getAxiosInstance().get<T>(url, config);
        return this.mapAxiosResponse(response);
    }

    async post<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<HttpResponse<T>> {
        const response = await this.getAxiosInstance().post<T>(url, data, config);
        return this.mapAxiosResponse(response);
    }

    async put<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<HttpResponse<T>> {
        const response = await this.getAxiosInstance().put<T>(url, data, config);
        return this.mapAxiosResponse(response);
    }

    async delete<T = unknown>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
        const response = await this.getAxiosInstance().delete<T>(url, config);
        return this.mapAxiosResponse(response);
    }

    static reset(): void {
        AxiosHttpClient.instance = null;
    }
} 