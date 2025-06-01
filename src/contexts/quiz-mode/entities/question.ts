export type ValidationResult = { ok: true } | { ok: false; feedback?: string };

export interface Answer {
  value: unknown;
};

export type QuestionType = 'multiple_choice' | 'open_ended';

export interface QuestionServices {
    validate(question: Question, userAnswer: Answer, context?: string): Promise<ValidationResult>;
}

export interface Question {
    readonly id: string;
    readonly content: string;
    readonly type: QuestionType;
}
