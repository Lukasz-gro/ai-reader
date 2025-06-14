import { Project } from '@/shared/entities/project';
import { Material } from '@/shared/entities/material';

export enum DomainEventType {
    PROJECT_CREATED = 'PROJECT_CREATED',
    MATERIAL_UPLOADED = 'MATERIAL_UPLOADED',
}

export type ProjectCreatedEvent = {
    type: DomainEventType.PROJECT_CREATED;
    payload: { userId: string; project: Project };
};

export type MaterialUploadedEvent = {
    type: DomainEventType.MATERIAL_UPLOADED;
    payload: { userId: string; material: Material };
};

export type DomainEvent = ProjectCreatedEvent | MaterialUploadedEvent;
