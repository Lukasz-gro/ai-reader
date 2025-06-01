import { Question } from './question';

export interface OpenEndedQuestion extends Question {
    readonly type: 'open_ended';
}
