"use client";

import { useState } from "react";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Mock login for now
        setTimeout(() => {
            setLoading(false);
            // In a real app, this would hit /api/admin/login and set an admin JWT cookie
            router.push("/admin");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
            <div className="glass w-full max-w-md p-8 rounded-3xl bg-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-brand-secondary/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-24 h-24 bg-brand-primary/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="text-center mb-8 relative z-10">
                    <h1 className="text-2xl font-bold text-brand-secondary tracking-tight mb-2">Offlora Admin</h1>
                    <p className="text-brand-text/60 text-sm">Sign in to the super control panel</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4 relative z-10">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-brand-text/40" />
                        </div>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Admin Email"
                            className="block w-full pl-11 pr-4 py-3 border border-brand-primary/20 rounded-xl bg-brand-bg/50 focus:bg-white text-brand-text focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all outline-none"
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-brand-text/40" />
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="block w-full pl-11 pr-4 py-3 border border-brand-primary/20 rounded-xl bg-brand-bg/50 focus:bg-white text-brand-text focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !email || !password}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-brand-text hover:bg-black shadow-md disabled:opacity-70 transition-all mt-6"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <>Access Dashboard <ArrowRight className="ml-2 h-4 w-4" /></>}
                    </button>
                </form>
            </div>
        </div>
    );
}
