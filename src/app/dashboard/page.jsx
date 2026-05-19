"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import {
  Edit,
  Trash2,
  CalendarDays,
  Clock3,
  X,
} from "lucide-react";

import { toast } from "react-toastify";

const Dashboard = () => {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // EDIT MODAL
  const [showModal, setShowModal] = useState(false);

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [editLoading, setEditLoading] =
    useState(false);

  const [editForm, setEditForm] = useState({
    patientName: "",
    gender: "Male",
    phone: "",
    date: "",
    time: "",
  });

  // FETCH BOOKINGS
  const fetchBookings = async () => {

    try {

      setLoading(true);

      const userEmail =
        typeof window !== "undefined"
          ? localStorage.getItem("userEmail")
          : null;

      if (!userEmail) {

        setBookings([]);

        setLoading(false);

        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${userEmail}`
      );

      const data = await res.json();

      if (res.ok) {

        setBookings(data);

      } else {

        setBookings([]);

        toast.error(
          data?.message ||
            "Failed to fetch bookings"
        );
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load appointments"
      );

    } finally {

      setLoading(false);
    }
  };

  // AUTO FETCH
  useEffect(() => {

    fetchBookings();

    // TAB FOCUS AUTO REFRESH
    const handleFocus = () => {
      fetchBookings();
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

    return () => {
      window.removeEventListener(
        "focus",
        handleFocus
      );
    };

  }, []);

  // DELETE BOOKING
  const handleDelete = async (id) => {

    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {

        toast.success(
          "Appointment cancelled"
        );

        setBookings((prev) =>
          prev.filter(
            (booking) =>
              booking._id !== id
          )
        );

      } else {

        toast.error(
          data?.message ||
            "Delete failed"
        );
      }

    } catch (error) {

      console.log(error);

      toast.error("Delete failed");
    }
  };

  // OPEN EDIT MODAL
  const handleEditClick = (booking) => {

    setSelectedBooking(booking);

    setEditForm({
      patientName:
        booking?.patientName || "",
      gender: booking?.gender || "Male",
      phone: booking?.phone || "",
      date: booking?.date || "",
      time: booking?.time || "",
    });

    setShowModal(true);
  };

  // INPUT CHANGE
  const handleChange = (e) => {

    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE BOOKING
  const handleUpdateBooking = async (
    e
  ) => {

    e.preventDefault();

    if (
      editForm.phone.length < 11
    ) {
      return toast.error(
        "Enter valid phone number"
      );
    }

    try {

      setEditLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${selectedBooking._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            editForm
          ),
        }
      );

      const data = await res.json();

      if (res.ok) {

        toast.success(
          "Appointment updated"
        );

        // UI UPDATE
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id ===
            selectedBooking._id
              ? {
                  ...booking,
                  ...editForm,
                }
              : booking
          )
        );

        setShowModal(false);

      } else {

        toast.error(
          data?.message ||
            "Update failed"
        );
      }

    } catch (error) {

      console.log(error);

      toast.error("Update failed");

    } finally {

      setEditLoading(false);
    }
  };

  // LOADING
  if (loading) {

    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-50">

        <span className="loading loading-spinner loading-lg text-[#0055CC]"></span>

        <p className="mt-4 text-gray-500 font-medium">
          Loading Appointments...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12">

        <div className="container mx-auto px-4">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

            <div>

              <h1 className="text-4xl font-extrabold text-gray-900">
                My Appointments
              </h1>

              <p className="text-gray-500 mt-2">
                Manage all your doctor appointments
              </p>
            </div>

            <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border">

              <h3 className="text-gray-500 text-sm font-medium">
                Total Bookings
              </h3>

              <p className="text-3xl font-bold text-[#0055CC] mt-1">
                {bookings.length}
              </p>
            </div>
          </div>

          {/* EMPTY */}
          {bookings.length === 0 ? (

            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border">

              <div className="w-24 h-24 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-6">

                <CalendarDays
                  size={40}
                  className="text-[#0055CC]"
                />
              </div>

              <h2 className="text-3xl font-bold text-gray-800">
                No Appointments Found
              </h2>

              <p className="text-gray-500 mt-3">
                You have not booked any appointment yet.
              </p>
            </div>

          ) : (

            <div className="grid gap-6">

              {bookings.map((booking) => (

                <div
                  key={booking._id}
                  className="bg-white rounded-3xl p-6 shadow-sm border hover:shadow-lg transition-all"
                >

                  <div className="flex flex-col lg:flex-row justify-between gap-6">

                    {/* LEFT */}
                    <div className="flex flex-col sm:flex-row gap-5">

                      {/* IMAGE */}
                      <div className="relative w-full sm:w-32 h-32 rounded-3xl overflow-hidden bg-gray-100">

                        <Image
                          src={
                            booking?.doctorImage ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          alt={
                            booking?.doctorName
                          }
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>

                      {/* INFO */}
                      <div className="flex flex-col justify-center">

                        <h2 className="text-2xl font-bold text-gray-900">
                          {
                            booking?.doctorName
                          }
                        </h2>

                        <p className="text-[#0055CC] font-semibold mt-2">
                          {
                            booking?.specialty
                          }
                        </p>

                        <div className="mt-4 space-y-2">

                          <p className="text-gray-600">
                            <span className="font-semibold">
                              Patient:
                            </span>{" "}
                            {
                              booking?.patientName
                            }
                          </p>

                          <div className="flex items-center gap-2 text-gray-600">

                            <CalendarDays size={18} />

                            <span>
                              {
                                booking?.date
                              }
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-600">

                            <Clock3 size={18} />

                            <span>
                              {
                                booking?.time
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex items-center gap-3">

                      <button
                        onClick={() =>
                          handleEditClick(
                            booking
                          )
                        }
                        className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold"
                      >

                        <Edit size={18} />

                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            booking._id
                          )
                        }
                        className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 font-semibold"
                      >

                        <Trash2 size={18} />

                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {showModal && (

        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center px-4">

          <div className="bg-white w-full max-w-lg rounded-3xl p-8">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">

              <h2 className="text-3xl font-bold">
                Edit Appointment
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="text-gray-500 hover:text-black"
              >
                <X size={28} />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={
                handleUpdateBooking
              }
              className="space-y-5"
            >

              {/* DOCTOR */}
              <div>

                <label className="block mb-2 font-semibold">
                  Doctor Name
                </label>

                <input
                  type="text"
                  disabled
                  value={
                    selectedBooking?.doctorName ||
                    ""
                  }
                  className="w-full border bg-gray-100 rounded-2xl px-4 py-3 cursor-not-allowed"
                />
              </div>

              {/* PATIENT */}
              <div>

                <label className="block mb-2 font-semibold">
                  Patient Name
                </label>

                <input
                  type="text"
                  name="patientName"
                  value={
                    editForm.patientName
                  }
                  onChange={handleChange}
                  required
                  className="w-full border rounded-2xl px-4 py-3"
                />
              </div>

              {/* GENDER */}
              <div>

                <label className="block mb-2 font-semibold">
                  Gender
                </label>

                <select
                  name="gender"
                  value={editForm.gender}
                  onChange={handleChange}
                  className="w-full border rounded-2xl px-4 py-3"
                >
                  <option>Male</option>

                  <option>Female</option>

                  <option>Other</option>
                </select>
              </div>

              {/* PHONE */}
              <div>

                <label className="block mb-2 font-semibold">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-2xl px-4 py-3"
                />
              </div>

              {/* DATE TIME */}
              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="block mb-2 font-semibold">
                    Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={editForm.date}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-2xl px-4 py-3"
                  />
                </div>

                <div>

                  <label className="block mb-2 font-semibold">
                    Time
                  </label>

                  <input
                    type="time"
                    name="time"
                    value={editForm.time}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-2xl px-4 py-3"
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={editLoading}
                className="w-full bg-[#0055CC] text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all"
              >
                {editLoading
                  ? "Updating..."
                  : "Update Appointment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;