import { Quiz } from '../../entities/quiz';
import { QuizQuestion } from '../../entities/quiz-question';
import { MultipleChoiceQuestion } from '../../entities/multiple-choice-question';
import { OpenEndedQuestion } from '../../entities/open-ended-question';

export interface SerializedChoice {
    id: string;
    label: string;
}

export interface SerializedMultipleChoiceQuestion {
    id: string;
    type: 'multiple_choice';
    content: string;
    choices: SerializedChoice[];
    correctChoiceId: string;
}

export interface SerializedOpenEndedQuestion {
    id: string;
    type: 'open_ended';
    content: string;
}

export type SerializedQuestion = SerializedMultipleChoiceQuestion | SerializedOpenEndedQuestion;

export interface SerializedQuiz {
    id: string;
    name: string;
    questions: SerializedQuestion[];
}

export class QuizSerializer {
    static toJSON(quiz: Quiz): SerializedQuiz {
        return {
            id: quiz.id,
            name: quiz.name,
            questions: quiz.questions.map(q => this.serializeQuestion(q))
        };
    }

    private static serializeQuestion(question: QuizQuestion): SerializedQuestion {
        if (question instanceof MultipleChoiceQuestion) {
            return {
                id: question.id,
                type: 'multiple_choice',
                content: question.content,
                choices: question.choices.map(c => ({
                    id: c.id,
                    label: c.label
                })),
                correctChoiceId: question.correctChoiceId
            };
        } else if (question instanceof OpenEndedQuestion) {
            return {
                id: question.id,
                type: 'open_ended',
                content: question.content
            };
        }
        throw new Error('Unknown question type');
    }
} 