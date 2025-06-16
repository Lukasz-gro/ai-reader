import { useContext } from 'react';
import { ProjectState } from '../state/project-state';
import { StateCtx } from '../context/ProjectContext';

export function useProjects(): ProjectState {
    const projectState = useContext(StateCtx);
    if (!projectState) {
        throw new Error('useProjects must be used inside <ProjectProvider>');
    }
    return projectState;
}
