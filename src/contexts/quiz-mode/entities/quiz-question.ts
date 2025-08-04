import { MultipleChoiceQuestion } from './multiple-choice-question';
import { OpenEndedQuestion } from './open-ended-question';
import { UserAnswer } from './question';

export interface QuizQuestionContext {
    readonly quizId: string,
    userAnswer: UserAnswer
}

export interface OpenEndedQuizQuestion extends OpenEndedQuestion, QuizQuestionContext {}

export interface MultipleChoiceQuizQuestion extends MultipleChoiceQuestion, QuizQuestionContext {}

export type QuizQuestion = OpenEndedQuizQuestion | MultipleChoiceQuizQuestion;
