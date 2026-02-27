"use client";

import { Users, MousePointerClick, TrendingUp, ShoppingBag } from "lucide-react";

export default function AdminDashboardOverview() {
    const kpis = [
        { label: "Total Visitors", value: "24,591", change: "+12%", icon: <Users size={24} className="text-blue-500" /> },
        { label: "Affiliate Clicks", value: "1,204", change: "+5%", icon: <MousePointerClick size={24} className="text-purple-500" /> },
        { label: "Conversion Rate", value: "4.8%", change: "-1%", icon: <TrendingUp size={24} className="text-green-500" /> },
        { label: "Active Products", value: "84", change: "+10", icon: <ShoppingBag size={24} className="text-brand-secondary" /> },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-brand-text">Dashboard Overview</h1>
                <p className="text-brand-text/60 mt-1">Welcome back. Here's what's happening on Offlora today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {kpis.map((kpi, i) => (
                    <div key={i} className="glass p-6 rounded-2xl bg-white border border-brand-primary/10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-brand-bg rounded-xl">
                                {kpi.icon}
                            </div>
                            <span className={`text-sm font-medium ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                {kpi.change}
                            </span>
                        </div>
                        <h3 className="text-brand-text/60 text-sm font-medium">{kpi.label}</h3>
                        <p className="text-2xl font-bold text-brand-text mt-1">{kpi.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass p-6 rounded-2xl bg-white border border-brand-primary/10 min-h-[400px]">
                    <h3 className="font-bold text-brand-text mb-4">Traffic Source: Pinterest vs Direct</h3>
                    <div className="flex items-center justify-center h-[300px] border-2 border-dashed border-brand-primary/20 rounded-xl">
                        <span className="text-brand-text/40 font-medium">[Chart Component Placeholder]</span>
                    </div>
                </div>
                <div className="lg:col-span-1 glass p-6 rounded-2xl bg-white border border-brand-primary/10 min-h-[400px]">
                    <h3 className="font-bold text-brand-text mb-4">Top Performing Products</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-brand-bg rounded-xl transition-colors cursor-pointer border border-transparent hover:border-brand-primary/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-brand-primary/20 rounded-lg"></div>
                                    <div>
                                        <h4 className="text-sm font-medium text-brand-text">Aesthetic Vase {i}</h4>
                                        <span className="text-xs text-brand-text/50">Amazon</span>
                                    </div>
                                </div>
                                <span className="font-bold text-sm text-brand-secondary">{120 - i * 10} Clicks</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
