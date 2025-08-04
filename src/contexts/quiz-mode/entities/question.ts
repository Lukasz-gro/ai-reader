export type QuestionValidationResult = { ok: true } | { ok: false; feedback?: string };

export interface Answer {
  value: unknown;
}

export type QuestionType = 'multiple_choice' | 'open_ended';

type AnswerLifecycle = 'UNANSWERED' | 'NOT_CHECKED' | 'CHECKED';

interface BaseUserAnswer {
    state: AnswerLifecycle;
}

export interface EmptyAnswer extends BaseUserAnswer {
    state: 'UNANSWERED'
}

export interface NotCheckedAnswer extends BaseUserAnswer {
    state: 'NOT_CHECKED',
    answer: Answer
}

export interface CheckedAnswer extends BaseUserAnswer {
    state: 'CHECKED',
    answer: Answer,
    isCorrect: boolean,
    comment?: string
}

export type UserAnswer = EmptyAnswer | NotCheckedAnswer | CheckedAnswer;

export interface Choice {
    id: string;
    label: string;
}

export interface QuestionServices {
    validate(question: Question, userAnswer: Answer, context?: string): Promise<QuestionValidationResult>;
}

export interface Question {
    readonly id: string;
    readonly content: string;
    readonly type: QuestionType;
}
