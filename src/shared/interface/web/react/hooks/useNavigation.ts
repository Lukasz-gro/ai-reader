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

    const goToLogin = () => navigate(buildRoute.login());
    
    const goToRegister = () => navigate(buildRoute.register());

    return { 
        goToHome, 
        goToChat, 
        goToQuiz,
        goToLogin,
        goToRegister
    };
}; 
