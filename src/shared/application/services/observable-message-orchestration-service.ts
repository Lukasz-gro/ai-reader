import { ProjectRepo } from '@/contexts/course-mode/application/ports/out/project-repo';
import { MaterialRepo } from '@/shared/application/ports/out/material-repo';
import { VectorRepo } from '@/shared/ports/out/vector-repo';
import {
    DomainEvent,
    DomainEventType,
    MaterialUploadedEvent,
    ProjectCreatedEvent
} from '@/shared/entities/domain-event';
import { projectToUi, UiProject } from '@/shared/entities/project';
import { OutboxProvider } from '../ports/out/oubox-provider';
import { CacheProvider } from '@/shared/application/ports/out/cache-provider';
import { UiMaterial } from '@/shared/entities/material';

export interface AppState {
    userId: string;
    projects: UiProject[];
    materials: UiMaterial[];
}

export type OMOSListener = () => void;

export class ObservableMessageOrchestrationService {
    private listeners = new Set<OMOSListener>();
    private handlers: Map<DomainEventType, (event: DomainEvent, state: AppState) => Promise<void>>;

    constructor(
        private projectRepo: ProjectRepo,
        private materialRepo: MaterialRepo,
        private vectorRepo: VectorRepo,
        // stores warm state for currently active users
        private cachedStateProvider: CacheProvider<AppState>,
        // enqueue tasks for workers
        private outbox: OutboxProvider,
    ) {
        this.handlers = new Map([
            [DomainEventType.PROJECT_CREATED, this.handleProjectCreated],
            [DomainEventType.MATERIAL_UPLOADED, this.handleMaterialUploaded],
        ]);
    }

    async pushEvent(event: DomainEvent) {
        // update cached state quickly, push heavy tasks to outbox
        const state = await this.getCachedUserState(event.payload.userId);

        const handler = this.handlers.get(event.type);
        if (handler) {
            await handler(event, state);
        } else {
            throw new Error(`No handler registered for event type: ${event.type}`);
        }

        await this.cachedStateProvider.push(state);
        await this.outbox.enqueueWorkItem(event);
        this.emit();
    }

    subscribe = (listener: OMOSListener) => {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    };

    emit() {
        for (const l of this.listeners) l();
    }

    private async getCachedUserState(userId: string) {
        return await this.cachedStateProvider.get(userId)
            ?? { userId, projects: [], materials: [] };
    }

    private handleProjectCreated = async (event: DomainEvent, state: AppState)=> {
        const project = (event as ProjectCreatedEvent).payload.project;
        state.projects.push(projectToUi(project));
    }

    private handleMaterialUploaded = async (event: DomainEvent, state: AppState) => {
        const material = (event as MaterialUploadedEvent).payload.material;
        state.materials.push(material);
    }
}
