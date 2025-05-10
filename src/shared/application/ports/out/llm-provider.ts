export interface LLMProvider {
    query: (conversation: Message[]) => Promise<Message>;
}

export interface Message {
    id: string;
    role: Role
    previousId: string | null;
    content: string
}

export enum Role {
    SYSTEM = 'SYSTEM',
    ASSISTANT = 'ASSISTANT',
    USER = 'USER',
}
