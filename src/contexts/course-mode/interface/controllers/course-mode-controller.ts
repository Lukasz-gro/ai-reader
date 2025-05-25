import { CourseRepo } from '../../application/ports/out/course-repo';
import { LLMProvider, Role } from '@/shared/application/ports/out/llm-provider';
import { StartCourseConversation } from '../../application/ports/in/start-course-conversation';
import { Course } from '../../entities/course';
import { Conversation } from '@/shared/entities/conversation';
import { AddMessageToChat } from '../../application/ports/in/add-message-to-chat';
import { StartCourseConversationConcrete } from '../../application/use-cases/start-course-conversation-concrete';
import { AddMessageToChatUseCase } from '../../application/use-cases/add-message-to-chat';
import { InMemoryCourseRepo } from '../../infra/repo/in-memory-course-repo';
import { OpenAIProvider } from '@/shared/infra/llms/open-ai-provider';

export class CourseModeController {
    constructor(
        private readonly llmProvider: LLMProvider,
        private readonly courseRepo: CourseRepo,
        private readonly startCourseConversation: StartCourseConversation,
        private readonly addMessageToChat: AddMessageToChat,
    ) { }

    onCreateNewCourseConversation = async (course: Course) => {
        return await this.startCourseConversation.execute(course, this.llmProvider, this.courseRepo);
    };

    onNewUserMessage = async (conversation: Conversation, message: string): Promise<Conversation> => {
        return await this.addMessageToChat.execute(conversation, message, Role.USER);
    };

    onNewAssistantMessage = async (conversation: Conversation, message: string, id: string): Promise<Conversation> => {
        return await this.addMessageToChat.execute(conversation, message, Role.ASSISTANT, id);
    };

    onStreamLLMResponse = (conversation: Conversation): AsyncGenerator<string, void, unknown> => {
        return this.llmProvider.streamQuery(conversation.messages);
    };
}

const startCourseConversation = new StartCourseConversationConcrete();
const addUserMessageToChat = new AddMessageToChatUseCase();
const courseRepo = new InMemoryCourseRepo();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) { throw new Error('OPENAI_API_KEY is required'); }
const llmProvider = new OpenAIProvider(apiKey);
// const llmProvider = new MockLLMProvider();

const courseController = new CourseModeController(llmProvider, courseRepo, startCourseConversation, addUserMessageToChat);

export {
    courseController
};
