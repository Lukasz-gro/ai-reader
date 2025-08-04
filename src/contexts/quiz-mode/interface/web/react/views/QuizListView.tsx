import { QuizList } from "./QuizList";
import { UpdateQuizStateFn } from "./QuizSection";

export interface QuizListViewProps {
    readonly projectId: string;
    readonly startTakingQuiz: UpdateQuizStateFn;
    readonly startCreatingQuiz: UpdateQuizStateFn;
}

export function QuizListView({ projectId }: QuizListViewProps) {
    return <>
        <button>Create new quiz</button>
        <QuizList projectId={projectId} />
    </>
}
