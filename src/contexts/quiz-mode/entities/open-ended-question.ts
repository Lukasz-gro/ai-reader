import { Answer, Question, QuestionServices, ValidationResult } from './question';
import { v4 as uuidv4 } from 'uuid';

export class OpenEndedQuestion implements Question {
    readonly id: string;
    readonly type = 'open_ended';
    readonly content: string;

    constructor(
        content: string
    ) {
        this.id = uuidv4();
        this.content = content;
    }
    
    async validate(answer: Answer, services: QuestionServices): Promise<ValidationResult> {
        if (!services.evaluate) {
            throw new Error('evaluateNaturalLanguage is not implemented');
        }
        return await services.evaluate(this.content, answer.value as string);
    }
}
