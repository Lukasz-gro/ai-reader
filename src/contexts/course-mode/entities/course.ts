import { LearningRoadmap } from "./learning-roadmap";
import { Project } from "../../../shared/entities/project";
import { LLMConversation } from "../../../shared/entities/llm-conversation";

export interface Course {
    id: string;
    name: string;
    project: Project;
    roadmap: LearningRoadmap;
    conversations: LLMConversation[];
}
