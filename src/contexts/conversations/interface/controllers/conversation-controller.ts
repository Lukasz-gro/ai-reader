import { Conversation, ConversationMessage, Mode, Role } from '@/shared/entities/conversation';
import { v4 as uuidv4 } from 'uuid';
import { ConversationApi } from '@/contexts/conversations/application/ports/out/conversation-api';
import { ConversationHttpApi } from '@/contexts/conversations/infra/conversation-http-api';
import { FetchHttpClient } from '@/shared/infra/http/fetch-http-client';

// TODO move to useCases

export class ConversationController {
    constructor(
        private readonly conversationApi: ConversationApi,
    ) { }

    async handleStartNewConversation(projectId: string, mode: Mode, initialPrompt: string) {
        return this.conversationApi.startConversation(projectId, mode, initialPrompt);
    }

    async handleNewUserMessage(conversation: Conversation, message: string): Promise<Conversation> {
        const previousId = conversation.messages.at(-1)?.id ?? null;
        const userMessage = this.buildUserMessage(conversation.id, previousId, message);

        return this.conversationApi.pushNewMessage(userMessage);
    }

    async handleNewAssistantMessage(conversation: Conversation, message: string, id: string) {
        const previousId = conversation.messages.at(-1)?.id ?? null;
        const assistantMessage = this.buildAssistantMessage(id, conversation.id, previousId, message);

        return this.conversationApi.pushNewMessage(assistantMessage);
    }

    streamLLMResponse(conversationId: string) {
        return this.conversationApi.streamAssistantResponse(conversationId);
    }

    private buildUserMessage(conversationId: string, previousId: string | null, content: string): ConversationMessage {
        return {
            id: uuidv4(),
            conversationId,
            previousId,
            content,
            role: Role.USER,
        };
    }

    private buildAssistantMessage(id: string, conversationId: string, previousId: string | null, content: string): ConversationMessage {
        return {
            id,
            conversationId,
            previousId,
            content,
            role: Role.ASSISTANT,
        };
    }
}

const httpClient = new FetchHttpClient();
const api = new ConversationHttpApi(httpClient);

export const conversationController = new ConversationController(api);
