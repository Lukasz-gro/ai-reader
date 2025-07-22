import { ProjectPane } from '@/shared/interface/web/react/project/ui-components/ProjectPane';
import React from 'react';
import { NoProjectPlaceholder } from '@/contexts/home/NoProjectPlaceholder';

export const HomeView: React.FC = () => {
    return (
        <div className='flex w-full h-screen bg-p-90 text-p-10'>
            <ProjectPane />
            <main className='flex flex-1 justify-center pt-[33vh]'>
                <NoProjectPlaceholder />
            </main>
        </div>
    );
};
