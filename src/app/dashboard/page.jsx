"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, Calendar, Clock, User, X } from 'lucide-react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);
  const router = useRouter();

  const fetchBookings = useCallback(async () => {
    // Tomar login system jodi email-ta localStorage e 'userEmail' name e rakhe
    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
    
    if (!userEmail) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        headers: { 'user-id': userEmail } // Backend e user-id header e email pathacchi
      });
      
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Could not load appointments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setBookings(prev => prev.filter(b => b._id !== id));
        toast.success("Deleted!");
      }
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${editingBooking._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBooking)
      });
      if (res.ok) {
        toast.success("Updated!");
        setEditingBooking(null);
        fetchBookings();
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Tomar design thik ache, ekhane bookings loop ta thakbe */}
      <div className="container mx-auto max-w-6xl">
         <h1 className="text-3xl font-bold mb-6">My Appointments</h1>
         <div className="grid gap-4">
           {bookings.map(booking => (
             <div key={booking._id} className="p-6 bg-white rounded-2xl shadow-sm flex justify-between">
                <div>
                  <h3 className="font-bold">{booking.doctorName || "Doctor"}</h3>
                  <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                </div>
                <div className="flex gap-2">
                   <button onClick={() => setEditingBooking(booking)} className="p-2 text-blue-600"><Edit size={20}/></button>
                   <button onClick={() => handleDelete(booking._id)} className="p-2 text-red-600"><Trash2 size={20}/></button>
                </div>
             </div>
           ))}
         </div>
      </div>
      
      {/* Modal logic ekhane thakbe jeta agei silo */}
    </div>
  );
};

export default Dashboard;