"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ImageIcon,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const SignUp = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    photoUrl: "",
    password: "",
  });

  // PASSWORD VALIDATION
  const hasMinLength = formData.password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasLowerCase = /[a-z]/.test(formData.password);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
  e.preventDefault();

  // PASSWORD VALIDATION
  if (!hasMinLength || !hasUpperCase || !hasLowerCase) {
    toast.error("Please fulfill password requirements");
    return;
  }

  try {
    setLoading(true);

    const userData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,

      image:
        formData.photoUrl ||
        "https://i.ibb.co/4pDNDk1/avatar.png",
    };

    // SIGNUP
    const response = await authClient.signUp.email(userData);

    console.log("Signup Success =>", response);

    // IMPORTANT FIX
    // signup korar sathe sathe email save hobe
    localStorage.setItem(
      "userEmail",
      formData.email
    );

    // AUTO LOGIN
    await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
    });

    toast.success("Account created successfully!");

    // CLEAR FORM
    setFormData({
      fullName: "",
      email: "",
      photoUrl: "",
      password: "",
    });

    router.push("/");
    router.refresh();

  } catch (error) {
    console.error("Signup Error =>", error);

    toast.error(
      error?.message ||
        error?.error?.message ||
        "Signup failed!"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center p-4">

      <div className="w-full max-w-6xl bg-white rounded-[40px] overflow-hidden shadow-2xl grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden md:flex relative bg-[#0055CC] p-12 flex-col justify-between overflow-hidden">

          <Image
            src="https://images.unsplash.com/photo-1666214276372-24e331683e78?q=80&w=1974&auto=format&fit=crop"
            alt="Healthcare"
            fill
            priority
            className="object-cover opacity-20"
          />

          <div className="relative z-10">
            <h2 className="text-5xl font-black text-white leading-tight">
              Join Our
              <br />
              Healthcare
              <br />
              Platform
            </h2>

            <div className="w-24 h-2 bg-blue-300 rounded-full mt-6"></div>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl">

            <h3 className="text-2xl font-bold text-white mb-4">
              Trusted by Thousands
            </h3>

            <p className="text-blue-100 leading-relaxed text-sm mb-6">
              Connect with experienced doctors and manage
              appointments easily from anywhere.
            </p>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <Image
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i}`}
                    alt="avatar"
                    width={45}
                    height={45}
                    className="rounded-full border-2 border-white"
                  />
                ))}
              </div>

              <p className="text-sm font-semibold text-blue-100">
                5000+ Active Users
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-14 flex flex-col justify-center">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2">
              Start your healthcare journey today.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* FULL NAME */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#0055CC] focus:bg-white transition"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
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
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#0055CC] focus:bg-white transition"
                />
              </div>
            </div>

            {/* IMAGE URL */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Photo URL
              </label>

              <div className="relative">
                <ImageIcon
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="photoUrl"
                  placeholder="https://example.com/photo.jpg"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#0055CC] focus:bg-white transition"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#0055CC] focus:bg-white transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {/* PASSWORD REQUIREMENTS */}
              <div className="mt-4 space-y-2">

                <ValidationItem
                  label="At least 6 characters"
                  isValid={hasMinLength}
                />

                <ValidationItem
                  label="One uppercase letter"
                  isValid={hasUpperCase}
                />

                <ValidationItem
                  label="One lowercase letter"
                  isValid={hasLowerCase}
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0055CC] hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition disabled:opacity-70"
            >
              {loading ? "Registering..." : "Create Account"}

              <ArrowRight size={20} />
            </button>
          </form>

          {/* DIVIDER */}
          <div className="relative my-8">

            <div className="border-t border-gray-200"></div>

            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 text-xs font-bold text-gray-400 uppercase">
              Or Continue With
            </span>
          </div>

          {/* GOOGLE */}
          <button
            type="button"
            onClick={async () => {
              try {
                await authClient.signIn.social({
                  provider: "google",
                });
              } catch (error) {
                console.log(error);
                toast.error("Google Sign In Failed");
              }
            }}
            className="w-full py-4 border border-gray-200 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition"
          >
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              width={22}
              height={22}
            />

            Continue with Google
          </button>

          {/* LOGIN */}
          <p className="text-center mt-8 text-gray-500 font-medium">
            Already have an account?

            <Link
              href="/login"
              className="text-[#0055CC] font-bold ml-2 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// VALIDATION COMPONENT
const ValidationItem = ({ label, isValid }) => (
  <div
    className={`flex items-center gap-2 text-sm font-medium ${
      isValid ? "text-green-600" : "text-gray-400"
    }`}
  >
    {isValid ? (
      <CheckCircle2 size={16} />
    ) : (
      <XCircle size={16} className="text-red-400" />
    )}

    {label}
  </div>
);

export default SignUp;