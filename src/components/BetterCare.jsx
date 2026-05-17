import React from 'react';
import { ShieldCheck, Headset, Clock } from 'lucide-react';

const BetterCare = () => {
    return (
        <section className="bg-white py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                
                {/* Left Side: Image Gallery Section */}
                <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
                    {/* Primary Large Image */}
                    <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl w-[80%] md:w-[70%]">
                        <img 
                            src="https://plus.unsplash.com/premium_photo-1661281397737-9b5d75b52beb?fm=jpg&q=60&w=3000&auto=format&fit=crop" 
                            alt="Doctor using tablet" 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Secondary Overlapping Image */}
                    <div className="absolute top-[-10%] right-[-5%] md:right-[5%] z-0 rounded-3xl overflow-hidden shadow-xl w-[50%] md:w-[45%] opacity-90">
                        <img 
                            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070" 
                            alt="Patient care" 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Floating Blue Achievement Card */}
                    <div className="absolute bottom-[10%] right-0 md:right-[15%] z-20 bg-[#0055CC] text-white p-6 md:p-8 rounded-2xl shadow-2xl text-center transform hover:scale-105 transition-transform">
                        <h2 className="text-4xl md:text-5xl font-bold">15+</h2>
                        <p className="text-sm md:text-base font-medium mt-1">Years of Excellence</p>
                    </div>
                </div>

                {/* Right Side: Content Section */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <div className="space-y-3">
                        <h4 className="text-[#0055CC] font-bold tracking-widest uppercase text-sm">
                            Why Choose Us
                        </h4>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#091E42] leading-tight">
                            Expert Care for a Better Life
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                            We provide a comprehensive range of medical services focused on your long-term wellness and immediate health needs.
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-6 pt-4">
                        {/* Feature 1 */}
                        <div className="flex items-start gap-4">
                            <div className="bg-[#E0F9F1] p-3 rounded-xl text-[#00C18D]">
                                <ShieldCheck size={28} />
                            </div>
                            <div>
                                <h5 className="text-xl font-bold text-[#091E42]">Verified Professionals</h5>
                                <p className="text-gray-500 text-sm">Every doctor undergoes a rigorous background and credential check.</p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex items-start gap-4">
                            <div className="bg-[#E9EBF4] p-3 rounded-xl text-[#0055CC]">
                                <Headset size={28} />
                            </div>
                            <div>
                                <h5 className="text-xl font-bold text-[#091E42]">24/7 Support</h5>
                                <p className="text-gray-500 text-sm">Our dedicated team is here to assist you at any time, day or night.</p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex items-start gap-4">
                            <div className="bg-[#F4F5F7] p-3 rounded-xl text-gray-700">
                                <Clock size={28} />
                            </div>
                            <div>
                                <h5 className="text-xl font-bold text-[#091E42]">Instant Appointments</h5>
                                <p className="text-gray-500 text-sm">Book your visit in less than 2 minutes with our streamlined platform.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default BetterCare;