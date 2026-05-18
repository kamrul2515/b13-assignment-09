"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { data, error } = await authClient.signIn.email({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    toast.error(error.message);
    return;
  }

  toast.success("Login successful!");

  localStorage.setItem("userEmail", formData.email);

  router.push("/");
};

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden max-w-125 w-full p-8 md:p-12">
        
        {/* Header Section */}
        <header className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Log in to manage your appointments and health records securely.
          </p>
        </header>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0055CC] transition-colors">
                <Mail size={20} />
              </span>
              <input
                type="email"
                placeholder="name@example.com"
                required
                className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 ring-blue-100 focus:bg-white focus:border-[#0055CC] outline-none transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="text-sm font-bold text-gray-700">Password</label>
              <Link href="/forgot-password" size={14} className="text-xs font-bold text-[#0055CC] hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0055CC] transition-colors">
                <Lock size={20} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 ring-blue-100 focus:bg-white focus:border-[#0055CC] outline-none transition-all"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0055CC] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-[0.98] disabled:bg-gray-400 mt-8"
          >
            {loading ? "Logging in..." : "Log in"} <ArrowRight size={20} />
          </button>
        </form>

        {/* Social Login Divider */}
        <div className="mt-8">
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-gray-100 w-full"></div>
            <span className="absolute bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              Or continue with
            </span>
          </div>

          <button className="w-full py-4 border border-gray-200 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all text-gray-700 shadow-sm">
            <Image 
              src="https://www.svgrepo.com/show/475656/google-color.svg" 
              alt="google" 
              width={20} 
              height={20} 
            />
            Login with Google
          </button>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-8 text-gray-500 font-medium">
          Don't have an account? <Link href="/signup" className="text-[#0055CC] font-bold hover:underline">Register</Link>
        </p>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
          <ShieldCheck size={14} className="text-green-500" />
          Secured by industry-standard 256-bit encryption
        </div>
      </div>
    </div>
  );
};

export default Login;