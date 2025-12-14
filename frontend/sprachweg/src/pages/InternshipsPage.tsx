import React from "react";
// Inline component
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
        {children}
    </div>
);

const InternshipsPage: React.FC = () => {
    const internships = [
        { title: "German Content Intern", company: "BerlinMedia", stipend: "10k/month" },
        { title: "Teaching Assistant", company: "SoVir", stipend: "8k/month" },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-2xl font-semibold">Internships</h1>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {internships.map((i, idx) => (
                    <Card key={idx}>
                        <div className="font-semibold">{i.title}</div>
                        <div className="mt-1 text-sm">{i.company} — {i.stipend}</div>
                        <div className="mt-4"><a className="underline" href="#">Apply</a></div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default InternshipsPage;
