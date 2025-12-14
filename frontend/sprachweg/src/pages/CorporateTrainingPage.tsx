import React from "react";
// Inline component
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
        {children}
    </div>
);

const CorporateTrainingPage: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-2xl font-semibold">Corporate Training</h1>
            <p className="mt-2 text-sm">Enterprise packages for language & communication upskilling.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <div className="font-semibold">Custom Cohorts</div>
                    <div className="mt-2">Tailored curriculum and placement pipelines for corporates.</div>
                </Card>
                <Card>
                    <div className="font-semibold">Assessment & Analytics</div>
                    <div className="mt-2">Performance dashboards & progress reports.</div>
                </Card>
            </div>
        </div>
    );
};

export default CorporateTrainingPage;
