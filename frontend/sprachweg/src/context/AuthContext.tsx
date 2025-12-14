import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    role: string;
    isEmailVerified: boolean;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    sendOtp: (email: string, purpose: string) => Promise<void>;
    verifyOtp: (email: string, otp: string, purpose: string) => Promise<void>;
    resetPassword: (email: string, newPassword: string) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
            refreshUser();
        } else {
            setLoading(false);
        }
    }, []);

    const refreshUser = async () => {
        try {
            const response = await api.get('/profile');
            // Map ProfileResponse (fullName) to User (name)
            const userData: User = {
                id: response.data.id.toString(),
                name: response.data.fullName,
                email: response.data.email,
                phoneNumber: response.data.phoneNo,
                role: 'Student', // Defaulting role as it is missing from ProfileResponse
                isEmailVerified: true // Assumption since they have a profile
            };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            console.error('Failed to refresh user:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const register = async (
        name: string,
        email: string,
        password: string
    ) => {
        const response = await api.post('/auth/register', {
            fullName: name, // Backend expects fullName
            email,
            password,
        });

        // Backend returns token immediately on register
        const { token, ...userData } = response.data;
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData as User);
            await refreshUser(); // Get full profile
        }
    };

    const sendOtp = async (email: string, purpose: string) => {
        await api.post('/auth/send', { email, purpose });
    };

    const verifyOtp = async (email: string, otp: string, purpose: string) => {
        await api.post('/auth/verify', { email, otp, purpose });
    };

    const resetPassword = async (email: string, newPassword: string) => {
        await api.post('/auth/reset-password', { email, newPassword });
    };

    const login = async (email: string, password: string) => {
        const response = await api.post('/auth/login', { email, password });
        const { token } = response.data;
        if (token) {
            localStorage.setItem('token', token);
            await refreshUser();
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                sendOtp,
                verifyOtp,
                resetPassword,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
