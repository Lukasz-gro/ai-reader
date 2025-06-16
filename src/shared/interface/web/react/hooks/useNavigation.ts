import { useNavigate } from 'react-router-dom';
import { buildRoute } from '../routes/routePaths';

export const useAppNavigation = () => {
    const navigate = useNavigate();

    const goToHome = () => navigate(buildRoute.home());
  
    const goToChat = (projectId?: string) => {
        navigate(buildRoute.chat(projectId));
    };
  
    const goToQuiz = (projectId?: string) => {
        navigate(buildRoute.quiz(projectId));
    };

    return { 
        goToHome, 
        goToChat, 
        goToQuiz
    };
}; 
