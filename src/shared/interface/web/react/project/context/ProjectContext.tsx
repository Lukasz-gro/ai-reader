import React, { createContext, Dispatch, ReactNode, useEffect, useReducer } from 'react';
import { ProjectState } from '../state/project-state';
import { Action } from '../state/project-actions';
import { projectStateReducer } from '../state/project-reducer';
import { projectController, ProjectController } from '@/shared/interface/controllers/project-controller';

export const StateCtx = createContext<ProjectState | null>(null);
export const DispatchCtx = createContext<Dispatch<Action> | null>(null);
export const ControllerCtx = createContext<ProjectController | null>(null);

export function ProjectProvider({ children, controller = projectController }: { readonly children: ReactNode, readonly controller?: ProjectController }) {
    const [state, dispatch] = useReducer(projectStateReducer, {
        status: 'success',
        projects: [],
        currentId: null
    });

    useEffect(() => {
        let ignore = false;
        const load = async () => {
            dispatch({ type: 'FETCH_START' });
            try {
                const projects = await controller.getAllProjects();
                if (!ignore) dispatch({ type: 'FETCH_SUCCESS', payload: projects });
            } catch (e) {
                if (!ignore)
                    dispatch({
                        type: 'FETCH_ERROR',
                        payload: (e as Error).message ?? 'Unknown error',
                    });
            }
        };
        void load();
        return () => {
            ignore = true;
        };
    }, [controller]);

    return (
        <ControllerCtx.Provider value={controller}>
            <DispatchCtx.Provider value={dispatch}>
                <StateCtx.Provider value={state}>{children}</StateCtx.Provider>
            </DispatchCtx.Provider>
        </ControllerCtx.Provider>
    );
}
