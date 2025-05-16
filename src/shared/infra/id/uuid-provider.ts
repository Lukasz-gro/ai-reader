import { v4 as uuidv4 } from 'uuid';
import { IdProvider } from '../../application/ports/out/id-provider';

export class UuidProvider implements IdProvider {
    getId(): string {
        return uuidv4();
    }
}
