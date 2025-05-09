export interface LLMProvider {
    query: (conversation: LLMMessage[]) => Promise<LLMMessage>;
}

export interface LLMMessage {
    id: string;
    role: LLMRole
    previousId: string | null;
    content: string
}

export enum LLMRole {
    SYSTEM = 'SYSTEM',
    ASSISTANT = 'ASSISTANT',
    USER = 'USER',
}
