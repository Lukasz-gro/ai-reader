import { Message } from '../application/ports/out/llm-provider';

export interface Conversation {
    id: string;
    messages: Message[];
    mode: Mode;
}

export type Mode = 'course' | 'explain' | 'quiz' ;
