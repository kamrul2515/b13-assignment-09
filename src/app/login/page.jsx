"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const Login = () => {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // HYDRATION FIX
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Login Attempt =>", formData);

      const { data, error } =
        await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
        });

      console.log("Response =>", data);

      if (error) {
        console.log("Login Error =>", error);

        toast.error(
          error.message || "Invalid credentials"
        );

        return;
      }

      toast.success("Login successful!");

      localStorage.setItem(
        "userEmail",
        formData.email
      );

      router.push("/");
    } catch (err) {
      console.log("Catch Error =>", err);

      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      console.log(error);

      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">

      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden max-w-[500px] w-full p-8 md:p-12">

        {/* HEADER */}
        <header className="text-center mb-10">

          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Login to continue your healthcare journey.
          </p>
        </header>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* EMAIL */}
          <div>

            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
              Email Address
            </label>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                <Mail size={20} />

              </span>

              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-100 focus:border-[#0055CC] outline-none transition-all"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>

            <div className="flex justify-between items-center mb-2 ml-1">

              <label className="text-sm font-bold text-gray-700">
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-xs font-bold text-[#0055CC] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                <Lock size={20} />

              </span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-100 focus:border-[#0055CC] outline-none transition-all"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0055CC] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all disabled:bg-gray-400 mt-8"
          >

            {loading
              ? "Logging in..."
              : "Log in"}

            <ArrowRight size={20} />
          </button>
        </form>

        {/* DIVIDER */}
        <div className="mt-8">

          <div className="relative flex items-center justify-center mb-6">

            <div className="border-t border-gray-100 w-full"></div>

            <span className="absolute bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              Or continue with
            </span>
          </div>

          {/* GOOGLE */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-4 border border-gray-200 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all text-gray-700"
          >

            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              width={20}
              height={20}
            />

            Continue with Google
          </button>
        </div>

        {/* FOOTER */}
        <p className="text-center mt-8 text-gray-500 font-medium">

          Don't have an account?

          <Link
            href="/signup"
            className="text-[#0055CC] font-bold hover:underline ml-2"
          >
            Register
          </Link>
        </p>

        {/* SECURITY */}
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">

          <ShieldCheck
            size={14}
            className="text-green-500"
          />

          Secured Login
        </div>
      </div>
    </div>
  );
};

export default Login;