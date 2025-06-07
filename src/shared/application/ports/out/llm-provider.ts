export interface LLMProvider {
    query(conversation: Message[]): Promise<string>;
    streamQuery: (conversation: Message[]) => AsyncGenerator<string, void, unknown>;
}

export interface StructuredLLMProvider {
    functionCalling<T = unknown>(conversation: Message[], returnSchema: Record<string, unknown>, functionCallingArguments: FunctionCallingArguments): Promise<T>;
}

export interface Message {
    id: string;
    role: Role
    previousId: string | null;
    content: string | string[];
}

export enum Role {
    SYSTEM = 'SYSTEM',
    ASSISTANT = 'ASSISTANT',
    USER = 'USER',
}

export interface FunctionCallingArguments {
    functionName: string, 
    functionDescription: string
}
