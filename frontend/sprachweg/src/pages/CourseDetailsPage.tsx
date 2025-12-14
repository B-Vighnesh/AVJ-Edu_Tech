import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// Inline component
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = "", ...props }) => (
    <button className={`px-4 py-2 bg-[var(--sovir-gold)] text-[var(--sovir-navy)] rounded-md font-medium hover:opacity-90 transition-opacity ${className}`} {...props} />
);

const CourseDetailsPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Replace with real fetch
    const course = { id, title: `Course ${id}`, duration: "3 months", summary: "Deep learning path." };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-semibold">{course.title}</motion.h1>
            <div className="mt-4 text-sm">{course.summary}</div>
            <div className="mt-6 flex gap-3">
                <Button onClick={() => navigate("/login")}>Enroll</Button>
                <a href="#curriculum" className="px-4 py-2 border rounded">See curriculum</a>
            </div>
        </div>
    );
};

export default CourseDetailsPage;
