import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from '@/shared/interface/web/react/routes';
import { ProjectProvider } from './shared/interface/web/react/project/context/ProjectContext';
import { Layout } from './shared/interface/web/react/components/Layout';

function App() {
    const routing = useRoutes(routes);

    return (
        <ProjectProvider>
            <Layout>
                {routing}
            </Layout>
        </ProjectProvider>
    );
}

export { App };
