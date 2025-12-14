import React from "react";
import { useParams } from "react-router-dom";

const DashboardLivePage: React.FC = () => {
    const { id } = useParams();

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-2xl font-semibold">Live Class</h1>
            <div className="mt-4">Joining live session ID: <strong>{id}</strong></div>
            <div className="mt-6">
                {/* embed player or meeting link */}
                <div className="w-full h-80 bg-black/10 flex items-center justify-center rounded">Live player placeholder</div>
            </div>
        </div>
    );
};

export default DashboardLivePage;
