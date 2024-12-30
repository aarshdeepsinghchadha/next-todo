"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Signup() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false); // Loading state
    const router = useRouter();

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValidEmail(form.email)) {
            toast.error("Please enter a valid email.");
            return;
        }
        if (form.password.length < 6) { 
            toast.error("Password must be at least 6 characters long.");
            return;
        }
        if (!form.name) {
            toast.error("Name is required");
            return;
        }

        setLoading(true); // Start loading

        try {
            await axios.post("/api/auth/user/signup", form);
            toast.success("Signup successful! Redirecting...");
            setTimeout(() => router.push("/auth/signin"), 1500);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-6 bg-zinc-800 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-black"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-black"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-black"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button
                        type="submit"
                        className={`w-full p-3 text-white rounded-lg ${loading ? "bg-gray-400 cursor-wait" : "bg-blue-500 hover:bg-blue-600"}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
