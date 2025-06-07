import { Answer, Question, QuestionServices, QuestionValidationResult } from '../../entities/question';

export class AlwaysFailQuestionService implements QuestionServices {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    async validate(question: Question, userAnswer: Answer, context?: string): Promise<QuestionValidationResult> {
        return {
            ok: false,
            feedback: 'You will never pass this validation'
        };
    }
}
