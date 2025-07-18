import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthActions } from '@/shared/interface/web/react/auth/hooks/useAuthActions';
import { useAuth } from '@/shared/interface/web/react/auth/hooks/useAuth';
import { PrimaryButton } from '@/contexts/course-mode/interface/web/react/components/primary-button';
import { buildRoute } from './routePaths';
import { AuthFormContainer, AuthFormInputField } from '@/shared/interface/web/react/components/AuthForm';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuthActions();
    const authState = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password);
    };

    useEffect(() => {
        if (authState.status === 'success' && authState.data?.user) {
            navigate(buildRoute.home());
        }
    }, [authState, navigate]);

    const submitLabel = authState.status === 'loading' ? 'Signing in...' : 'Sign in';

    return (
        <AuthFormContainer title='Sign in to your account'>
            <form className='space-y-8' onSubmit={handleSubmit}>
                <div className='space-y-6'>
                    <AuthFormInputField
                        id='email'
                        label='Email address'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email'
                    />
                    <AuthFormInputField
                        id='password'
                        label='Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password'
                    />
                </div>
                {authState.status === 'error' && (
                    <div className='text-red-600 text-sm text-center'>{authState.error}</div>
                )}
                <div className='pt-2'>
                    <PrimaryButton
                        type='submit'
                        disabled={authState.status === 'loading'}
                        className='w-full flex justify-center'
                    >
                        {submitLabel}
                    </PrimaryButton>
                    <div className='mt-2 text-center'>
                        <span className='text-sm text-p-80'>
                          Don&#39;t have an account?{' '}
                            <Link to={buildRoute.register()} className='text-a-50 font-semibold hover:underline'>
                            Sign up
                            </Link>
                        </span>
                    </div>
                </div>
            </form>
        </AuthFormContainer>
    );
};
