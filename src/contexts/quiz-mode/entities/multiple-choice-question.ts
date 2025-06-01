import { Question} from './question';

export interface Choice {
    id: string;
    label: string;
}

export interface MultipleChoiceQuestion extends Question {
    readonly type: 'multiple_choice';
    readonly choices: Choice[];
    readonly correctChoiceId: string;
    readonly content: string;
}
