import { CourseRepo } from "../../application/ports/out/course-repo";
import { LLMProvider } from "../../../../shared/application/ports/out/llm-provider";
import { IdProvider } from "../../../../shared/application/ports/out/id-provider";
import { StartCourseConversation } from "../../application/ports/in/start-course-conversation";
import { Course } from "../../entities/course";
import { Conversation } from "@/shared/entities/conversation";
import { AddUserMessageToChat } from "../../application/ports/in/add-user-message-to-chat";

export class CourseModeController {
    constructor(
        private readonly llmProvider: LLMProvider,
        private readonly courseRepo: CourseRepo,
        private readonly idProvider: IdProvider,
        private readonly startCourseConversation: StartCourseConversation,
        private readonly addUserMessageToChat: AddUserMessageToChat
    ) { }

    onCreateNewCourseConversation = async (course: Course) => {
        return await this.startCourseConversation.execute(course, this.llmProvider, this.idProvider, this.courseRepo);
    }

    onLoadCourses = async () => {
        // something
    }

    onNewUserMessage = async (conversation: Conversation, message: string) => {
        return await this.addUserMessageToChat.execute(conversation, this.idProvider, message);
    }
}
