import { Question, Choice } from './question';

export interface MultipleChoiceQuestion extends Question {
    readonly type: 'multiple_choice';
    readonly choices: Choice[];
}
