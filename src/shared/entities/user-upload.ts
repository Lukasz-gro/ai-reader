export interface UploadMetadata {
    projectId: string;
    title: string;
    mimeType: string;
}

export interface UploadPayload extends UploadMetadata {
    file: File;
}
