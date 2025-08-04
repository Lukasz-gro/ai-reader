import { QuizList } from "./QuizList";

export interface QuizListViewProps {
    readonly projectId: string;
    readonly startTakingQuiz: () => void;
    readonly startCreatingQuiz: () => void;
}

export function QuizListView({ projectId }: QuizListViewProps) {
    return <>
        <button>Create new quiz</button>
        <QuizList projectId={projectId} />
    </>
}
