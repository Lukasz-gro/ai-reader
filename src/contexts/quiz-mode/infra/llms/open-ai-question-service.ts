import { Message, Role } from '@/shared/application/ports/out/llm-provider';
import { StructuredLLMProvider } from '@/shared/application/ports/out/structured-llm-provider';
import { Answer, Question, QuestionServices, QuestionValidationResult } from '../../entities/question';
import { questionValidationResultSchema } from '../../application/schemas/question-validation-result.schema';

export class OpenAIQuestionService implements QuestionServices {
    constructor(private readonly structuredLLMProvider: StructuredLLMProvider) {}
    
    async validate(question: Question, userAnswer: Answer, context?: string): Promise<QuestionValidationResult> {
        return await this.structuredLLMProvider.structuredQuery(
            [this.systemNote(), this.userPrompt(question, userAnswer, context)],
            questionValidationResultSchema,
            {
                functionName: 'questionValidation',
                functionDescription: 'Validation result for a single open-ended answer.'
            }
        );
    }

    private systemNote(): Message {
        return {
            id: '1',
            previousId: null,
            role: Role.SYSTEM,
            content: 'You are the teacher and you want to help student learn the provided materials. Your task is to grade user answer.' +
            'You have to provide short feedback to the user if you find the answer incorrect. Please always be nice to the user.'
        };
    }

    private userPrompt(question: Question, userAnswer: Answer, context?: string): Message {
        return {
            id: '2',
            previousId: '1',
            role: Role.USER,
            content: `
                Question context: ${context}.\n\n
                Question: ${question.content}.\n\n
                User answer: ${userAnswer.value}.\n\n

                Respond with { "ok": true } if the answer is substantially correct;
                otherwise { "ok": false, "feedback": "explanation of why the answer is not correct" }
            `
        };
    }
}
