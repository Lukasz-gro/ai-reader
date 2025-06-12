import { Message } from '../application/ports/out/llm-provider';

export interface Conversation {
    id: string;
    title: string;
    messages: Message[];
    mode: Mode;
}

export interface UiConversation {
    id: string;
    title: string;
    mode: Mode;
}

export type Mode = 'course' | 'explain' | 'quiz' ;
