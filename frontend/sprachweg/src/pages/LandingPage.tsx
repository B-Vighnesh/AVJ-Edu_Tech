import React from "react";
import { motion } from "framer-motion";

// Icons
const GlobeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D0AA53]"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>);
const PlayIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
const CheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>);
const StarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#D0AA53" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>);

const HeroSection = () => (
    <section className="relative bg-[#FAFAFA] dark:bg-gray-900 pb-20 pt-10 overflow-hidden">
        {/* Background glow effects could be added here */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="z-10">
                <div className="flex items-center gap-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#D0AA53]"></span>
                    <span className="text-[#A08040] font-medium text-sm tracking-wide uppercase">New: Summer 2024 Batches Now Open</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-serif font-medium text-[var(--sovir-navy)] dark:text-white leading-[1.1] mb-6">
                    SoVir Akademie<br />
                    <span className="text-[#D0AA53]">Skills, Languages</span><br />
                    & Global Careers
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-lg leading-relaxed">
                    Master German from A1 to B2 with live interactive classes, prepare for Goethe exams, and unlock career opportunities in Germany through our proven pathways.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-[#D0AA53] hover:bg-[#b89542] text-[#0A1A2F] px-8 py-4 rounded-md font-bold text-sm transition-transform hover:-translate-y-0.5 flex items-center gap-2">
                        Start A1 Trial <span>→</span>
                    </button>
                    <button className="bg-transparent border border-gray-300 text-[var(--sovir-navy)] px-6 py-4 rounded-md font-bold text-sm hover:border-[#D0AA53] hover:text-[#D0AA53] transition-colors flex items-center gap-2">
                        <PlayIcon /> Book Free Consult
                    </button>
                </div>
                {/* Review snippet */}
                <div className="mt-8 flex items-center gap-4">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"></div>)}
                    </div>
                    <div>
                        <div className="flex gap-1 mb-1">{[1, 2, 3, 4, 5].map(i => <StarIcon key={i} />)} <span className="text-xs font-bold font-sans ml-1 text-[var(--sovir-navy)]">4.9</span></div>
                        <div className="text-xs text-gray-500">from 2500+ reviews</div>
                    </div>
                </div>
            </div>

            {/* Hero Image / Composition */}
            <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <div className="aspect-[4/3] bg-gray-200">
                        {/* Placeholder for Hero Image */}
                        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600" alt="Students" className="w-full h-full object-cover" />
                    </div>

                    {/* Floating Cards */}
                    <div className="absolute top-10 left-[-20px] bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce-slow">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">✓</div>
                        <div>
                            <div className="font-bold text-sm">Goethe Certified</div>
                            <div className="text-xs text-gray-500">Exam Prep Program</div>
                        </div>
                    </div>

                    <div className="absolute bottom-20 right-[-20px] bg-white p-4 rounded-xl shadow-lg flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600"><GlobeIcon /></div>
                        <div>
                            <div className="font-bold text-sm">150+</div>
                            <div className="text-xs text-gray-500">Placements in Germany</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const StatsSection = () => (
    <section className="bg-[#0A1A2F] py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-800">
            <div>
                <div className="text-3xl md:text-4xl font-serif text-white mb-2">5,000+</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">Students Enrolled</div>
            </div>
            <div>
                <div className="text-3xl md:text-4xl font-serif text-white mb-2">98%</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">Success Rate</div>
            </div>
            <div>
                <div className="text-3xl md:text-4xl font-serif text-white mb-2">15+</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">Countries</div>
            </div>
            <div>
                <div className="text-3xl md:text-4xl font-serif text-white mb-2">4.9</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">Student Rating</div>
            </div>
        </div>
    </section>
);

const PartnersSection = () => (
    <section className="py-12 bg-white text-center">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Recognized & Partnered With</div>
        <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {["Goethe Institut", "TestDaF", "TELC", "Make it in Germany", "DAAD", "IHK"].map(p => (
                <span key={p} className="text-xl font-serif font-bold text-gray-600">{p}</span>
            ))}
        </div>
    </section>
);

const PricingCard = ({ title, subtitle, duration, price, crossPrice, features, isPopular }: any) => (
    <div className={`relative bg-white border ${isPopular ? 'border-[#D0AA53]' : 'border-gray-200'} rounded-xl p-6 shadow-sm hover:shadow-xl transition-all`}>
        {isPopular && <span className="absolute top-4 right-4 bg-[#E07A5F] text-white text-[10px] font-bold px-2 py-1 rounded">Popular</span>}
        <div className="flex items-center gap-2 mb-2">
            <span className="text-[#D0AA53] font-bold">★ 4.9</span>
            <span className="text-xs text-gray-400">(1,250 students)</span>
        </div>
        <h3 className="text-xl font-bold text-[var(--sovir-navy)]">{title}</h3>
        <div className="text-sm text-gray-500 mb-4">{subtitle}</div>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 border-b pb-4 border-dashed">
            <div className="flex items-center gap-1">⏱ {duration}</div>
            <div className="flex items-center gap-1">📅 Jan 15, 2024</div>
        </div>

        <ul className="space-y-3 mb-8">
            {features.map((f: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#D0AA53] mt-0.5">•</span> {f}
                </li>
            ))}
        </ul>

        <div className="flex items-center justify-between mt-auto">
            <div>
                <span className="text-2xl font-serif font-bold text-[var(--sovir-navy)]">{price}</span>
                <span className="text-sm text-gray-400 line-through ml-2">{crossPrice}</span>
            </div>
            <button className="bg-[#D0AA53] hover:bg-[#b89542] text-[#0A1A2F] px-4 py-2 rounded text-sm font-bold">Enroll →</button>
        </div>
    </div>
);

const CoursesSection = () => (
    <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4">
            <div className="mb-12">
                <div className="text-[#D0AA53] text-sm font-bold uppercase mb-2">Our Programs</div>
                <h2 className="text-4xl font-serif text-[var(--sovir-navy)]">Featured Courses</h2>
                <p className="text-gray-500 mt-4 max-w-2xl">Choose from our expertly designed German language courses, from beginner A1 to advanced B2 levels.</p>
                <div className="flex gap-2 mt-6">
                    {["All Courses", "Live Classes", "Hybrid", "Self-Paced"].map((f, i) => (
                        <button key={f} className={`px-4 py-1.5 rounded-full text-xs font-bold border ${i === 0 ? 'bg-[#0A1A2F] text-white border-[#0A1A2F]' : 'bg-white text-gray-600 border-gray-200'}`}>{f}</button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PricingCard
                    title="German A1 Complete"
                    subtitle="Beginner's Journey"
                    duration="8 weeks"
                    price="€299"
                    crossPrice="€399"
                    features={["Live interactive sessions", "1-on-1 speaking practice"]}
                />
                <PricingCard
                    title="German A2 Intensive"
                    subtitle="Build Fluency"
                    duration="10 weeks"
                    price="€349"
                    crossPrice="€449"
                    isPopular
                    features={["Live + recorded content", "Weekly assessments"]}
                />
                <PricingCard
                    title="German B1 Professional"
                    subtitle="Workplace Ready"
                    duration="12 weeks"
                    price="€449"
                    crossPrice="€549"
                    isPopular
                    features={["Business German module", "Interview preparation"]}
                />
                <PricingCard
                    title="German B2 Mastery"
                    subtitle="Near-Native Level"
                    duration="14 weeks"
                    price="€549"
                    crossPrice="€699"
                    features={["Advanced grammar deep-dive", "Academic German"]}
                />
            </div>

            <div className="mt-12 text-center">
                <button className="bg-white border border-gray-300 px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-50">View All Courses →</button>
            </div>
        </div>
    </section>
);

const TestimonialsSection = () => (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="text-[#D0AA53] text-sm font-bold uppercase mb-2">Success Stories</div>
            <h2 className="text-4xl font-serif text-[var(--sovir-navy)] mb-4">Hear From Our Students</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mb-16">Join thousands of successful learners who have transformed their careers.</p>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Active Testimonial */}
                <div className="flex-1 bg-[#FFFBF4] p-12 rounded-2xl text-left relative">
                    <div className="text-6xl text-[#EAD098] font-serif absolute top-8 left-8">“</div>
                    <p className="text-lg text-gray-700 font-medium leading-relaxed relative z-10 mt-6 mb-8">
                        'SoVir Akademie transformed my career. From zero German to B2 in 10 months, and now I'm working as a nurse in Berlin. The live classes were engaging, and the career support was exceptional.'
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-300">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div>
                            <div className="font-bold text-[var(--sovir-navy)]">Priya Sharma</div>
                            <div className="text-xs text-[#D0AA53]">Nursing Professional</div>
                            <div className="flex text-[#D0AA53] text-xs mt-1">★★★★★</div>
                        </div>
                    </div>
                </div>

                {/* Video/Image Grid */}
                <div className="flex-1">
                    <div className="bg-white border rounded-xl p-6 text-left mb-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-[#D0AA53] text-[10px] font-bold uppercase mb-2">Program Completed</div>
                        <div className="font-serif font-bold text-lg">German B2 + Nursing Pathway</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square rounded-xl overflow-hidden border-4 border-[#D0AA53] shadow-lg">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                        </div>
                        <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-80" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default function LandingPage() {
    return (
        <div>
            <HeroSection />
            <StatsSection />
            <PartnersSection />
            <CoursesSection />
            <TestimonialsSection />
            <section className="py-20 text-center">
                <h2 className="text-2xl font-serif mb-6">Ready to start your journey?</h2>
                <button className="bg-[#D0AA53] text-[#0A1A2F] px-8 py-3 rounded font-bold hover:bg-[#b89542]">Get Started Now</button>
            </section>
        </div>
    );
}
