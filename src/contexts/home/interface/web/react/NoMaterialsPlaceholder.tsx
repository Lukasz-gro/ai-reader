import React from 'react';

export const NoMaterialsPlaceholder: React.FC = () => {
    return (
        <div>
            <h1 className={'text-p-70 text-center mt-[33vh]'}>
                No materials yet
            </h1>
            <p className={'text-p-70 text-center'}>
                Upload some learning resources using the button below.
            </p>
        </div>
    );
};
