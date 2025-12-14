import React, { useState } from "react";
import { Link } from "react-router-dom";

// Inline components to avoid import errors
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = "", ...props }) => (
    <button className={`px-4 py-2 bg-[var(--sovir-gold)] text-[var(--sovir-navy)] rounded-md font-medium hover:opacity-90 transition-opacity ${className}`} {...props} />
);

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Mock password reset
    };

    if (submitted) {
        return (
            <div className="max-w-md mx-auto py-16 px-4 text-center">
                <h1 className="text-2xl font-bold mb-4">Check your email</h1>
                <p>We have sent a password reset link to {email}.</p>
                <Link to="/login" className="mt-4 inline-block underline">Back to login</Link>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto py-16 px-4">
            <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border px-3 py-2 rounded" />

                <Button type="submit" className="w-full">
                    Send Reset Link
                </Button>
                <div className="text-center text-sm mt-4">
                    <Link to="/login" className="underline">Back to login</Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
