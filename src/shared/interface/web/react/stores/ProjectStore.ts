import { Project } from '@/shared/entities/project';
import { ProjectRepo, ProjectStoreState } from '@/shared/application/ports/out/project-repo';

export type { ProjectStoreState } from '@/shared/application/ports/out/project-repo';

export class ProjectStore implements ProjectRepo {
  private state: ProjectStoreState = {
    projects: [],
    selectedProject: null,
    isLoading: false,
    error: null
  };

  readonly private listeners = new Set<() => void>();

  // Subscribe to changes (required by useSyncExternalStore)
  subscribe = (callback: () => void) => {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  };

  // Get current snapshot (required by useSyncExternalStore)
  getSnapshot = (): ProjectStoreState => {
    return this.state;
  };

  // Server-side rendering snapshot (optional but recommended)
  getServerSnapshot = (): ProjectStoreState => {
    return this.state;
  };

  // State management methods
  setLoading = (isLoading: boolean) => {
    this.updateState({ isLoading });
  };

  setError = (error: string | null) => {
    this.updateState({ error });
  };

  setProjects = (projects: Project[]) => {
    this.updateState({ projects, error: null });
  };

  setSelectedProject = (project: Project | null) => {
    this.updateState({ selectedProject: project });
  };

  // Project CRUD operations
  addProject = (project: Project) => {
    const projects = [...this.state.projects, project];
    this.updateState({ projects });
  };

  updateProject = (updatedProject: Project) => {
    const projects = this.state.projects.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    );
    this.updateState({ projects });
    
    // Update selected project if it's the one being updated
    if (this.state.selectedProject?.id === updatedProject.id) {
      this.updateState({ selectedProject: updatedProject });
    }
  };

  removeProject = (projectId: string) => {
    const projects = this.state.projects.filter(p => p.id !== projectId);
    this.updateState({ projects });
    
    // Clear selected project if it's the one being removed
    if (this.state.selectedProject?.id === projectId) {
      this.updateState({ selectedProject: null });
    }
  };

  // Query methods
  getSelectedProject = (): Project | null => {
    return this.state.selectedProject;
  };

  getProjects = (): Project[] => {
    return this.state.projects;
  };

  getProject = (projectId: string): Project | null => {
    return this.state.projects.find(p => p.id === projectId) || null;
  };

  // State queries
  isProjectSelected = (): boolean => {
    return this.state.selectedProject !== null;
  };

  hasProjects = (): boolean => {
    return this.state.projects.length > 0;
  };

  getProjectCount = (): number => {
    return this.state.projects.length;
  };

  // Private helper to update state and notify listeners
  private updateState = (partialState: Partial<ProjectStoreState>) => {
    this.state = { ...this.state, ...partialState };
    this.notify();
  };

  private notify = () => {
    this.listeners.forEach(callback => callback());
  };
}

// Singleton instance
export const projectStore = new ProjectStore(); 