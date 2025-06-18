import { ProjectPane } from '@/shared/interface/web/react/project/ui-components/ProjectPane';
import React from 'react';

export const HomeView: React.FC = () => {
    return (
        <div className='flex w-full h-screen bg-p-90 text-p-10'>
            <ProjectPane />
            <main className='flex-1 flex flex-col'>
                <div className='flex-1 flex items-center justify-center'>
                    <div className='text-center'>
                        <h1 className='text-2xl font-bold mb-4'>Welcome to AI Reader</h1>
                        <p className='text-p-50'>Select a project from the left panel to get started</p>
                    </div>
                </div>
            </main>
        </div>
    );
};
