import { Project } from '@/shared/entities/project';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { CreateQuizFromMaterial } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';
import { QuizProvider } from '@/contexts/quiz-mode/application/ports/out/quiz-provider';
import { MultipleChoiceQuestionSchema } from '../schemas/multiple-choice-question.schema';
import { v4 as uuidv4 } from 'uuid';
import { MaterialRepo } from '@/shared/application/ports/out/material-repo';

export class CreateQuizFromMaterialUseCase implements CreateQuizFromMaterial {
    async execute(project: Project, quizProvider: QuizProvider, materialRepo: MaterialRepo): Promise<Quiz> {
        const questions = await quizProvider.generateQuestions(
            await this.extractContent(project, materialRepo),
            MultipleChoiceQuestionSchema
        );
        
        return {
            id: uuidv4(),
            name: `Quiz for ${project.title}`,
            questions
        };
    }

    private async extractContent(project: Project, materialRepo: MaterialRepo): Promise<string> {
        const materialIds = project.materialIds;
        const allMaterials = await materialRepo.getAll();
        const projectMaterials = allMaterials.filter(material => materialIds.includes(material.id));
        
        if (projectMaterials.length === 0) {
            return project.title;
        }

        const contentParts = projectMaterials.map(material => {
            const title = material.title;
            const content = material.content.type === 'text' ? material.content.content : '';
            return `Material: ${title}\n${content}`;
        });

        return contentParts.join('\n\n');
    }
}
