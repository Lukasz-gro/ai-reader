import { Bytes } from 'openai/internal/decoders/line';

export interface UploadsBackend {
    // TODO
    upload(data: Bytes): Promise<void>;
}
