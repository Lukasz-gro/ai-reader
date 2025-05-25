import { Answer, Question, QuestionId, QuestionServices, ValidationResult } from './question';

export interface Choice {
    id: string;
    label: string;
}

export class MultipleChoiceQuestion implements Question {
    readonly id: QuestionId;
    readonly type = 'multiple_choice' as const;
    readonly choices: Choice[];
    readonly correctChoiceId: string;
    readonly content: string;

    constructor(
        id: QuestionId,
        content: string,
        choices: Choice[],
        correctChoiceId: string
    ) {
        this.id = id;
        this.content = content;
        this.choices = choices;
        this.correctChoiceId = correctChoiceId;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async validate(answer: Answer, _: QuestionServices): Promise<ValidationResult> {
        return answer.value === this.correctChoiceId 
            ? { ok: true } 
            : { ok: false, feedback: 'Incorrect answer' };
    }
}
