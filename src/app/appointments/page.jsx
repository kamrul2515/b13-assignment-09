"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

const AppointmentsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Doctors
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setFilteredDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Handle Search
  const handleSearch = (value) => {
    setSearchText(value);

    const filtered = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredDoctors(filtered);
  };

  // Loading Spinner
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-[#0055CC]"></span>
          <p className="text-[#0055CC] font-medium">
            Loading Doctors...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-16">
      <div className="container mx-auto px-6">

        {/* Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            All Appointments
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Find and book appointments with trusted doctors
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-14">
          <div className="relative">
            <input
              type="text"
              placeholder="Search doctor by name..."
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full py-4 pl-14 pr-5 rounded-2xl border border-gray-200 shadow-sm outline-none focus:ring-2 focus:ring-[#0055CC]/20 focus:border-[#0055CC] bg-white text-gray-700"
            />

            <Search
              size={22}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* No Data */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="text-3xl font-bold text-gray-800">
              No Doctor Found
            </h2>

            <p className="text-gray-500 mt-3">
              Try searching with another doctor name.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#0055CC]">
                    Available
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {doctor.name}
                  </h2>

                  <p className="text-[#0055CC] font-semibold mt-2">
                    {doctor.specialty}
                  </p>

                  <div className="mt-4 space-y-2 text-gray-500 text-sm">
                    <p>
                      📍 {doctor.location}
                    </p>

                    <p>
                      🏥 {doctor.hospital}
                    </p>

                    <p className="font-semibold text-gray-800">
                      💰 Consultation Fee: ৳{doctor.fee}
                    </p>
                  </div>

                  {/* Button */}
                  <Link href={`/doctors/${doctor._id}`}>
                    <button className="mt-6 w-full bg-[#0055CC] hover:bg-[#0044aa] text-white py-3.5 rounded-2xl font-bold transition-all active:scale-[0.98]">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;