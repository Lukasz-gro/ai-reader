import { Project } from "@/shared/entities/project";

export type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Project[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SELECT'; payload: string }
  | { type: 'CREATE'; payload: Project }
