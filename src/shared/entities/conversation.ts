export interface Message {
    id: string;
    role: Role
    previousId: string | null;
    content: string | string[];
}

export interface ConversationMessage extends Message {
    conversationId: string;
}

export enum Role {
    SYSTEM = 'SYSTEM',
    ASSISTANT = 'ASSISTANT',
    USER = 'USER',
}

export type Mode = 'course' | 'explain' | 'quiz' ;

export interface Conversation {
    id: string;
    projectId: string;
    title: string;
    messages: ConversationMessage[];
    mode: Mode;
}

export interface ConversationPreview {
    id: string;
    name: string;
}
