"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CheckCircle2, XCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { authClient } from "@/lib/auth-client"; 

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    photoUrl: '',
    password: ''
  });

  const hasMinLength = formData.password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasLowerCase = /[a-z]/.test(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasMinLength || !hasUpperCase || !hasLowerCase) {
      toast.error("Please fulfill password requirements");
      return;
    }

    await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.fullName,
      image: formData.photoUrl,
    }, {
      onRequest: () => setLoading(true),
      onResponse: () => setLoading(false),
      onError: (ctx) => {
        toast.error(ctx.error.message || "Something went wrong!");
      },
      onSuccess: () => {
        toast.success("Account created successfully!");
        router.push('/login');
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row min-h-175">
        
        {/* Left Side: Brand Background */}
        <div className="md:w-1/2 bg-[#0042A5] relative p-12 text-white hidden md:flex flex-col justify-between overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1666214276372-24e331683e78?q=80&w=1974&auto=format&fit=crop"
            alt="Healthcare background"
            fill
            className="object-cover opacity-40" 
            priority
          />
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold tracking-tight uppercase">Register</h2>
            <div className="w-12 h-1.5 bg-blue-400 mt-4 rounded-full"></div>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-xl p-8 rounded-4xl border border-white/20">
            <h3 className="text-2xl font-bold mb-3">Join Our Network</h3>
            <p className="text-blue-50 leading-relaxed mb-6 text-sm">
              Connect with top-tier healthcare professionals and manage your health journey.
            </p>
            <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0042A5] bg-gray-300 relative overflow-hidden">
                            <Image 
                              src={`https://i.pravatar.cc/150?u=${i}`} 
                              alt="avatar" 
                              width={40} 
                              height={40} 
                              className="object-cover" 
                            />
                        </div>
                    ))}
                </div>
                <p className="text-sm font-medium text-blue-200">Trusted by 5,000+ Doctors</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white">
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h1>
            <p className="text-gray-500 mt-2">Start your healthcare journey today.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="Dr. Jane Smith"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 ring-blue-100 outline-none transition-all"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="jane.smith@healthcare.com"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 ring-blue-100 outline-none transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="pb-2">
              <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 ring-blue-100 outline-none transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              <div className="mt-4 space-y-2 ml-1">
                <ValidationItem label="At least 6 characters" isValid={hasMinLength} />
                <ValidationItem label="One uppercase letter" isValid={hasUpperCase} />
                <ValidationItem label="One lowercase letter" isValid={hasLowerCase} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0055CC] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all disabled:bg-gray-400"
            >
              {loading ? "Registering..." : "Register Account"} <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
                <div className="border-t border-gray-100 w-full"></div>
                <span className="absolute bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or sign up with</span>
            </div>

            <button 
              type="button"
              onClick={() => authClient.signIn.social({ provider: "google" })}
              className="w-full py-3.5 border border-gray-200 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all text-gray-700"
            >
              <Image 
                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                alt="google" 
                width={20} 
                height={20} 
              />
              Google
            </button>
          </div>

          <p className="text-center mt-8 text-gray-500 font-medium">
            Already have an account? <Link href="/login" className="text-[#0055CC] font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const ValidationItem = ({ label, isValid }) => (
  <div className={`flex items-center gap-2 text-xs font-bold uppercase ${isValid ? 'text-green-600' : 'text-gray-400'}`}>
    {isValid ? <CheckCircle2 size={14} /> : <XCircle size={14} className="text-red-400" />} {label}
  </div>
);

export default SignUp;