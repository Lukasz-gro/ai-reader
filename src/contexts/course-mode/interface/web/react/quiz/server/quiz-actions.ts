import { Quiz } from '@/contexts/course-mode/entities/quiz';
import { Project } from '@/shared/entities/project';
import { OpenEndedQuestion } from '@/contexts/course-mode/entities/open-ended-question';
import { MultipleChoiceQuestion } from '@/contexts/course-mode/entities/multiple-choice-question';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createNewQuiz(project: Project): Promise<Quiz> {
    const openEndedQuestion = new OpenEndedQuestion(
        'Explain the concept of clean architecture and its main principles.'
    );

    const multipleChoiceQuestion = new MultipleChoiceQuestion(
        uuidv4(),
        'Which of the following is NOT a principle of clean architecture?',
        [
            { id: 'a', label: 'Dependency Rule' },
            { id: 'b', label: 'Single Responsibility Principle' },
            { id: 'c', label: 'Tight Coupling' },
            { id: 'd', label: 'Interface Segregation' }
        ],
        'c'
    );

    return {
        id: uuidv4(),
        name: 'Clean Architecture Quiz',
        questions: [openEndedQuestion, multipleChoiceQuestion]
    };
}
