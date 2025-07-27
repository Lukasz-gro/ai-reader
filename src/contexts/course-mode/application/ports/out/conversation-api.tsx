import { Conversation, ConversationMessage, Mode } from '@/shared/entities/conversation';

export interface StringChunk {
    chunk: string;
}

export interface ConversationApi {
    startConversation(projectId: string, mode: Mode, initialPrompt: string): Promise<Conversation>;
    getProjectConversations(projectId: string): Promise<Conversation[]>;
    pushNewMessage(message: ConversationMessage): Promise<Conversation>;
    streamAssistantResponse(conversationId: string): Promise<AsyncGenerator<StringChunk, void, unknown>>
}
