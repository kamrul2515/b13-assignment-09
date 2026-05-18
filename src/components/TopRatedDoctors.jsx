"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react'; 
import Link from 'next/link';

const TopRatedDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    
    fetch(`${API_BASE}/doctors?limit=3`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setDoctors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-40 space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0055CC]"></div>
        <p className="text-[#0055CC] font-medium animate-pulse">Loading Doctors...</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Top Rated Doctors</h2>
            <p className="text-gray-500 mt-2">Highly qualified specialists near you</p>
          </div>
          <Link href="/appointments" className="text-[#0055CC] font-semibold flex items-center gap-1 hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white rounded-[32px] p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              {/* Image Container */}
              <div className="relative h-72 w-full rounded-[24px] overflow-hidden mb-5">
                <Image 
                  src={doctor.image} 
                  alt={doctor.name} 
                  fill 
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                {/* Available Tag (Optional Figma Detail) */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                  Available Today
                </div>
              </div>

              {/* Content */}
              <div className="px-2 pb-2">
                <h3 className="text-xl font-bold text-gray-900 leading-tight">{doctor.name}</h3>
                <p className="text-[#0055CC] font-medium mt-1">{doctor.specialty}</p>
                
                <div className="flex items-center gap-4 mt-4 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-gray-400" />
                    <span>Bashundhara, Dhaka</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="fill-yellow-400 text-yellow-400" size={16} />
                    <span className="font-bold text-gray-900">{doctor.rating}</span>
                  </div>
                </div>

                <Link href={`/doctors/${doctor._id}`}>
                  <button className="mt-6 w-full bg-[#0055CC] text-white py-4 rounded-2xl font-bold hover:bg-[#0044aa] transition-colors shadow-lg shadow-blue-100">
                    Book Appointment
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;