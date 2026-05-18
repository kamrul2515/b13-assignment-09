"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';

const Appointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`)
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
        setLoading(false);
      });
  }, []);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name?.toLowerCase().includes(search.toLowerCase()) ||
    doctor.specialty?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Book an Appointment</h1>
          <p className="text-gray-600 mt-3">Find the right specialist and schedule your visit in seconds.</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex gap-4 bg-white p-2 rounded-3xl shadow-sm">
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-6 py-4 rounded-3xl focus:outline-none"
            />
            <button className="bg-[#0055CC] text-white px-10 rounded-3xl font-medium hover:bg-[#0044aa]">
              Search
            </button>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-6">Showing {filteredDoctors.length} specialized doctors</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <div key={doctor._id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <div className="relative h-72">
                <Image src={doctor.image} alt={doctor.name} fill className="object-cover" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium shadow">
                  Available Today
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-xl">{doctor.name}</h3>
                <p className="text-[#0055CC]">{doctor.specialty}</p>

                <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>{doctor.location}</span>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <Star className="fill-yellow-400 text-yellow-400" size={18} />
                  <span className="font-semibold">{doctor.rating}</span>
                </div>

                <button
                  onClick={() => window.location.href = `/doctors/${doctor._id}`}
                  className="mt-6 w-full bg-[#0055CC] text-white py-3.5 rounded-2xl font-medium hover:bg-[#0044aa] transition"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;