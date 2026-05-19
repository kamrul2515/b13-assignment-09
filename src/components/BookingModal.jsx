"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length < 11) {
      return toast.error("Enter valid phone number");
    }

    try {
      setLoading(true);

      const userEmail =
  typeof window !== "undefined"
    ? localStorage.getItem("userEmail")
    : null;

if (!userEmail) {
  toast.error("Please login first");
  return;
}


      const bookingData = {
        userEmail,

        doctorId: doctor._id,
        doctorName: doctor.name,
        doctorImage: doctor.image,
        specialty: doctor.specialty,

        patientName: formData.patientName,
        gender: formData.gender,
        phone: formData.phone,

        date: formData.appointmentDate,
        time: formData.appointmentTime,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message);
      }

      toast.success("Appointment booked successfully");

      onClose();
      router.push("/dashboard");
      router.refresh();

    } catch (error) {
      console.log(error);

      toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">

      <div className="bg-white rounded-3xl p-8 w-full max-w-lg">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Book Appointment
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            required
            value={formData.patientName}
            onChange={handleChange}
            className="w-full border rounded-2xl px-4 py-3"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-2xl px-4 py-3"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-2xl px-4 py-3"
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="date"
              name="appointmentDate"
              required
              value={formData.appointmentDate}
              onChange={handleChange}
              className="border rounded-2xl px-4 py-3"
            />

            <input
              type="time"
              name="appointmentTime"
              required
              value={formData.appointmentTime}
              onChange={handleChange}
              className="border rounded-2xl px-4 py-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0055CC] text-white py-4 rounded-2xl font-bold"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;