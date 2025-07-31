import React, { useEffect, useState } from 'react';
import { useActiveProjectId, useRequireProjectId } from '@/shared/interface/web/react/project/hooks/useActiveProjectId';
import { ContentType, MaterialPreview } from '@/shared/entities/material';
import { uploadsController } from '@/shared/interface/controllers/uploads-controller';
import { NoMaterialsPlaceholder } from '@/contexts/home/interface/web/react/NoMaterialsPlaceholder';
import { BookIcon, FileTypeIcon, NotebookTextIcon, TextIcon } from 'lucide-react';
import { MaterialUploadForm } from '@/contexts/home/interface/web/react/MaterialUploadForm';

export const MaterialsList: React.FC = () => {
    const projectId = useActiveProjectId();
    useRequireProjectId(projectId);

    const [materials, setMaterials] = useState<MaterialPreview[]>([]);
    const [acceptedTypes, setAcceptedTypes] = useState<string[]>(['application/pdf']);

    const onUpload = async (projectId: string, formData: FormData): Promise<MaterialPreview | null> => {
        const result = await uploadsController.handleTriggerUpload(projectId, formData);
        if (result.ok) {
            const newMaterial = result.value;
            setMaterials(prev => [newMaterial, ...prev]);
            return newMaterial;
        }
        return null;
        // TODO error toast
    };

    useEffect(() => {
        const fetchData = async () => {
            uploadsController.listProjectMaterials(projectId)
                .then(res => setMaterials(res));

            uploadsController.listValidUploadFiletypes()
                .then(res => setAcceptedTypes(res));
        };
        void fetchData();
    }, [projectId]);

    return (
        <div className={'flex flex-col flex-1 min-h-0'}>
            { materials.length === 0 && <NoMaterialsPlaceholder /> }
            <div className={'flex flex-1 overflow-y-auto min-h-0'}>
                <div className={'flex flex-wrap items-start content-start gap-4 justify-center'}>
                    {materials.map((mp) => (
                        <MaterialCard key={mp.id} mp={mp} />
                    ))}
                </div>
            </div>
            <MaterialUploadForm acceptedTypes={acceptedTypes} handleUpload={(formData: FormData) => onUpload(projectId, formData) } />
        </div>
    );
};

const MaterialCard: React.FC<{ mp: MaterialPreview }> = ({ mp }) => (
    <div className='p-8 rounded-sm bg-p-70 border-b-4 border-r-2 border-p-80 shadow-md shadow-black/20 w-[360px] paper-texture'>
        <div className='text-sd-10 relative z-10'>
            <div className={'flex flex-row items-start gap-2 mb-8'}>
                <BookIcon className={'w-6 h-6 mt-[4px]'} />
                <p className='text-xl leading-none'>{mp.title}</p>
            </div>
            <div className={'flex flex-row gap-8'}>
                <FileTypeMeta fileType={mp.type} />
                { typeof mp.metadata.pages === 'number' && <PageCountMeta pages={mp.metadata.pages} /> }
                { typeof mp.metadata.lines === 'number' && <LineCountMeta lines={mp.metadata.lines} /> }
            </div>
        </div>
    </div>
);

const FileTypeMeta: React.FC<{ fileType: ContentType }> = ({ fileType }) => {
    return (
        <div className={'flex flex-row items-start gap-1'}>
            <FileTypeIcon className={'w-5 h-5 mt-[4px] stroke-sd-30'} />
            <p className='leading-none text-sd-30'>{fileType}</p>
        </div>
    );
};

const PageCountMeta: React.FC<{ pages: number }> = ({ pages }) => {
    return (
        <div className={'flex flex-row items-start gap-1'}>
            <NotebookTextIcon className={'w-5 h-5 mt-[4px] stroke-sd-30'} />
            <p className='leading-none text-sd-30'>{pages} pages</p>
        </div>
    );
};

const LineCountMeta: React.FC<{ lines: number }> = ({ lines }) => {
    return (
        <div className={'flex flex-row items-start gap-1'}>
            <TextIcon className={'w-5 h-5 mt-[4px] stroke-sd-30'} />
            <p className='leading-none text-sd-30'>{lines} lines</p>
        </div>
    );
};
