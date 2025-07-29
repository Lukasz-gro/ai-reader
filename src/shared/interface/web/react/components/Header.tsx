import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppNavigation } from '../hooks/useNavigation';
import { Tooltip } from '../Tooltip';
import { BoltIcon, LogOutIcon } from 'lucide-react';
import { useProjects } from '../project/hooks/useProjects';
import { useAuth } from '../auth/hooks/useAuth';
import { useAuthActions } from '../auth/hooks/useAuthActions';
import { useActiveProjectId } from '@/shared/interface/web/react/project/hooks/useActiveProjectId';

export const Header: React.FC<{ className: string }> = ({ className }) => {
    const location = useLocation();
    const { goToHome, goToChat, goToQuiz, goToLogin, goToRegister } = useAppNavigation();
    const projectState = useProjects();
    const authState = useAuth();
    const { logout } = useAuthActions();
    
    const projects = projectState.status === 'success' ? projectState.projects : [];
    const currentProjectId = useActiveProjectId();

    const navigateToChat = () => {
        goToChat();
    };
    
    const navigateToQuiz = () => {
        goToQuiz();
    };
    
    const isActivePath = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };
    
    return (
        <div className={className}>
            <header className='w-full min-w-0'>
                <div className={'flex justify-between items-center border-b border-p-80'}>
                    <div className='flex items-center'>
                        <div className='px-6 py-3'>
                            <h1 className='text-xl font-semibold'>AI Reader</h1>
                        </div>

                        <nav className='flex'>
                            <NavigationButton
                                label='Home'
                                onClick={goToHome}
                                isActive={isActivePath('/')}
                            />
                            <NavigationButton
                                label='Chat'
                                onClick={navigateToChat}
                                isActive={isActivePath('/chat')}
                                disabled={currentProjectId === null}
                            />
                            <NavigationButton
                                label='Quiz'
                                onClick={navigateToQuiz}
                                isActive={isActivePath('/quiz')}
                                disabled={currentProjectId === null}
                            />
                        </nav>
                    </div>

                    <div className={'flex gap-4 mr-8 items-center'}>
                        {authState.status === 'success' && authState.data.user ? (
                            <>
                            <span className='text-p-50 text-sm'>
                                {authState.data.user.email}
                            </span>
                                <Tooltip tooltip={'Logout'}>
                                    <button onClick={logout}>
                                        <LogOutIcon className={'w-6 h-6 stroke-p-50 hover:stroke-p-10 transition-colors duration-200 cursor-pointer'} />
                                    </button>
                                </Tooltip>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={goToLogin}
                                    className='text-p-50 hover:text-p-10 transition-colors duration-200 cursor-pointer text-sm'
                                >
                                    Login
                                </button>
                                <button
                                    onClick={goToRegister}
                                    className='text-p-50 hover:text-p-10 transition-colors duration-200 cursor-pointer text-sm'
                                >
                                    Register
                                </button>
                            </>
                        )}
                        <Tooltip tooltip={'Settings'}>
                            <button>
                                <BoltIcon className={'w-6 h-6 stroke-p-50 hover:stroke-p-10 transition-all duration-200 cursor-pointer hover:rotate-45'} />
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </header>
        </div>
    );
};

interface NavigationButtonProps {
    label: string;
    onClick: () => void;
    isActive: boolean;
    disabled?: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ 
    label, 
    onClick, 
    isActive, 
    disabled = false 
}) => {
    if (disabled) {
        return (
            <Tooltip tooltip={`${label} (requires project)`}>
                <div className='transition-colors duration-200 focus:outline-none cursor-not-allowed border-y-4 border-transparent opacity-50'>
                    <h3 className={'p-[12px] px-8 tracking-wider text-nowrap uppercase text-p-50'}>{label}</h3>
                </div>
            </Tooltip>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`transition-colors duration-200 focus:outline-none hover:bg-p-80 cursor-pointer border-y-4 border-t-transparent
            ${ isActive ? 'border-b-a-50' : 'border-transparent' }`}
        >
            <h3 className={'p-[12px] px-8 tracking-wider text-nowrap uppercase'}>{label}</h3>
        </button>
    );
};

const getCurrentProjectIdFromPath = (pathname: string): string | undefined => {
    const segments = pathname.split('/');
    if (segments.length >= 3 && (segments[1] === 'chat' || segments[1] === 'quiz')) {
        return segments[2];
    }
    return undefined;
}; 
