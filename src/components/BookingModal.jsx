"use client";
import React, { useState } from 'react';

const BookingModal = ({ doctor, onClose }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    gender: "Male",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingData = {
      userEmail: localStorage.getItem("userEmail") || "user@gmail.com",
      doctorName: doctor.name,
      patientName: formData.patientName,
      gender: formData.gender,
      phone: formData.phone,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        alert("✅ Appointment booked successfully!");
        onClose();
      }
    } catch (err) {
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8">
        <h2 className="text-2xl font-bold mb-6">Book Appointment</h2>
        <p className="mb-6 font-medium">{doctor.name} - {doctor.specialty}</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Patient Name" required
            onChange={(e) => setFormData({...formData, patientName: e.target.value})}
            className="w-full border rounded-xl px-4 py-3" />

          <select 
            onChange={(e) => setFormData({...formData, gender: e.target.value})}
            className="w-full border rounded-xl px-4 py-3">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input type="tel" placeholder="Phone Number" required
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full border rounded-xl px-4 py-3" />

          <div className="grid grid-cols-2 gap-4">
            <input type="date" required
              onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
              className="border rounded-xl px-4 py-3" />
            <input type="time" required
              onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
              className="border rounded-xl px-4 py-3" />
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 border rounded-2xl">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 py-3 bg-[#0055CC] text-white rounded-2xl">
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;