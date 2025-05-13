import { AddUserMessageToChatConcrete } from "@/contexts/course-mode/application/use-cases/add-user-message-to-chat-concrete";
import { StartCourseConversationConcrete } from "@/contexts/course-mode/application/use-cases/start-course-conversation-concrete";
import { InMemoryCourseRepo } from "@/contexts/course-mode/infra/repo/in-memory-course-repo";
import { CourseModeController } from "@/contexts/course-mode/interface/controllers/course-mode-controller";
import { UuidProvider } from "@/shared/infra/id/uuid-provider";
import { MockLLMProvider } from "@/shared/infra/llms/mock-llm-provider";

const startCourseConversation = new StartCourseConversationConcrete();
const addUserMessageToChat = new AddUserMessageToChatConcrete();
const courseRepo = new InMemoryCourseRepo();
const idProvider = new UuidProvider();
const llmProvider = new MockLLMProvider();

const courseController = new CourseModeController(llmProvider, courseRepo, idProvider, startCourseConversation, addUserMessageToChat);

export {
    courseController
};