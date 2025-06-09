import { Project } from '@/shared/entities/project';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { CreateQuizFromMaterial } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';
import { QuizProvider, QuizGenerationParams } from '@/contexts/quiz-mode/application/ports/out/quiz-provider';
import { v4 as uuidv4 } from 'uuid';
import { MaterialRepo } from '@/shared/application/ports/out/material-repo';
import { multipleChoiceQuestionSchemaJson, validateMCQSchema } from '../schemas/multiple-choice-question.schema';
import { openEndedQuestionSchemaJson, validateOEQSchema } from '../schemas/open-ended-question.schema';
import { QuizCreationParams } from '../ports/in/create-quiz-from-material';
import { QuizQuestion } from '@/contexts/quiz-mode/entities/quiz-question';

export class CreateQuizFromMaterialUseCase implements CreateQuizFromMaterial {
    async execute(
        project: Project, 
        quizProvider: QuizProvider, 
        materialRepo: MaterialRepo,
        params: QuizCreationParams
    ): Promise<Quiz> {
        const content = await this.extractResource(project, materialRepo);
        const questions: QuizQuestion[] = [];

        const { multipleChoiceCount, openEndedCount } = this.calculateQuestionDistribution(params);

        const generationParams: QuizGenerationParams = {
            difficulty: params.difficulty,
            numberOfQuestions: params.numberOfQuestions
        };

        if (params.includeMultipleChoice && multipleChoiceCount > 0) {
            const multipleChoiceQuestions = await quizProvider.generateQuestions(
                content,
                {
                    schemaDefinition: multipleChoiceQuestionSchemaJson,
                    validateSchema: validateMCQSchema
                },
                { ...generationParams, numberOfQuestions: multipleChoiceCount }
            );
            questions.push(...multipleChoiceQuestions);
        }

        if (params.includeOpenEnded && openEndedCount > 0) {
            const openEndedQuestions = await quizProvider.generateQuestions(
                content,
                {
                    schemaDefinition: openEndedQuestionSchemaJson,
                    validateSchema: validateOEQSchema
                },
                { ...generationParams, numberOfQuestions: openEndedCount }
            );
            questions.push(...openEndedQuestions);
        }

        const shuffledQuestions = this.shuffleQuestions(questions);

        return {
            id: uuidv4(),
            name: `${this.formatDifficultyLevel(params.difficulty)} Quiz for ${project.title}`,
            questions: shuffledQuestions
        };
    }

    private calculateQuestionDistribution(params: QuizCreationParams): { multipleChoiceCount: number; openEndedCount: number } {
        const { numberOfQuestions, includeMultipleChoice, includeOpenEnded } = params;

        if (includeMultipleChoice && includeOpenEnded) {
            const openEndedCount = Math.floor(numberOfQuestions * 0.3);
            const multipleChoiceCount = numberOfQuestions - openEndedCount;
            return { multipleChoiceCount, openEndedCount };
        }
        
        if (includeMultipleChoice && !includeOpenEnded) {
            return { multipleChoiceCount: numberOfQuestions, openEndedCount: 0 };
        }
        
        if (!includeMultipleChoice && includeOpenEnded) {
            return { multipleChoiceCount: 0, openEndedCount: numberOfQuestions };
        }
        
        return { multipleChoiceCount: numberOfQuestions, openEndedCount: 0 };
    }

    private shuffleQuestions(questions: QuizQuestion[]): QuizQuestion[] {
        const shuffled = [...questions];
        
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        return shuffled;
    }

    private formatDifficultyLevel(difficulty: string): string {
        return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    }

    private async extractResource(project: Project, materialRepo: MaterialRepo): Promise<string> {
        const materialIds = project.materialIds;
        const allMaterials = await materialRepo.getAll();
        const projectMaterials = allMaterials.filter(material => materialIds.includes(material.id));
        
        if (projectMaterials.length === 0) {
            return project.title;
        }

        const contentParts = projectMaterials.map(material => {
            const title = material.title;
            const content = material.content.type === 'text' ? material.content.text : '';
            return `Material: ${title}\n${content}`;
        });

        return contentParts.join('\n\n');
    }
}
