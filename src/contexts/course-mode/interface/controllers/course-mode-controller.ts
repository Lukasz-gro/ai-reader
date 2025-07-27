import { Conversation, ConversationMessage, Mode, Role } from '@/shared/entities/conversation';
import { v4 as uuidv4 } from 'uuid';
import { httpClient } from '@/shared/infra/http/fetch-http-client';

// TODO move to useCases

// TODO add conversationApi and use instead of raw calls
export async function handleNewUserMessage(conversation: Conversation, message: string) {
    const userMessage: ConversationMessage = {
        id: uuidv4(),
        conversationId: conversation.id,
        previousId: conversation.messages[-1]?.id ?? null,
        role: Role.USER,
        content: message,
    };

    const response = await httpClient.post<Conversation>('/conversation/message', { message: userMessage });
    return response.data;
}

export async function handleStartNewConversation(projectId: string, mode: Mode, initialPrompt: string) {
    const response = await httpClient.post<Conversation>('/conversation/new', {projectId, mode, initialPrompt});
    return response.data;
}

export async function handleNewAssistantMessage(conversation: Conversation, message: string, id: string) {
    const userMessage: ConversationMessage = {
        id,
        conversationId: conversation.id,
        previousId: conversation.messages[-1]?.id ?? null,
        role: Role.ASSISTANT,
        content: message,
    };

    conversation.messages.push(userMessage);
    const response = await httpClient.post<Conversation>('/conversation/message', { message: userMessage });
    return response.data;
}

interface StringChunk {
    chunk: string;
}

export function streamLLMResponse(conversationId: string) {
    return httpClient.stream<StringChunk>('/conversation/stream', { conversationId });
}
