import { quizController } from "@/contexts/quiz-mode/config/quiz-setup";
import { QuizDescription } from "@/contexts/quiz-mode/entities/quiz";
import { isOk } from "@/shared/entities/result";
import { AsyncState } from "@/shared/infra/types/AsyncState";
import { useEffect, useState } from "react";

export type QuizListState = AsyncState<QuizDescription[]>;

export function useQuizzesList(projectId: string) {
    const [quizListState, setQuizListState] = useState<QuizListState>({ status: 'loading', loading: true });

    useEffect(() => {
        let ignore = false;

        const fetchQuizzes = async () => {
            setQuizListState({ status: 'loading', loading: true });
            const result = await quizController.getQuizzesForProject(projectId);
            if (!ignore) {
                if (isOk(result)) {
                    setQuizListState({
                        status: 'success',
                        data: result.value
                    });
                } else {
                    setQuizListState({
                        status: 'error',
                        error: result.error
                    });
                }
            }
        };

        void fetchQuizzes();
        return () => { ignore = true; };
    }, [projectId]);

    return {
        quizListState
    }
}