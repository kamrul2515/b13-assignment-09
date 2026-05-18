"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BookingModal from '@/components/BookingModal';

const DoctorDetails = ({ params }) => {
  const { id } = params;
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  fetch(`${API_BASE}/doctors`)
    .then(res => res.json())
    .then(allDoctors => {
      // String comparison নিশ্চিত করা হয়েছে
      const found = allDoctors.find(d => String(d._id) === String(id));
      setDoctor(found);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!doctor) return <div className="text-center py-20">Doctor not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-white rounded-3xl shadow overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/5 relative h-96 md:h-auto">
              <Image src={doctor.image} alt={doctor.name} fill className="object-cover" />
            </div>

            <div className="md:w-3/5 p-10">
              <h1 className="text-4xl font-bold">{doctor.name}</h1>
              <p className="text-2xl text-[#0055CC] mt-2">{doctor.specialty}</p>

              <div className="flex gap-6 mt-8 text-lg">
                <div>
                  <p className="text-gray-500">Experience</p>
                  <p className="font-semibold">{doctor.experience}</p>
                </div>
                <div>
                  <p className="text-gray-500">Fee</p>
                  <p className="font-semibold">৳{doctor.fee}</p>
                </div>
              </div>

              <p className="mt-8 text-gray-700">{doctor.description}</p>

              <button
                onClick={() => setShowModal(true)}
                className="mt-10 w-full py-4 bg-[#0055CC] text-white rounded-2xl text-lg font-semibold"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && <BookingModal doctor={doctor} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default DoctorDetails;