import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from '@/shared/interface/web/react/routes';
import { ProjectProvider } from './shared/interface/web/react/project/context/ProjectContext';
import { AuthProvider } from './shared/interface/web/react/auth/context/AuthContext';
import { Layout } from './shared/interface/web/react/components/Layout';
import { authController } from './shared/config/auth-setup';

function App() {
    const routing = useRoutes(routes);

    return (
        <AuthProvider controller={authController}>
            <ProjectProvider>
                <Layout>
                    {routing}
                </Layout>
            </ProjectProvider>
        </AuthProvider>
    );
}

export { App };
