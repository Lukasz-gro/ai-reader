import { LLMQueryError } from '@/shared/entities/llm-query-error';

export class LLMHttpError extends LLMQueryError {
    status: number | undefined;

    constructor(message: string, status: number | undefined) {
        super(message);
        this.status = status;
    }
}
