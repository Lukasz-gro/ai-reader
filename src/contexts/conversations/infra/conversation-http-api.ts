import { ConversationApi, StringChunk } from '@/contexts/conversations/application/ports/out/conversation-api';
import { HttpClient } from '@/shared/application/ports/out/http-client';
import { Conversation, ConversationMessage, Mode } from '@/shared/entities/conversation';
import { MockConversation } from '@/shared/infra/testing/mock-conversation';

export class ConversationHttpApi implements ConversationApi {
    constructor(
        private readonly httpClient: HttpClient,
    ) { }

    async getProjectConversations(projectId: string): Promise<Conversation[]> {
        // TODO
        void projectId;
        return Array.from({ length: 8 }, () => new MockConversation().withLength(8).build());
    }

    async startConversation(projectId: string, mode: Mode, initialPrompt: string): Promise<Conversation> {
        const response = await this.httpClient.post<Conversation>('/conversation/new', {projectId, mode, initialPrompt});
        return response.data;
    }

    async pushNewMessage(message: ConversationMessage): Promise<Conversation> {
        const response = await this.httpClient.post<Conversation>('/conversation/message', { message });
        return response.data;
    }

    async streamAssistantResponse(conversationId: string): Promise<AsyncGenerator<StringChunk, void, unknown>> {
        return this.httpClient.stream<StringChunk>('/conversation/stream', { conversationId });
    }
}
