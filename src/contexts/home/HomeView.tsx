import { ProjectPane } from '@/shared/interface/web/react/project/ui-components/ProjectPane';
import React from 'react';
import { NoProjectPlaceholder } from '@/contexts/home/NoProjectPlaceholder';
import { useActiveUserId } from '@/shared/interface/web/react/project/hooks/useActiveUserId';
import { useActiveProjectId } from '@/shared/interface/web/react/project/hooks/useActiveProjectId';
import { NoUserPlaceholder } from '@/contexts/home/NoUserPlaceholder';

export const HomeView: React.FC = () => {
    const activeUserId = useActiveUserId();
    const activeProjectId = useActiveProjectId();

    return (
        <div className='flex w-full h-screen bg-p-90 text-p-10'>
            <ProjectPane />
            <main className='flex flex-1 justify-center pt-[33vh]'>
                { !activeUserId
                    ? <NoUserPlaceholder />
                    : !activeProjectId
                        ? <NoProjectPlaceholder />
                        : <WelcomeScreen />
                }
            </main>
        </div>
    );
};

export const WelcomeScreen: React.FC = () => {
    return (
        <div>
            <h1 className={'text-p-70 text-center'}>
                Home
            </h1>
            <p className={'text-p-70 text-center'}>
                display home stuff for this project
            </p>
        </div>
    );
};
