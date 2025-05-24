import { CourseRepo } from '../../application/ports/out/course-repo';
import { LLMProvider } from '@/shared/application/ports/out/llm-provider';
import { StartCourseConversation } from '../../application/ports/in/start-course-conversation';
import { Course } from '../../entities/course';
import { Conversation } from '@/shared/entities/conversation';
import { AddUserMessageToChat } from '../../application/ports/in/add-user-message-to-chat';
import { StartCourseConversationConcrete } from '../../application/use-cases/start-course-conversation-concrete';
import { AddUserMessageToChatUseCase } from '../../application/use-cases/add-user-message-to-chat';
import { InMemoryCourseRepo } from '../../infra/repo/in-memory-course-repo';
import { MockLLMProvider } from '@/shared/infra/llms/mock-llm-provider';

export class CourseModeController {
    constructor(
        private readonly llmProvider: LLMProvider,
        private readonly courseRepo: CourseRepo,
        private readonly startCourseConversation: StartCourseConversation,
        private readonly addUserMessageToChat: AddUserMessageToChat
    ) { }

    onCreateNewCourseConversation = async (course: Course) => {
        return await this.startCourseConversation.execute(course, this.llmProvider, this.courseRepo);
    };

    onNewUserMessage = async (conversation: Conversation, message: string) => {
        return await this.addUserMessageToChat.execute(conversation, message);
    };
}

const startCourseConversation = new StartCourseConversationConcrete();
const addUserMessageToChat = new AddUserMessageToChatUseCase();
const courseRepo = new InMemoryCourseRepo();

const llmProvider = new MockLLMProvider()

const courseController = new CourseModeController(llmProvider, courseRepo, startCourseConversation, addUserMessageToChat);

export {
    courseController
};
