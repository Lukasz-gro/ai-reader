import { expect, afterEach, describe, it } from 'vitest';
import { InMemoryCourseRepo } from '../../infra/repo/in-memory-course-repo';
import { StartCourseConversationConcrete } from './start-course-conversation-concrete';
import { Course } from '../../entities/course';
import { LearningRoadmap } from '../../entities/learning-roadmap';
import { Project } from '../../../../shared/entities/project';
import { MockLLMProvider } from '../../../../shared/infra/llms/mock-llm-provider';
import { UuidProvider } from '../../../../shared/infra/id/uuid-provider';

describe('StartCourseConversationConcrete Use Case', () => {
    const useCase = new StartCourseConversationConcrete();
    const mockCourseRepo = new InMemoryCourseRepo();
    const mockLLMProvider = new MockLLMProvider();
    const idProvider = new UuidProvider();

    afterEach(() => {
        mockCourseRepo.clear();
    });

    it('should generate a new conversation', async () => {
        await useCase.execute(getMockCourse(), mockLLMProvider, idProvider, mockCourseRepo);

        const courses = await mockCourseRepo.getAll();

        expect(courses.length).to.equal(1);
    });
});

const getMockCourse = () => {
    const res: Course = {
        id: 'test-course',
        name: 'Some Course',
        project: getMockProject(),
        conversations: [],
        roadmap: getMockRoadmap(),
    };
    return res;
};

const getMockProject = () => {
    const res: Project = {
        id: 'test-project',
        title: 'Some Project',
        materials: [],
    };
    return res;
};

const getMockRoadmap = () => {
    const res: LearningRoadmap = {
        id: 'test-roadmap',
        title: 'Test Roadmap',
        checkpoints: [],
    };
    return res;
};
