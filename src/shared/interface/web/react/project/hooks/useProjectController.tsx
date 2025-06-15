import { useContext } from "react";
import { ControllerCtx } from "../context/ProjectContext";
import { ProjectController } from "@/shared/interface/controllers/project-controller";

export function useProjectController(): { projectController: ProjectController } {
    const projectController = useContext(ControllerCtx);
    if (!projectController) {
      throw new Error('useProjectController must be used inside <ProjectProvider>');
    }
    return { projectController };
}
