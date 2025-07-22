import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthActions } from '@/shared/interface/web/react/auth/hooks/useAuthActions';
import { useAuth } from '@/shared/interface/web/react/auth/hooks/useAuth';
import { PrimaryButton } from '@/shared/interface/web/react/components/primary-button';
import { buildRoute } from './routePaths';
import { AuthFormContainer, AuthFormInputField } from '@/shared/interface/web/react/components/AuthForm';

export const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationError, setValidationError] = useState('');
    const { register } = useAuthActions();
    const authState = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError('');

        if (password !== confirmPassword) {
            setValidationError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setValidationError('Password must be at least 6 characters long');
            return;
        }

        register(email, password);
    };

    React.useEffect(() => {
        setValidationError('');
        if (authState.status === 'success' && authState.data.source === 'register') {
            navigate(buildRoute.login());
        }
    }, [authState, navigate]);

    const submitLabel = authState.status === 'loading' ? 'Creating account...' : 'Create account';
    return (
        <AuthFormContainer title='Create your account'>
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
                    <AuthFormInputField
                        id='confirmPassword'
                        label='Confirm Password'
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='Confirm your password'
                    />
                </div>
                {(validationError || authState.status === 'error') && (
                    <div className='text-red-600 text-sm text-center'>{validationError || (authState.status === 'error' ? authState.error : '') }</div>
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
                            Already have an account?{' '}
                            <Link to={buildRoute.login()} className='text-a-50 font-semibold hover:underline'>
                                Sign in
                            </Link>
                        </span>
                    </div>
                </div>
            </form>
        </AuthFormContainer>
    );
};
