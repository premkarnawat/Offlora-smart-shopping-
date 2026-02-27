"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserCircle, LogOut, Settings, Clock, Link as LinkIcon, Edit2, Save } from "lucide-react";

export default function AccountPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "Demo User",
        phone: "+91 9876543210",
        email: ""
    });

    // Populate email when user loads
    useEffect(() => {
        if (user && !formData.email) {
            setFormData(prev => ({ ...prev, email: user.email }));
        }
    }, [user, formData.email]);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-secondary"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[70vh]">
            <h1 className="text-3xl font-bold text-brand-text mb-8">My Account</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Profile Stats Sidebar */}
                <div className="md:col-span-1 space-y-6">
                    <div className="glass p-6 rounded-3xl text-center">
                        <div className="w-24 h-24 bg-brand-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center text-brand-secondary">
                            <UserCircle size={48} />
                        </div>
                        <h2 className="font-semibold text-lg text-brand-text break-all">
                            {user.email}
                        </h2>
                        <p className="text-sm text-brand-text/60 mt-1 flex items-center justify-center gap-1">
                            <Clock size={14} /> Joined {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    <div className="glass p-4 rounded-2xl">
                        <nav className="space-y-2">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isEditing ? 'bg-brand-secondary text-white' : 'bg-brand-primary/10 text-brand-secondary'}`}
                            >
                                {isEditing ? <Save size={18} /> : <Settings size={18} />}
                                {isEditing ? "View Profile" : "Edit Profile"}
                            </button>
                            <button
                                onClick={logout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-brand-text/70 hover:text-red-600 transition-colors font-medium"
                            >
                                <LogOut size={18} /> Sign Out
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-2 space-y-6">

                    {/* Profile Information Form */}
                    <div className="glass p-8 rounded-3xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-brand-text">Personal Information</h3>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="text-brand-secondary text-sm font-medium hover:underline flex items-center gap-1"
                            >
                                {isEditing ? <><Save size={16} /> Save Changes</> : <><Edit2 size={16} /> Edit</>}
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-brand-text/70 text-left block">Full Name</label>
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 bg-white/50 focus:bg-white text-brand-text disabled:opacity-70 transition-colors outline-none focus:ring-2 disabled:bg-brand-bg focus:ring-brand-secondary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-brand-text/70 text-left block">Phone Number</label>
                                    <input
                                        type="tel"
                                        disabled={!isEditing}
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 bg-white/50 focus:bg-white text-brand-text disabled:opacity-70 transition-colors outline-none focus:ring-2 disabled:bg-brand-bg focus:ring-brand-secondary"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-brand-text/70 text-left block">Email Address</label>
                                <input
                                    type="email"
                                    disabled={true}
                                    value={formData.email}
                                    className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 bg-brand-bg text-brand-text/60 cursor-not-allowed"
                                />
                                <p className="text-xs text-brand-text/50">Email cannot be changed directly as it's used for login.</p>
                            </div>

                            {isEditing && (
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="w-full sm:w-auto mt-4 px-6 py-3 bg-brand-secondary text-white rounded-xl font-medium shadow-md hover:bg-brand-secondary/90 transition-colors"
                                >
                                    Save Profile Details
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="glass p-8 rounded-3xl">
                        <h3 className="text-xl font-bold text-brand-text mb-6">Recent Click History</h3>

                        <div className="space-y-4">
                            {/* Placeholder text since we don't have real click history fetched yet */}
                            <div className="p-4 border border-brand-primary/10 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-brand-bg rounded-xl flex items-center justify-center text-brand-secondary shrink-0">
                                        <LinkIcon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-brand-text">Aesthetic Ceramic Vase</h4>
                                        <p className="text-sm text-brand-text/60 hidden sm:block">Clicked Amazon Affiliate Link</p>
                                    </div>
                                </div>
                                <span className="text-xs text-brand-text/40 whitespace-nowrap ml-2">2 days ago</span>
                            </div>

                            <div className="p-4 border border-brand-primary/10 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-brand-bg rounded-xl flex items-center justify-center text-brand-secondary shrink-0">
                                        <LinkIcon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-brand-text">Minimalist Desk Organizer</h4>
                                        <p className="text-sm text-brand-text/60 hidden sm:block">Clicked Meesho Affiliate Link</p>
                                    </div>
                                </div>
                                <span className="text-xs text-brand-text/40 whitespace-nowrap ml-2">5 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
