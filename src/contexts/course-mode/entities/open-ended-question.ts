import { Answer, Question, QuestionId, QuestionServices, ValidationResult } from './question';

export class OpenEndedQuestion implements Question {
    readonly id: QuestionId;
    readonly type = 'open_ended' as const;
    readonly content: string;

    constructor(
        id: QuestionId,
        content: string
    ) {
        this.id = id;
        this.content = content;
    }
    
    async validate(answer: Answer, services: QuestionServices): Promise<ValidationResult> {
        if (!services.evaluateNaturalLanguage) {
            throw new Error('evaluateNaturalLanguage is not implemented');
        }
        return await services.evaluateNaturalLanguage(this.content, answer.value as string);
    }
}