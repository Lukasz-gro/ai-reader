import { Project } from '@/shared/entities/project';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { CreateQuizFromMaterial } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';
import { QuizProvider } from '@/contexts/quiz-mode/application/ports/out/quiz-provider';
import { MultipleChoiceQuestionSchema } from '../schemas/multiple-choice-question.schema';
import { v4 as uuidv4 } from 'uuid';

export class CreateQuizFromMaterialUseCase implements CreateQuizFromMaterial {
    async execute(project: Project, quizProvider: QuizProvider): Promise<Quiz> {
        const questions = await quizProvider.generateQuestions(
            this.extractContent(project),
            MultipleChoiceQuestionSchema
        );
        console.log(questions);
        
        return {
            id: uuidv4(),
            name: `Quiz for ${project.title}`,
            questions
        };
    }

    private extractContent(project: Project): string {
        return `Create quiz about Poland's geography - ${project.title}`
    }
}
