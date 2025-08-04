import { useProjects } from "@/shared/interface/web/react/project/hooks/useProjects"
import NoActiveProject from "../quiz-section/NoActiveProject"
import { useEffect } from "react";
import { QuizListView } from "./QuizListView";
import { QuizCreationForm } from "./QuizCreationForm";
import { useQuizManagement } from "../state/useQuizManagement";

export function QuizSection() {
    const project = useProjects();
    const { state, actions } = useQuizManagement();
    
    useEffect(() => {
        if (project.status === 'success' && project.currentId) {
            actions.fetchQuizzes(project.currentId);
        }
    }, [project, actions]);

    if (project.status !== 'success' || !project.currentId) {
        return <NoActiveProject project={project} />;
    }
    
    const projectId = project.currentId;

    if (state.currentView === 'list') {
        return <QuizListView 
            projectId={projectId} 
            startCreatingQuiz={() => actions.setView('creation')} 
            startTakingQuiz={() => actions.setView('starting')}
        />
    }

    if (state.currentView === 'creation') { 
        return <QuizCreationForm 
            projectId={projectId} 
        />
    }

    if (state.currentView === 'creating') {
        return <div>Creating quiz...</div>
    }

    if (state.currentView === 'starting') {
        return <>TODO section with taking quiz</>
    }

    return null;
}
