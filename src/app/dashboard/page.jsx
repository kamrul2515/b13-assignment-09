"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, Calendar, Clock, User, MessageSquare, X } from 'lucide-react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);
  const router = useRouter();

  const fetchBookings = useCallback(async () => {
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    if (!userId) return;

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        headers: { 'user-id': userId }
      });
      
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load bookings", error);
      toast.error("Could not load appointments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      router.push('/login');
      return;
    }
    fetchBookings();
  }, [fetchBookings, router]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setBookings(prev => prev.filter(booking => booking._id !== id));
        toast.success("✅ Deleted successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const openEditModal = (booking) => {
    setEditingBooking({ ...booking });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingBooking) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${editingBooking._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBooking)
      });

      if (res.ok) {
        toast.success("✅ Updated successfully!");
        setEditingBooking(null);
        fetchBookings(); 
      } else {
        toast.error("Update failed on server");
      }
    } catch (error) {
      toast.error("Failed to update appointment");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#0055CC]"></div>
        <p className="mt-4 text-gray-500 font-medium">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage your medical appointments</p>
        </header>

        <div className="bg-white rounded-4xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Calendar className="text-[#0055CC]" size={28} /> My Bookings
            </h2>
            <span className="bg-blue-50 text-[#0055CC] px-4 py-1 rounded-full text-sm font-bold">
              {bookings.length} Total
            </span>
          </div>

          <div className="p-8">
            {bookings.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-xl font-bold text-gray-400">No appointments yet</p>
                <button onClick={() => router.push('/')} className="mt-4 px-6 py-2 bg-[#0055CC] text-white rounded-lg">Book Now</button>
              </div>
            ) : (
              <div className="grid gap-6">
                {bookings.map((booking) => (
                  <div key={booking._id} className="border border-gray-100 bg-white rounded-2xl p-6 hover:shadow-lg transition-all">
                    <div className="flex flex-col lg:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="font-bold text-2xl text-gray-900">{booking.doctor?.name || "Specialist Doctor"}</h3>
                        <p className="text-[#0055CC] font-semibold">{booking.doctor?.specialty}</p>
                        
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-xl">
                            <User size={16} className="text-blue-500" />
                            <span className="text-sm"><strong>Patient:</strong> {booking.patientName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-xl">
                            <Calendar size={16} className="text-blue-500" />
                            <span className="text-sm"><strong>Date:</strong> {booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-xl">
                            <Clock size={16} className="text-blue-500" />
                            <span className="text-sm"><strong>Time:</strong> {booking.time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex lg:flex-col gap-3 justify-center">
                        <button onClick={() => openEditModal(booking)} className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-50 text-[#0055CC] rounded-xl font-bold hover:bg-blue-100 transition-all">
                          <Edit size={18} /> Update
                        </button>
                        <button onClick={() => handleDelete(booking._id)} className="flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-all">
                          <Trash2 size={18} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- UPDATE MODAL --- */}
      {editingBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-4xl p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setEditingBooking(null)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-600">
                <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Update Appointment</h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Patient Name</label>
                <input
                  type="text"
                  value={editingBooking.patientName}
                  onChange={(e) => setEditingBooking({ ...editingBooking, patientName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 ring-blue-100 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Date</label>
                  <input
                    type="date"
                    value={editingBooking.date}
                    onChange={(e) => setEditingBooking({ ...editingBooking, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 ring-blue-100 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Time</label>
                  <input
                    type="time"
                    value={editingBooking.time}
                    onChange={(e) => setEditingBooking({ ...editingBooking, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 ring-blue-100 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <button type="button" onClick={() => setEditingBooking(null)} className="flex-1 py-4 border border-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-[#0055CC] text-white rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-95 transition-all">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;