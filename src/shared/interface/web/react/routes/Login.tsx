import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthActions } from '@/shared/interface/web/react/auth/hooks/useAuthActions';
import { useAuth } from '@/shared/interface/web/react/auth/hooks/useAuth';
import { PrimaryButton } from '@/contexts/course-mode/interface/web/react/components/primary-button';
import { buildRoute } from './routePaths';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuthActions();
    const authState = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password);
    };

    React.useEffect(() => {
        if (authState.status === 'success' && authState.data.user) {
            navigate(buildRoute.home());
        }
    }, [authState, navigate]);

    return (
        <div className='min-h-screen flex items-center justify-center bg-p-90'>
            <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg'>
                <div>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                        Sign in to your account
                    </h2>
                </div>
                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                                Email address
                            </label>
                            <input
                                id='email'
                                name='email'
                                type='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sd-50 focus:border-sd-50'
                                placeholder='Enter your email'
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                                Password
                            </label>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sd-50 focus:border-sd-50'
                                placeholder='Enter your password'
                            />
                        </div>
                    </div>

                    {authState.status === 'error' && (
                        <div className='text-red-600 text-sm text-center'>
                            {authState.error}
                        </div>
                    )}

                    <div>
                        <PrimaryButton
                            type='submit'
                            disabled={authState.status === 'loading'}
                            className='w-full flex justify-center'
                        >
                            {authState.status === 'loading' ? 'Signing in...' : 'Sign in'}
                        </PrimaryButton>
                    </div>

                    <div className='text-center'>
                        <span className='text-sm text-gray-600'>
                            Don't have an account?{' '}
                            <Link 
                                to={buildRoute.register()} 
                                className='font-medium text-sd-50 hover:text-sd-40'
                            >
                                Sign up
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}; 
