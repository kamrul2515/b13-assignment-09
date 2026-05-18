"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, MapPin, Search } from 'lucide-react';
import { useRouter } from 'next/navigation'; 

const Appointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);

        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${API_BASE}/doctors`);
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setDoctors(data);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name?.toLowerCase().includes(search.toLowerCase()) ||
    doctor.specialty?.toLowerCase().includes(search.toLowerCase())
  );


  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4 bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-[#0055CC]"></div>
        <p className="text-[#0055CC] font-medium animate-pulse">Finding Doctors...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">Book an Appointment</h1>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Find the right specialist and schedule your visit in seconds. 
            Trusted by thousands of patients.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center gap-4 bg-white p-2 rounded-3xl shadow-sm border border-gray-100 focus-within:ring-2 ring-blue-100 transition-all">
            <div className="pl-4 text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 py-4 bg-transparent focus:outline-none text-gray-700"
            />
            <button className="bg-[#0055CC] text-white px-8 py-3.5 rounded-[18px] font-semibold hover:bg-[#0044aa] transition-colors">
              Search
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-gray-800">
                {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Available
            </h3>
        </div>

        {filteredDoctors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <div key={doctor._id} className="bg-white rounded-4xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-50 group">
                <div className="relative h-64 rounded-3xl overflow-hidden">
                  <Image 
                    src={doctor.image} 
                    alt={doctor.name} 
                    fill 
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-[#0055CC] shadow-sm">
                    Available Today
                  </div>
                </div>

                <div className="px-2 pt-5 pb-2">
                  <h3 className="font-bold text-xl text-gray-900">{doctor.name}</h3>
                  <p className="text-[#0055CC] font-medium text-sm mb-4">{doctor.specialty}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{doctor.location || "Dhaka, Bangladesh"}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-lg">
                        <Star className="fill-yellow-400 text-yellow-400" size={14} />
                        <span className="font-bold text-gray-800 text-sm">{doctor.rating}</span>
                      </div>
                      <span className="text-xs text-gray-400">(120+ Reviews)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push(`/doctors/${doctor._id}`)}
                    className="w-full bg-[#0055CC] text-white py-4 rounded-[20px] font-bold hover:bg-[#0044aa] transition-all transform active:scale-95 shadow-lg shadow-blue-50"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-4xl shadow-sm">
            <p className="text-gray-500 text-lg italic">No doctors found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;