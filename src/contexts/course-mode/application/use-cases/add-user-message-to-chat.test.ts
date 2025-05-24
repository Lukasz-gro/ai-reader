import { describe, expect, it } from 'vitest';
import { AddUserMessageToChatUseCase } from '@/contexts/course-mode/application/use-cases/add-user-message-to-chat';
import { Conversation } from '@/shared/entities/conversation';
import { MockConversation } from '@/shared/infra/mocks/mock-conversation';

describe('add user message to chat use case', () => {
    const useCase = new AddUserMessageToChatUseCase();

    it('should return conversation with added message', async () => {
        const ogConv: Conversation = new MockConversation().build()
        const newMessage = 'i\'ve seen things you people wouldn\'t believe';

        const newConv = await useCase.execute(ogConv, newMessage);

        const addedMessage = newConv.messages.at(-1)
        expect(newConv.messages.length).to.equal(ogConv.messages.length + 1);
        expect(addedMessage?.content).to.equal(newMessage);
        expect(addedMessage?.previousId).to.equal(ogConv.messages.at(-1)?.id);
    });
});
