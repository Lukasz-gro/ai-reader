import { useContext } from 'react';
import { DispatchCtx } from '../context/ProjectContext';

export function useProjectDispatch() {
    const dispatch = useContext(DispatchCtx);
    if (!dispatch) {
        throw new Error('useProjectDispatch must be used inside <ProjectProvider>');
    }
    return dispatch;
}
