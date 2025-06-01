import { Answer, Question, QuestionServices, ValidationResult } from './question';

export interface Choice {
    id: string;
    label: string;
}

export class MultipleChoiceQuestion implements Question {
    readonly id: string;
    readonly type = 'multiple_choice';
    readonly choices: Choice[];
    readonly correctChoiceId: string;
    readonly content: string;

    constructor(
        id: string,
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
