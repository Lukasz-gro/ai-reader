import { Material } from "./material";

export interface Project {
    id: string;
    title: string;
    materials: Material[];
}
