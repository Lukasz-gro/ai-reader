import { LearningRoadmap } from "./learning-roadmap";
import { Project } from "../../../shared/entities/project";
import { Conversation } from "../../../shared/entities/conversation";

export interface Course {
    id: string;
    name: string;
    project: Project;
    roadmap: LearningRoadmap;
    conversations: Conversation[];
}
