"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    FileText,
    Settings,
    LogOut,
    BarChart3
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // If we are on the login page (or any path that shouldn't show the dashboard layout)
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    const navItems = [
        { label: "Overview", href: "/admin", icon: <LayoutDashboard size={20} /> },
        { label: "Products", href: "/admin/products", icon: <Package size={20} /> },
        { label: "Blog Posts", href: "/admin/blogs", icon: <FileText size={20} /> },
        { label: "Analytics", href: "/admin/analytics", icon: <BarChart3 size={20} /> },
        { label: "Settings", href: "/admin/settings", icon: <Settings size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-brand-bg overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-brand-primary/10 flex flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b border-brand-primary/10">
                    <span className="font-bold text-xl text-brand-secondary">Offlora Admin</span>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive
                                            ? "bg-brand-secondary/10 text-brand-secondary"
                                            : "text-brand-text/60 hover:text-brand-text hover:bg-brand-bg"
                                        }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-brand-primary/10">
                    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Header Placeholder (for Mobile menu toggle etc) */}
                <header className="h-16 bg-white border-b border-brand-primary/10 flex items-center px-6 md:hidden">
                    <span className="font-bold text-lg text-brand-secondary">Offlora Admin</span>
                </header>

                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
