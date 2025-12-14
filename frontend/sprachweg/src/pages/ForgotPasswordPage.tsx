import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, KeyRound, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

type Step = 'email' | 'otp' | 'password';

const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const { sendOtp, verifyOtp, resetPassword } = useAuth();
    const [step, setStep] = useState<Step>('email');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Form Data
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await sendOtp(email, 'reset-password'); // Assuming purpose string
            setStep('otp');
            setSuccessMessage('OTP sent successfully to ' + email);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await verifyOtp(email, otp, 'reset-password');
            setStep('password');
            setSuccessMessage('OTP verified. Please set a new password.');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await resetPassword(email, newPassword);
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 'email':
                return (
                    <motion.div
                        key="email"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password?</h2>
                            <p className="text-gray-600 dark:text-gray-400">Enter your email to receive a verification code.</p>
                        </div>

                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="you@example.com"
                                icon={<Mail className="w-5 h-5" />}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button type="submit" className="w-full" size="lg" disabled={loading}>
                                {loading ? 'Sending...' : 'Send OTP'} <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                    </motion.div>
                );
            case 'otp':
                return (
                    <motion.div
                        key="otp"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Verify OTP</h2>
                            <p className="text-gray-600 dark:text-gray-400">Enter the code sent to {email}</p>
                        </div>
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <Input
                                label="Verification Code"
                                type="text"
                                placeholder="123456"
                                icon={<KeyRound className="w-5 h-5" />}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                maxLength={6}
                            />
                            <Button type="submit" className="w-full" size="lg" disabled={loading}>
                                {loading ? 'Verifying...' : 'Verify OTP'} <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <button
                                type="button"
                                onClick={() => setStep('email')}
                                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                Change Email
                            </button>
                        </form>
                    </motion.div>
                );
            case 'password':
                return (
                    <motion.div
                        key="password"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reset Password</h2>
                            <p className="text-gray-600 dark:text-gray-400">Create a new secure password.</p>
                        </div>

                        <form onSubmit={handleResetPassword} className="space-y-6">
                            <Input
                                label="New Password"
                                type="password"
                                placeholder="••••••••"
                                icon={<Lock className="w-5 h-5" />}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                            <Button type="submit" className="w-full" size="lg" disabled={loading}>
                                {loading ? 'Resetting...' : 'Reset Password'} <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                    </motion.div>
                );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-8"
            >
                <Link to="/login" className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-500 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
                </Link>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm"
                    >
                        {error}
                    </motion.div>
                )}
                {successMessage && !error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-600 dark:text-green-400 text-sm"
                    >
                        {successMessage}
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    {renderStep()}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ForgotPasswordPage;
