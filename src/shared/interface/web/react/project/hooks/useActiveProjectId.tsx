import { useContext, useEffect } from 'react';
import { StateCtx } from '../context/ProjectContext';
import { useAppNavigation } from '@/shared/interface/web/react/hooks/useNavigation';

export function useActiveProjectId(): string | null {
    const state = useContext(StateCtx);
    if (!state) throw new Error('useActiveProjectId must be used inside <ProjectProvider>');
    return state.status === 'success' ? state.currentId : null;
}

export function useRequireProjectId(
    projectId: string | null
): asserts projectId is string {
    const { goToHome } = useAppNavigation();

    useEffect(() => {
        if (projectId == null) {
            goToHome();
        }
    }, [projectId, goToHome]);
}
