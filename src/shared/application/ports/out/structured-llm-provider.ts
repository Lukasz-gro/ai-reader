import { Message } from './llm-provider';


export interface StructuredLLMProvider {
    structuredQuery<T = unknown>(conversation: Message[], returnSchema: Record<string, unknown>, functionCallingArguments: FunctionCallingArguments): Promise<T>;
}

export interface FunctionCallingArguments {
    functionName: string;
    functionDescription: string;
}
