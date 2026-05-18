"use client";
import React, { useEffect, useState, use } from 'react'; // React.use (অথবা use) ইমপোর্ট করো
import Image from 'next/image';
import BookingModal from '@/components/BookingModal';

const DoctorDetails = ({ params }) => {
  // Next.js 15+ এর জন্য params কে unwrap করতে হবে
  const { id } = use(params); 
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    
    // নির্দিষ্ট ডাক্তারকে সরাসরি API থেকে ফেচ করা ভালো প্র্যাকটিস
    fetch(`${API_BASE}/doctors`)
      .then(res => res.json())
      .then(allDoctors => {
        const found = allDoctors.find(d => String(d._id) === String(id));
        setDoctor(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctor details:", err);
        setLoading(false);
      });
  }, [id]);

  // লোডিং স্পিনার (আগের ডিজাইন অনুযায়ী)
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-40 space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0055CC]"></div>
        <p className="text-[#0055CC] font-medium">Loading Doctor Details...</p>
      </div>
    );
  }

  if (!doctor) return <div className="text-center py-20">Doctor not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-100">
          <div className="md:flex">
            <div className="md:w-2/5 relative h-96 md:h-[500px]">
              <Image 
                src={doctor.image} 
                alt={doctor.name} 
                fill 
                unoptimized
                className="object-cover" 
              />
            </div>

            <div className="md:w-3/5 p-10 flex flex-col justify-center">
              <span className="bg-blue-50 text-[#0055CC] px-4 py-1 rounded-full text-sm font-semibold w-fit mb-4">
                Verified Specialist
              </span>
              <h1 className="text-4xl font-bold text-gray-900">{doctor.name}</h1>
              <p className="text-2xl text-[#0055CC] mt-2 font-medium">{doctor.specialty}</p>

              <div className="flex gap-10 mt-8 p-6 bg-gray-50 rounded-2xl">
                <div>
                  <p className="text-gray-500 text-sm">Experience</p>
                  <p className="font-bold text-xl text-gray-800">{doctor.experience}</p>
                </div>
                <div className="border-l border-gray-200 pl-10">
                  <p className="text-gray-500 text-sm">Consultation Fee</p>
                  <p className="font-bold text-xl text-gray-800">৳{doctor.fee}</p>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-bold text-gray-900 mb-2">About Doctor</h4>
                <p className="text-gray-600 leading-relaxed">{doctor.description}</p>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="mt-10 w-full py-4 bg-[#0055CC] text-white rounded-2xl text-lg font-bold hover:bg-[#0044aa] transition-all shadow-lg shadow-blue-100"
              >
                Book Appointment Now
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