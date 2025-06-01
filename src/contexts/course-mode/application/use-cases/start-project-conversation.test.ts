import { expect, afterEach, describe, it } from 'vitest';
import { InMemoryProjectRepo } from '../../infra/repo/in-memory-project-repo';
import { StartProjectConversationUseCase } from './start-project-conversation';
import { LearningRoadmap } from '../../entities/learning-roadmap';
import { Project } from '@/shared/entities/project';
import { MockLLMProvider } from '@/shared/infra/llms/mock-llm-provider';

describe('StartCourseConversationConcrete Use Case', () => {
    const useCase = new StartProjectConversationUseCase();
    const mockProjectRepo = new InMemoryProjectRepo();
    const mockLLMProvider = new MockLLMProvider();

    afterEach(() => {
        mockProjectRepo.clear();
    });

    it('should generate a new conversation', async () => {
        await useCase.execute(getMockProject(), 'course', mockLLMProvider, mockProjectRepo);

        const courses = await mockProjectRepo.getAll();

        expect(courses.length).to.equal(1);
    });
});

const getMockProject = () => {
    const res: Project = {
        id: 'test-project',
        title: 'Some Project',
        roadmap: getMockRoadmap(),
        conversations: [],
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
