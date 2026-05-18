"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, Calendar, Clock } from 'lucide-react';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      router.push('/login');
      return;
    }

    fetchBookings(userId);
  }, []);

  const fetchBookings = async (userId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        headers: {
          'user-id': userId
        }
      });
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Failed to load bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("আপনি কি এই অ্যাপয়েন্টমেন্ট ডিলিট করতে চান?")) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
        method: 'DELETE'
      });

      setBookings(bookings.filter(booking => booking._id !== id));
      alert("✅ Appointment deleted successfully!");
    } catch (error) {
      alert("Failed to delete appointment");
    }
  };

  const openEditModal = (booking) => {
    setEditingBooking({ ...booking });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingBooking) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${editingBooking._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBooking)
      });

      alert("✅ Appointment updated successfully!");
      setEditingBooking(null);
      fetchBookings(localStorage.getItem('userId'));
    } catch (error) {
      alert("Failed to update appointment");
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading your appointments...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-10">Manage your appointments</p>

        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Calendar className="text-[#0055CC]" /> My Bookings
          </h2>

          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-400">No appointments yet</p>
              <p className="text-gray-500 mt-2">Book your first appointment from doctors list</p>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-900">
                        {booking.doctor?.name || "Doctor"}
                      </h3>
                      <p className="text-[#0055CC] font-medium">
                        {booking.doctor?.specialty}
                      </p>

                      <div className="mt-4 space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          👤 <strong>Patient:</strong> {booking.patientName}
                        </p>
                        <p className="flex items-center gap-2">
                          <Calendar size={16} /> <strong>Date:</strong> {booking.date}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock size={16} /> <strong>Time:</strong> {booking.time}
                        </p>
                        {booking.reason && (
                          <p><strong>Reason:</strong> {booking.reason}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 self-start">
                      <button
                        onClick={() => openEditModal(booking)}
                        className="flex items-center gap-2 px-5 py-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition"
                      >
                        <Edit size={18} /> Update
                      </button>
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="flex items-center gap-2 px-5 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition"
                      >
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

      {/* Update Modal */}
      {editingBooking && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Update Appointment</h2>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="block text-sm mb-1">Patient Name</label>
                <input
                  type="text"
                  value={editingBooking.patientName}
                  onChange={(e) => setEditingBooking({ ...editingBooking, patientName: e.target.value })}
                  className="w-full px-4 py-3 border rounded-2xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Date</label>
                  <input
                    type="date"
                    value={editingBooking.date}
                    onChange={(e) => setEditingBooking({ ...editingBooking, date: e.target.value })}
                    className="w-full px-4 py-3 border rounded-2xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Time</label>
                  <input
                    type="time"
                    value={editingBooking.time}
                    onChange={(e) => setEditingBooking({ ...editingBooking, time: e.target.value })}
                    className="w-full px-4 py-3 border rounded-2xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Reason</label>
                <textarea
                  value={editingBooking.reason || ''}
                  onChange={(e) => setEditingBooking({ ...editingBooking, reason: e.target.value })}
                  className="w-full px-4 py-3 border rounded-2xl h-28"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setEditingBooking(null)}
                  className="flex-1 py-3 border rounded-2xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#0055CC] text-white rounded-2xl font-medium hover:bg-[#0044aa]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;