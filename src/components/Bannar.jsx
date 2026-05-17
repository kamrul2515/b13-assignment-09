"use client";

import React, { useEffect, useState } from 'react';

const Bannar = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            title: "Your Health,",
            subtitle: "Our Priority.",
            description: "Connect with top-rated medical professionals and manage your appointments with ease. Trusted by over 50,000 patients.",
            image: "https://max-website20-images.s3.ap-south-1.amazonaws.com/Types_of_Doctors_1c5efbe677.jpg"
        },
        {
            id: 2,
            title: "Expert Care,",
            subtitle: "Anytime Anywhere.",
            description: "Access world-class healthcare from the comfort of your home. Book video consultations with specialists instantly.",
            image: "https://img.magnific.com/free-photo/team-young-specialist-doctors-standing-corridor-hospital_1303-21199.jpg"
        },
        {
            id: 3,
            title: "Modern Clinic,",
            subtitle: "Personalized Care.",
            description: "Experience healthcare tailored to your needs with our advanced diagnostic tools and dedicated medical team.",
            image: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?fm=jpg&q=60&w=3000&auto=format&fit=crop"
        }
    ];

    // Automatic Slide Change Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000); // 5 seconds por por change hobe
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="container mx-auto px-4 md:px-6 py-6">
            <div className="relative w-full h-[450px] md:h-[650px] rounded-3xl overflow-hidden shadow-xl bg-gray-100">
                
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out transform ${
                            index === currentSlide 
                            ? "opacity-100 translate-x-0 scale-100" 
                            : "opacity-0 translate-x-full scale-105"
                        }`}
                    >
                        {/* Background Image */}
                        <img
                            src={slide.image}
                            className="w-full h-full object-cover object-top"
                            alt="Banner"
                        />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/40 to-transparent flex items-center">
                            <div className="pl-10 md:pl-24 max-w-2xl space-y-4">
                                <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 leading-tight">
                                    {slide.title} <br />
                                    <span className="text-[#0055CC]">{slide.subtitle}</span>
                                </h1>
                                <p className="text-gray-700 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
                                    {slide.description}
                                </p>
                                <div className="pt-4">
                                    <button className="btn bg-[#0055CC] hover:bg-[#0044aa] text-white border-none px-10 py-4 h-auto text-lg rounded-full transition-all hover:scale-105 shadow-lg">
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Dot Indicators (Slider control er jonyo niche choto dot) */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-3 rounded-full transition-all duration-300 ${
                                index === currentSlide ? "w-10 bg-[#0055CC]" : "w-3 bg-gray-400"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bannar;