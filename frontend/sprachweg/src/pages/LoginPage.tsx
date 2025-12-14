import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login({ email, password });
            navigate("/dashboard");
        } catch (err) {
            // show error (you likely have a toast)
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto py-16 px-4">
            <h1 className="text-2xl font-bold mb-4">Sign in</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border px-3 py-2 rounded" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border px-3 py-2 rounded" />
                <div className="flex items-center justify-between">
                    <a href="/forgot-password" className="text-sm underline">Forgot?</a>
                </div>
                <button type="submit" className="w-full px-4 py-2 rounded-md bg-[var(--sovir-gold)] text-[var(--sovir-navy)]">
                    {loading ? "Signing in..." : "Sign in"}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
