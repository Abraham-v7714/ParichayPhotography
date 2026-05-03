"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER || "admin";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple client-side check (swap with server-side session in production)
    if (username === "admin" && password === "parichay2024") {
      localStorage.setItem("parichay_admin", "true");
      toast.success("Welcome back!");
      router.push("/admin/dashboard");
    } else {
      toast.error("Invalid credentials.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center mx-auto mb-4">
            <span className="font-serif text-2xl font-bold text-stone-950">P</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-50">Admin Access</h1>
          <p className="text-stone-500 text-sm mt-2">Parichay Photography — Control Panel</p>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-sm p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-stone-400 text-xs tracking-widest uppercase mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full bg-stone-800 border border-stone-700 focus:border-amber-500 text-stone-50 placeholder-stone-600 rounded-sm px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-stone-400 text-xs tracking-widest uppercase mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-stone-800 border border-stone-700 focus:border-amber-500 text-stone-50 placeholder-stone-600 rounded-sm px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-stone-950 font-semibold tracking-wider uppercase text-sm rounded-sm transition-all duration-300"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
        <p className="text-stone-600 text-xs text-center mt-6">
          Default: admin / parichay2024 — Change in .env.local
        </p>
      </motion.div>
    </div>
  );
}
