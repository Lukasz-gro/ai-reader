import { useProjects } from "@/shared/interface/web/react/project/hooks/useProjects"
import NoActiveProject from "./NoActiveProject"

function QuizSection() {
    const project = useProjects();
    
    if (project.status !== 'success' || !project.currentId) {
        return <NoActiveProject project={project} />;
    }
    
    const projectId = project.currentId;

    return <div>I'm the quiz section</div>
}

export { QuizSection };
