import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthActions } from '@/shared/interface/web/react/auth/hooks/useAuthActions';
import { useAuth } from '@/shared/interface/web/react/auth/hooks/useAuth';
import { PrimaryButton } from '@/contexts/course-mode/interface/web/react/components/primary-button';
import { buildRoute } from './routePaths';

export const Register: React.FC = () => {
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
        if (authState.status === 'success' && authState.data.source === 'register') {
            navigate(buildRoute.login());
        }
    }, [authState, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-p-90">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sd-50 focus:border-sd-50"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sd-50 focus:border-sd-50"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sd-50 focus:border-sd-50"
                                placeholder="Confirm your password"
                            />
                        </div>
                    </div>

                    {(validationError || authState.status === 'error') && (
                        <div className="text-red-600 text-sm text-center">
                            {validationError || (authState.status === 'error' ? authState.error : '')}
                        </div>
                    )}

                    <div>
                        <PrimaryButton
                            type="submit"
                            disabled={authState.status === 'loading'}
                            className="w-full flex justify-center"
                        >
                            {authState.status === 'loading' ? 'Creating account...' : 'Create account'}
                        </PrimaryButton>
                    </div>

                    <div className="text-center">
                        <span className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link 
                                to={buildRoute.login()} 
                                className="font-medium text-sd-50 hover:text-sd-40"
                            >
                                Sign in
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}; 