import { Message, Role } from '@/shared/application/ports/out/llm-provider';
import { StructuredLLMProvider } from '@/shared/application/ports/out/structured-llm-provider';
import { QuizProvider } from '../../application/ports/out/quiz-provider';
import { QuizQuestion } from '../../entities/quiz-question';

export class OpenAIQuizProvider implements QuizProvider {
    constructor(private readonly structuredLLMProvider: StructuredLLMProvider) {}
 
    async generateQuestions<T extends QuizQuestion>(resource: string, questionSchema: Record<string, unknown>, numOfQuestions = 2): Promise<T[]> {
        const arraySchema = this.wrapSchemaInArray(questionSchema, numOfQuestions);

        const result = await this.structuredLLMProvider.structuredQuery<T[]>(
            [this.systemNote(), this.userPrompt(resource)],
            arraySchema,
            {
                functionName: 'questions',
                functionDescription: `Object with exactly ${numOfQuestions} elements`
            }
        );

        return result;
    }

    private systemNote(): Message {
        return {
            id: '1',
            previousId: null,
            role: Role.SYSTEM,
            content: 'You are the teacher and you want to help student learn the provided materials. Your task is to generate questions.' + 
            'Generate exactly the number of questions user asked you.'
        };
    }

    private userPrompt(content: string): Message {
        return {
            id: '2',
            previousId: '1',
            role: Role.USER,
            content: `Generate quiz for provided material:\n\n ${content}`
        };
    }

    private wrapSchemaInArray(schema: Record<string, unknown>, numOfQuestions: number): Record<string, unknown> {
        return {
            type: 'array',
            minItems: numOfQuestions,
            maxItems: numOfQuestions,
            items: schema
        };
    }
}
