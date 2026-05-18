"use client";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const BookingModal = ({ doctor, onClose }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    patientName: "",
    gender: "Male",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length < 11) {
      return toast.warn("Please enter a valid phone number");
    }

    setLoading(true);

    const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;
    const userEmail = typeof window !== 'undefined' ? localStorage.getItem("userEmail") : "user@gmail.com";

    const bookingData = {
      userId,
      userEmail,
      doctor: {
        id: doctor?._id,
        name: doctor?.name,
        specialty: doctor?.specialty,
        image: doctor?.image
      },
      patientName: formData.patientName,
      gender: formData.gender,
      phone: formData.phone,
      date: formData.appointmentDate, 
      time: formData.appointmentTime,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        toast.success('🚀 Appointment booked successfully!');
        onClose();
        router.push('/dashboard'); 
        router.refresh(); 
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Booking failed!');
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error('Connection error! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all">
      <div className="bg-white rounded-[2rem] max-w-md w-full p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
            <p className="text-[#0055CC] font-semibold mt-1">
              {doctor?.name} <span className="text-gray-300 mx-1">|</span> {doctor?.specialty}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Patient Name */}
          <div>
            <label className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-1.5 block ml-1">Patient Name</label>
            <input 
              type="text" 
              name="patientName"
              placeholder="Enter full name" 
              required
              value={formData.patientName}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-2 ring-blue-100 border-blue-100 outline-none transition-all bg-gray-50/50" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Gender */}
            <div>
              <label className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-1.5 block ml-1">Gender</label>
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-2 ring-blue-100 outline-none bg-gray-50/50 cursor-pointer">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* Phone */}
            <div>
              <label className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-1.5 block ml-1">Phone</label>
              <input 
                type="tel" 
                name="phone"
                placeholder="017XXXXXXXX" 
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-2 ring-blue-100 outline-none bg-gray-50/50" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-1.5 block ml-1">Date</label>
              <input 
                type="date" 
                name="appointmentDate"
                required
                value={formData.appointmentDate}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-2 ring-blue-100 outline-none bg-gray-50/50 cursor-pointer" 
              />
            </div>
            {/* Time */}
            <div>
              <label className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-1.5 block ml-1">Time</label>
              <input 
                type="time" 
                name="appointmentTime"
                required
                value={formData.appointmentTime}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-2 ring-blue-100 outline-none bg-gray-50/50 cursor-pointer" 
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-4 border border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className={`flex-1 py-4 bg-[#0055CC] text-white rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#0044aa] hover:shadow-blue-200'}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;