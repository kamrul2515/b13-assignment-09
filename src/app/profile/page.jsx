"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Camera,
  Save,
  ShieldCheck,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const Profile = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    image: "",
  });

  // LOAD USER DATA
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user?.name || "",
        email: user?.email || "",
        image:
          user?.image ||
          "https://i.ibb.co/4pDNDk1/avatar.png",
      });
    }
  }, [user]);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE PROFILE
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // LOCAL UI UPDATE
      localStorage.setItem(
        "updatedProfile",
        JSON.stringify(profileData)
      );

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log(error);

      toast.error("Profile update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your personal information and account.
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">

          {/* TOP */}
          <div className="bg-gradient-to-r from-[#0055CC] to-blue-500 h-44 relative">

            <div className="absolute -bottom-16 left-10">

              <div className="relative w-32 h-32 rounded-full border-[6px] border-white overflow-hidden shadow-xl">

                <Image
                  src={profileData.image}
                  alt={profileData.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="pt-24 px-10 pb-10">

            {/* USER INFO */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900">
                {profileData.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {profileData.email}
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleUpdateProfile}
              className="grid md:grid-cols-2 gap-6"
            >

              {/* NAME */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 ring-blue-100"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    disabled
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-100 outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              {/* IMAGE */}
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Profile Image URL
                </label>

                <div className="relative">
                  <Camera
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="image"
                    value={profileData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 ring-blue-100"
                  />
                </div>
              </div>

              {/* BUTTON */}
              <div className="md:col-span-2 pt-4">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#0055CC] hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all"
                >
                  <Save size={20} />

                  {loading
                    ? "Updating..."
                    : "Save Changes"}
                </button>
              </div>
            </form>

            {/* SECURITY */}
            <div className="mt-10 flex items-center gap-2 text-sm text-gray-500">
              <ShieldCheck
                size={18}
                className="text-green-500"
              />

              Your profile information is securely stored.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;