import { ProjectPane } from '@/shared/interface/web/react/project/ui-components/ProjectPane';
import React from 'react';
import { NoProjectPlaceholder } from '@/contexts/home/interface/web/react/NoProjectPlaceholder';
import { useActiveUserId } from '@/shared/interface/web/react/project/hooks/useActiveUserId';
import { useActiveProjectId } from '@/shared/interface/web/react/project/hooks/useActiveProjectId';
import { NoUserPlaceholder } from '@/contexts/home/interface/web/react/NoUserPlaceholder';
import { MaterialsList } from '@/contexts/home/interface/web/react/MaterialsList';

export const HomeView: React.FC = () => {
    const activeUserId = useActiveUserId();
    const activeProjectId = useActiveProjectId();

    return (
        <div className='flex flex-1 overflow-hidden'>
            <ProjectPane />
            <main className='flex flex-col flex-1 overflow-hidden'>
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
        <div className={'flex flex-col flex-1 m-8 overflow-hidden min-h-0'}>
            <MaterialsList />
        </div>
    );
};
