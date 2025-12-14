import React from "react";
// Inline component
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
        {children}
    </div>
);

const ProjectsPage: React.FC = () => {
    const projects = [
        { title: "Resume Builder", desc: "Auto-generate ATS friendly resumes" },
        { title: "Language Lab", desc: "Practice speaking with feedback" },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-2xl font-semibold">Projects</h1>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((p, idx) => (
                    <Card key={idx}>
                        <div className="font-semibold">{p.title}</div>
                        <div className="mt-2 text-sm">{p.desc}</div>
                        <div className="mt-4"><a href="#" className="underline">Open</a></div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;
