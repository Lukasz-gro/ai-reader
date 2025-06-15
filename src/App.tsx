import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from '@/shared/interface/web/react/routes';
import { ProjectProvider } from './shared/interface/web/react/project/context/ProjectContext';

function App() {
    const routing = useRoutes(routes);

    return (
        <ProjectProvider>
            <main>
                {routing}
            </main>
        </ProjectProvider>
    );
}

export { App };
