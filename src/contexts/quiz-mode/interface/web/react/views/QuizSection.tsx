import { useProjects } from "@/shared/interface/web/react/project/hooks/useProjects"
import NoActiveProject from "../quiz-section/NoActiveProject"
import { useCallback, useState } from "react";
import { QuizStates } from "../state/quiz-states";
import { QuizListView } from "./QuizListView";
import { QuizCreationForm } from "./QuizCreationForm";

export type UpdateQuizStateFn = () => void;

export function QuizSection() {
    const [quizState, setQuizState] = useState<QuizStates>("VIEWING");
    const project = useProjects();
    
    const startCreatingQuiz = useCallback(() => {
        setQuizState("CREATING");
    }, [setQuizState]);

    const startTakingQuiz = useCallback(() => {
        setQuizState("TAKING");
    }, [setQuizState]);

    if (project.status !== 'success' || !project.currentId) {
        return <NoActiveProject project={project} />;
    }
    
    const projectId = project.currentId;

    if (quizState === 'VIEWING') {
        return <QuizListView projectId={projectId} startCreatingQuiz={startCreatingQuiz} startTakingQuiz={startTakingQuiz}/>
    }

    if (quizState === 'CREATING') { 
        return <QuizCreationForm projectId={projectId} />
    }

    if (quizState === 'TAKING') {
        return <>TODO section with taking quiz</>
    }
}
