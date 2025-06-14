import { DomainEvent } from '@/shared/entities/domain-event';

export interface OutboxProvider {
    enqueueWorkItem(event: DomainEvent): Promise<void>;
    registerWorker(): void;
}
