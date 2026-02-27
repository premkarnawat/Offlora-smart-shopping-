"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, KeyRound, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "./AuthProvider";

export interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    title?: string;
}

export function AuthModal({ isOpen, onClose, onSuccess, title = "Sign In" }: AuthModalProps) {
    const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { refreshUser } = useAuth();

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (res.ok) {
                setStep("OTP");
            } else {
                setError(data.error || "Failed to send code.");
            }
        } catch {
            setError("An error occurred. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp) return;
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp })
            });
            const data = await res.json();
            if (res.ok) {
                await refreshUser();
                onSuccess();
                onClose();
                // Reset state after closing
                setTimeout(() => { setStep("EMAIL"); setEmail(""); setOtp(""); }, 500);
            } else {
                setError(data.error || "Invalid code.");
            }
        } catch {
            setError("An error occurred. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-brand-text/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] z-10 my-auto"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-brand-text/50 hover:text-brand-text bg-brand-bg rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-brand-text mb-2">{title}</h2>
                            <p className="text-brand-text/70 text-sm">
                                {step === "EMAIL" ? "We use passwordless login. Enter your email to get a code." : `We sent a code to ${email}`}
                            </p>
                        </div>

                        {error && (
                            <div className="px-4 py-3 bg-red-50 text-red-600 rounded-xl text-sm mb-6 border border-red-100 flex items-center justify-center">
                                {error}
                            </div>
                        )}

                        {step === "EMAIL" ? (
                            <form onSubmit={handleSendOtp} className="space-y-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-brand-text/40" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="block w-full pl-11 pr-4 py-4 border border-brand-primary/20 rounded-2xl bg-brand-bg/50 focus:bg-white text-brand-text focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all outline-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading || !email}
                                    className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-2xl text-base font-semibold text-white bg-brand-secondary hover:bg-brand-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary shadow-lg disabled:opacity-70 transition-all"
                                >
                                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <>Send Code <ArrowRight className="ml-2 h-5 w-5" /></>}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleVerifyOtp} className="space-y-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <KeyRound className="h-5 w-5 text-brand-text/40" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').substring(0, 6))}
                                        placeholder="6-digit code"
                                        className="block w-full pl-11 pr-4 py-4 border border-brand-primary/20 rounded-2xl bg-brand-bg/50 focus:bg-white text-brand-text focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all outline-none tracking-widest text-lg font-mono text-center"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading || otp.length < 6}
                                    className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-2xl text-base font-semibold text-white bg-brand-secondary hover:bg-brand-secondary/90 shadow-lg disabled:opacity-70 transition-all"
                                >
                                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Verify & Sign In"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep("EMAIL")}
                                    disabled={loading}
                                    className="w-full py-2 text-sm text-brand-text/60 hover:text-brand-text mt-2 transition-colors"
                                >
                                    Edit email address
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
