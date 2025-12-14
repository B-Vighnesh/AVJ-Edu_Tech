import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icons (SVG)
const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
);
const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
);
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const SocialIcon = ({ type }: { type: string }) => (
    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-[var(--sovir-gold)] transition-colors cursor-pointer">
        <span className="text-xs">{type[0].toUpperCase()}</span>
    </div>
);

const Navbar = () => {
    return (
        <nav className="bg-white dark:bg-gray-900 sticky top-0 z-50 font-serif border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-[#D0AA53] rounded-full flex items-center justify-center text-[var(--sovir-navy)] font-bold text-xl font-serif">S</div>
                    <span className="font-bold text-xl text-[var(--sovir-navy)] dark:text-gray-100 tracking-tight">SoVir Akademie</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-[var(--sovir-gold)]">Courses <ChevronDownIcon /></div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-[var(--sovir-gold)]">Skill Training <ChevronDownIcon /></div>
                    <Link to="/courses" className="hover:text-[var(--sovir-gold)]">German Signature</Link>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-[var(--sovir-gold)]">Careers Abroad <ChevronDownIcon /></div>
                    <Link to="/about" className="hover:text-[var(--sovir-gold)]">About</Link>
                    <Link to="/contact" className="hover:text-[var(--sovir-gold)]">Contact</Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <button className="text-gray-600 dark:text-gray-300 hover:text-[var(--sovir-gold)]">
                        <MoonIcon />
                    </button>
                    <Link to="/login" className="text-sm font-semibold text-[var(--sovir-navy)] dark:text-white hover:text-[var(--sovir-gold)]">Sign In</Link>
                    <button className="bg-[#D0AA53] hover:bg-[#b89542] text-[#0A1A2F] px-5 py-2.5 rounded text-sm font-bold transition-colors">
                        Start A1 Trial
                    </button>
                </div>
            </div>
        </nav>
    );
};

const Footer = () => (
    <footer className="bg-[#0A1A2F] text-white pt-16 pb-8 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
                {/* Brand */}
                <div className="col-span-1 lg:col-span-1">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-[#D0AA53] rounded-full flex items-center justify-center text-[#0A1A2F] font-bold text-xl font-serif">S</div>
                        <span className="font-bold text-xl font-serif">SoVir Akademie</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        Your gateway to German language mastery and career opportunities in Germany. Join thousands of successful learners.
                    </p>
                    <div className="space-y-3 text-sm text-gray-400">
                        <div className="flex items-center gap-3"><MailIcon /> info@sovirakademie.com</div>
                        <div className="flex items-center gap-3"><PhoneIcon /> +49 30 123 456 789</div>
                        <div className="flex items-center gap-3 items-start"><MapPinIcon /> <span>Friedrichstraße 123<br />10117 Berlin, Germany</span></div>
                    </div>
                </div>

                {/* Links */}
                <div className="col-span-1 lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="font-semibold mb-4 text-sm tracking-wider">Programs</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-[#D0AA53]">German A1-B2</a></li>
                            <li><a href="#" className="hover:text-[#D0AA53]">Exam Preparation</a></li>
                            <li><a href="#" className="hover:text-[#D0AA53]">Business German</a></li>
                            <li><a href="#" className="hover:text-[#D0AA53]">Live Classes</a></li>
                            <li><a href="#" className="hover:text-[#D0AA53]">Self-Paced Learning</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-sm tracking-wider">Careers</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-[#D0AA53]">Ausbildung Programs</a></li>
                            <li><a href="#" className="hover:text-[#D0AA53]">Nursing Pathway</a></li>
                            <li><a href="#" className="hover:text-[#D0AA53]">Job Placement</a></li>
                            <li><a href="#" className="hover:text-[#D0AA53]">Employer Partners</a></li>
                            <li><a href="#" className="hover:text-[#D0AA53]">Success Stories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-sm tracking-wider">Company</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-[#D0AA53]">About Us</a></li>
                            <li><a href="#" className="hover:text-[#D0AA53]">Our Team</a></li>
                            <li><a href="#" className="hover:text-[#D0AA53]">Careers at SoVir</a></li>
                            <li><a href="#" className="hover:text-[#D0AA53]">Press & Media</a></li>
                            <li><a href="#" className="hover:text-[#D0AA53]">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-sm tracking-wider">Resources</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-[#D0AA53]">Student Dashboard</a></li>
                            <li><a href="#" className="hover:text-[#D0AA53]">Knowledge Base</a></li>
                            <li><a href="#" className="hover:text-[#D0AA53]">Blog</a></li>
                            <li><a href="#" className="hover:text-[#D0AA53]">Events</a></li>
                            <li><a href="#" className="hover:text-[#D0AA53]">Partner With Us</a></li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="col-span-1 border-t lg:border-t-0 pt-8 lg:pt-0 border-gray-800">
                    <h4 className="font-serif text-lg mb-2">Stay Updated</h4>
                    <p className="text-gray-400 text-sm mb-4">Get the latest courses, career tips, and exclusive offers.</p>
                    <div className="flex gap-2">
                        <input type="email" placeholder="Enter your email" className="bg-[#112240] border border-gray-700 rounded px-4 py-2 text-sm w-full focus:outline-none focus:border-[#D0AA53]" />
                        <button className="bg-[#D0AA53] hover:bg-[#b89542] text-[#0A1A2F] px-3 py-2 rounded text-sm font-bold">→</button>
                    </div>
                    <div className="mt-8 flex gap-4">
                        {['Fb', 'In', 'Li', 'Yt'].map(soc => <SocialIcon key={soc} type={soc} />)}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                <div>© {new Date().getFullYear()} SoVir Akademie. All rights reserved.</div>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                    <a href="#" className="hover:text-white">Imprint</a>
                    <a href="#" className="hover:text-white">Cookie Settings</a>
                </div>
            </div>
        </div>
    </footer>
);

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors font-sans w-full overflow-x-hidden">
            <Navbar />
            <main className="flex-1 w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default AppLayout;
