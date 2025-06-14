import { StatefulController } from '@/shared/interface/controllers/stateful-controller';
import { UiProject } from '@/shared/entities/project';
import { ProjectRepo } from '@/contexts/course-mode/application/ports/out/project-repo';
import { MaterialRepo } from '@/shared/application/ports/out/material-repo';
import { VectorRepo } from '@/shared/ports/out/vector-repo';

export class StorageController extends StatefulController<AppState> {

}
