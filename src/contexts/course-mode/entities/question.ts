export type QuestionId = string;
export type ValidationResult = { ok: true } | { ok: false; feedback?: string };

export interface Answer {
  value: unknown;
};

export type QuestionType = 'multiple_choice' | 'open_ended';

export interface QuestionServices {
    evaluateNaturalLanguage?(context: string, textToEvaluate: string): Promise<ValidationResult>;
}

export interface Question {
    readonly id: QuestionId;
    readonly content: string;
    readonly type: QuestionType;
    validate(answer: Answer, services: QuestionServices): Promise<ValidationResult>;
}

