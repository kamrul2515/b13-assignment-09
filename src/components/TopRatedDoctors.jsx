"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import Link from 'next/link';

const TopRatedDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API URL fallback যদি env কাজ না করে
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

  if (loading) return <div className="py-20 text-center">Loading...</div>;

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <div className="relative h-80">
                <Image 
  src={doctor.image} 
  alt={doctor.name} 
  fill 
  unoptimized // এটি দিলে Next.js ডোমেইন চেক করবে না
  className="object-cover" 
/>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{doctor.name}</h3>
                <p className="text-[#0055CC]">{doctor.specialty}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="fill-yellow-400 text-yellow-400" size={18} />
                  <span className="font-bold">{doctor.rating}</span>
                </div>
                <Link href={`/doctors/${doctor._id}`}>
                  <button className="mt-6 w-full bg-[#0055CC] text-white py-3 rounded-2xl hover:bg-[#0044aa]">
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