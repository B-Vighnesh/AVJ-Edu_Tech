import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Inline components to avoid import errors
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = "", ...props }) => (
    <button className={`px-4 py-2 bg-[var(--sovir-gold)] text-[var(--sovir-navy)] rounded-md font-medium hover:opacity-90 transition-opacity ${className}`} {...props} />
);

const RegisterPage: React.FC = () => {
    const { login } = useAuth(); // Assuming login or a register method exists, using login for now or mock
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Mock registration - in real app, call register
            await new Promise(r => setTimeout(r, 1000));
            // Then login
            // await login({ email, password });
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto py-16 px-4">
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border px-3 py-2 rounded" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border px-3 py-2 rounded" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border px-3 py-2 rounded" />

                <Button type="submit" className="w-full">
                    {loading ? "Creating..." : "Sign up"}
                </Button>
                <div className="text-center text-sm mt-4">
                    Already have an account? <Link to="/login" className="underline">Sign in</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
