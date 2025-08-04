import { useQuizzesList } from "../hooks/useQuizzesList";
import { QuizCard } from "./QuizCard";

export interface QuizListProps {
    readonly projectId: string;
}

export function QuizList({ projectId }: QuizListProps) {
    const { quizListState } = useQuizzesList(projectId);

    if (quizListState.status === 'loading') {
        return <div>Loading...</div>
    }

    if (quizListState.status === 'error') {
        return <div>Error fetching quiz list</div>
    }

    if (quizListState.status === 'success') {
        return <>{
            quizListState.data.map(quiz => {
                return <QuizCard key={quiz.id} quizDescription={quiz}/>
            })
        }
        </>
    }
}