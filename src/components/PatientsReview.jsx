import React from 'react';
import { Image, Star } from 'lucide-react';

const PatientsReview = () => {
    const reviews = [
        {
            id: 1,
            name: "Emily Peterson",
            role: "Marketing Executive",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070",
            review: "The process was so seamless. I found a specialist and booked my appointment within minutes. The doctor was exceptional.",
            rating: 5
        },
        {
            id: 2,
            name: "David Vance",
            role: "Software Engineer",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974",
            review: "I love how I can see all my appointment history and upcoming visits in one dashboard. It really simplifies my healthcare management.",
            rating: 5
        }
    ];

    return (
        <section className="bg-[#E9EBF4] py-20 px-6">
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#091E42]">
                        Voices of Our Patients
                    </h2>
                    <p className="text-gray-600 font-medium">
                        Real stories from people who trust DocAppoint
                    </p>
                </div>

                {/* Testimonial Cards */}
                <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 max-w-6xl mx-auto">
                    {reviews.map((item) => (
                        <div 
                            key={item.id} 
                            className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex-1 flex flex-col justify-between"
                        >
                            <div className="space-y-4">
                                {/* Star Rating */}
                                <div className="flex gap-1">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star key={i} size={20} className="fill-[#FFC107] text-[#FFC107]" />
                                    ))}
                                </div>
                                
                                {/* Review Text */}
                                <p className="text-gray-700 italic leading-relaxed text-lg">
                                    {item.review}
                                </p>
                            </div>

                            {/* User Profile */}
                            <div className="mt-8 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                    <Image 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#091E42]">{item.name}</h4>
                                    <p className="text-gray-500 text-sm">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PatientsReview;