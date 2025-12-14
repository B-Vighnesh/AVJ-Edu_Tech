import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-2xl font-semibold">Welcome back{user ? `, ${user.name}` : ""}</h1>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded shadow-sm bg-[var(--sovir-cream-dark)]">
                    <div className="font-bold">Upcoming</div>
                    <div className="text-sm mt-2">1 live class tomorrow</div>
                    <Link to="/dashboard/live/123" className="mt-3 inline-block underline">Join live</Link>
                </div>
                <div className="p-4 rounded shadow-sm bg-[var(--sovir-cream-dark)]">
                    <div className="font-bold">Progress</div>
                    <div className="text-sm mt-2">You are in A2 · 45% complete</div>
                </div>
                <div className="p-4 rounded shadow-sm bg-[var(--sovir-cream-dark)]">
                    <div className="font-bold">Placements</div>
                    <div className="text-sm mt-2">80% interview-to-hire</div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
