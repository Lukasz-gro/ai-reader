import { Message, Role, StructuredLLMProvider } from '@/shared/application/ports/out/llm-provider';
import { Answer, Question, QuestionServices, QuestionValidationResult } from '../../entities/question';
import { multipleChoiceQuestionSchemaJson } from '../../application/schemas/multiple-choice-question.schema';

export class OpenAIQuestionService implements QuestionServices {
    constructor(private readonly structuredLLMProvider: StructuredLLMProvider) {}
    
    async validate(question: Question, userAnswer: Answer, context?: string): Promise<QuestionValidationResult> {
        return await this.structuredLLMProvider.functionCalling(
            [this.systemNote(), this.userPrompt(question, userAnswer, context)],
            multipleChoiceQuestionSchemaJson,
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
            'Its okay to provide short feedback to the user if you find the nswer incorrect'
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
                otherwise { "ok": false, "feedback": "…optional guidance…" }
            `
        };
    }
}
