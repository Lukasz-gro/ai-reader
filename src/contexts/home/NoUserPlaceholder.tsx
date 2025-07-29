import React from 'react';

export const NoUserPlaceholder: React.FC = () => {
    return (
        <div>
            <h1 className={'text-p-70 text-center'}>
                Login required.
            </h1>
            <p className={'text-p-70 text-center'}>
                Please use &quot;Login&quot; to login.
            </p>
        </div>
    );
};
