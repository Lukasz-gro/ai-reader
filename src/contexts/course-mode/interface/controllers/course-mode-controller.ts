import { ProjectRepo } from '../../application/ports/out/project-repo';
import { LLMProvider, Role } from '@/shared/application/ports/out/llm-provider';
import { StartProjectConversation } from '../../application/ports/in/start-project-conversation';
import { Conversation, Mode } from '@/shared/entities/conversation';
import { AddMessageToChat } from '../../application/ports/in/add-message-to-chat';
import { StartProjectConversationUseCase } from '../../application/use-cases/start-project-conversation-use-case';
import { AddMessageToChatUseCase } from '../../application/use-cases/add-message-to-chat';
import { InMemoryProjectRepo } from '../../infra/repo/in-memory-project-repo';
import { Project } from '@/shared/entities/project';
import { OpenAIProvider } from '@/shared/infra/llms/open-ai-provider';

export class CourseModeController {
    constructor(
        private readonly llmProvider: LLMProvider,
        private readonly courseRepo: ProjectRepo,
        private readonly startCourseConversation: StartProjectConversation,
        private readonly addMessageToChat: AddMessageToChat,
    ) { }

    onCreateNewProjectConversation = async (project: Project, mode: Mode) => {
        return await this.startCourseConversation.execute(project, mode, this.llmProvider, this.courseRepo);
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

const startCourseConversation = new StartProjectConversationUseCase();
const addUserMessageToChat = new AddMessageToChatUseCase();
const projectRepo = new InMemoryProjectRepo();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) { throw new Error('OPENAI_API_KEY is required'); }
const llmProvider = new OpenAIProvider(apiKey);
// const llmProvider = new MockLLMProvider();

const courseController = new CourseModeController(llmProvider, projectRepo, startCourseConversation, addUserMessageToChat);

export {
    courseController
};
