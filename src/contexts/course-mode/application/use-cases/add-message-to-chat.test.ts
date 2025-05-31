import { beforeEach, describe, expect, it } from 'vitest';
import { AddMessageToChatUseCase } from '@/contexts/course-mode/application/use-cases/add-message-to-chat';
import { Conversation } from '@/shared/entities/conversation';
import { MockConversation } from '@/shared/infra/mocks/mock-conversation';
import { Role } from '@/shared/application/ports/out/llm-provider';

describe('add user message to chat use case', () => {
    let useCase: AddMessageToChatUseCase;

    beforeEach(() => {
        useCase = new AddMessageToChatUseCase();
    });

    for (const role of [Role.USER, Role.ASSISTANT]) {
        it(`should return conversation with added ${role} message`, async () => {
            const ogConv: Conversation = new MockConversation().build();
            const newMessage = 'i\'ve seen things you people wouldn\'t believe';

            const newConv = await useCase.execute(ogConv, newMessage, role);

            const addedMessage = newConv.messages.at(-1);
            expect(newConv.messages.length).to.equal(ogConv.messages.length + 1);
            expect(addedMessage).toBeDefined();
            expect(addedMessage!.content).to.equal(newMessage);
            expect(addedMessage!.role).to.equal(role);
            expect(addedMessage!.previousId).to.equal(ogConv.messages.at(-1)?.id);
        });
    }
});
