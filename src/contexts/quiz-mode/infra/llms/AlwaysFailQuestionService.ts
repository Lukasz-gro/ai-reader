import { Answer, Question, QuestionServices, ValidationResult } from '../../entities/question';

export class AlwaysFailQuestionService implements QuestionServices {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    async validate(question: Question, userAnswer: Answer, context?: string): Promise<ValidationResult> {
        return {
            ok: false,
            feedback: 'You will never pass this validation'
        };
    }
    
}
