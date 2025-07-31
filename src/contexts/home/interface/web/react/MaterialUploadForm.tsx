import React, { useState } from 'react';
import { MaterialPreview } from '@/shared/entities/material';

export const MaterialUploadForm: React.FC<{ acceptedTypes: string[], handleUpload: (formData: FormData) => Promise<MaterialPreview | null>}> = ({ acceptedTypes, handleUpload }) => {
    const [pending, setPending] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setPending(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        await handleUpload(formData);
        setPending(false);
    }

    return (
        <div className={'max-w-[800px] w-full self-center'}>
            <form
                onSubmit={onSubmit}
                className='mt-4'
            >
                <label
                    htmlFor='file-upload'
                    className='group border-1 border-a-50 rounded-sm p-6 flex items-center justify-center text-center text-sd-10 cursor-pointer select-none hover:bg-a-70/10 transition-colors duration-150 min-h-[100px]'
                >
                    {pending ?
                        <em>Uploading...</em> :
                        <h3 className={'text-a-50 group-hover:text-a-10 transition-colors'}>Drop new material</h3>
                    }
                    <input
                        id='file-upload'
                        name='file'
                        type='file'
                        className='hidden'
                        accept={acceptedTypes.join(', ')}
                        required
                        disabled={pending}
                        onChange={e => { e.currentTarget.form?.requestSubmit(); }}
                    />
                </label>
            </form>
        </div>
    );
};
