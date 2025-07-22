import React from 'react';

export const NoProjectPlaceholder: React.FC = () => {
    return (
        <div>
            <h1 className={'text-p-70 text-center'}>
                No project selected.
            </h1>
            <p className={'text-p-70 text-center'}>
                Select existing project or add a new one.
            </p>
        </div>
    );
};
