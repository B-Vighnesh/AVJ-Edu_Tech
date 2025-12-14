import React from "react";
// Inline component
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
        {children}
    </div>
);

const CareerToolsPage: React.FC = () => {
    const tools = [
        { title: "Resume Review", desc: "ATS-ready resumes for Germany" },
        { title: "Mock Interviews", desc: "Technical & HR mocks" },
        { title: "Job Tracker", desc: "Track applications & status" },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-2xl font-semibold">Career Tools</h1>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {tools.map((t, idx) => (
                    <Card key={idx}>
                        <div className="font-semibold">{t.title}</div>
                        <div className="mt-2 text-sm">{t.desc}</div>
                        <div className="mt-4"><a href="#" className="underline">Use tool</a></div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CareerToolsPage;
