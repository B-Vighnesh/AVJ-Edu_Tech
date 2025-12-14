import React from "react";
// Inline component
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
        {children}
    </div>
);
import { motion } from "framer-motion";

const CoursesPage: React.FC = () => {
    const courses = [
        { id: "a1", title: "A1 Foundation", desc: "Beginner friendly" },
        { id: "a2", title: "A2 Conversational", desc: "Intermediate basics" },
        { id: "b1", title: "B1 Career German", desc: "Interview-ready" },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-semibold">Courses</h1>
            <motion.div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((c) => (
                    <motion.div key={c.id} whileHover={{ scale: 1.02 }} className="cursor-pointer">
                        <Card>
                            <div className="font-semibold">{c.title}</div>
                            <div className="mt-2 text-sm">{c.desc}</div>
                            <div className="mt-4"><a href={`/courses/${c.id}`} className="underline">View course</a></div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default CoursesPage;
