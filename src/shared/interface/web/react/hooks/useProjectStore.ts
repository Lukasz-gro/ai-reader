import { useSyncExternalStore } from 'react';
import { projectStore, type ProjectStoreState } from '../stores/ProjectStore';
import { Project } from '@/shared/entities/project';

export interface UseProjectStoreReturn {
  // State
  projects: Project[];
  selectedProject: Project | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setProjects: (projects: Project[]) => void;
  setSelectedProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  removeProject: (projectId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProjectStore = (): UseProjectStoreReturn => {
  const state = useSyncExternalStore(
    projectStore.subscribe,
    projectStore.getSnapshot,
    projectStore.getServerSnapshot
  );

  return {
    projects: state.projects,
    selectedProject: state.selectedProject,
    isLoading: state.isLoading,
    error: state.error,
    
    setProjects: projectStore.setProjects,
    setSelectedProject: projectStore.setSelectedProject,
    addProject: projectStore.addProject,
    updateProject: projectStore.updateProject,
    removeProject: projectStore.removeProject,
    setLoading: projectStore.setLoading,
    setError: projectStore.setError,
  };
};

export const useSelectedProject = (): Project | null => {
  const state = useSyncExternalStore(
    projectStore.subscribe,
    projectStore.getSnapshot,
    projectStore.getServerSnapshot
  );
  return state.selectedProject;
};

export const useProjects = (): Project[] => {
  const state = useSyncExternalStore(
    projectStore.subscribe,
    projectStore.getSnapshot,
    projectStore.getServerSnapshot
  );
  return state.projects;
};

export const useProjectsLoading = (): boolean => {
  const state = useSyncExternalStore(
    projectStore.subscribe,
    projectStore.getSnapshot,
    projectStore.getServerSnapshot
  );
  return state.isLoading;
};
