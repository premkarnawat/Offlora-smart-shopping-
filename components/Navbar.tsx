"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { User, LogOut, Menu, X, Search } from "lucide-react";
import { useState } from "react";

export function Navbar() {
    const { user, loading, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 glass border-b border-brand-primary/10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-bold text-2xl text-brand-secondary tracking-tight">
                    Offlora
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/products" className="text-brand-text/80 hover:text-brand-secondary transition-colors font-medium">
                        Products
                    </Link>
                    <Link href="/blog" className="text-brand-text/80 hover:text-brand-secondary transition-colors font-medium">
                        Blog
                    </Link>
                    <div className="relative group">
                        <button className="text-brand-text/80 hover:text-brand-secondary transition-colors font-medium flex items-center gap-1">
                            Categories
                        </button>
                        {/* Simple dropdown placeholder */}
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-soft border border-brand-primary/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <Link href="/products?category=home" className="block px-4 py-2 hover:bg-brand-bg rounded-t-xl text-sm">Home & Living</Link>
                            <Link href="/products?category=tech" className="block px-4 py-2 hover:bg-brand-bg text-sm">Tech Accessories</Link>
                            <Link href="/products?category=beauty" className="block px-4 py-2 hover:bg-brand-bg rounded-b-xl text-sm">Beauty</Link>
                        </div>
                    </div>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    <button className="p-2 text-brand-text/60 hover:text-brand-secondary transition-colors" aria-label="Search">
                        <Search size={20} />
                    </button>

                    {!loading && (
                        user ? (
                            <div className="flex items-center gap-4">
                                <Link href="/account" className="flex items-center gap-2 text-sm font-medium text-brand-secondary hover:underline">
                                    <User size={18} />
                                    My Account
                                </Link>
                                <button onClick={logout} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Logout">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="px-5 py-2 bg-brand-secondary text-white rounded-full font-medium hover:bg-brand-secondary/90 transition-colors shadow-sm">
                                Sign In
                            </Link>
                        )
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-brand-text"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-brand-primary/10 absolute w-full shadow-soft">
                    <div className="flex flex-col px-4 py-6 space-y-4">
                        <Link href="/products" className="text-lg font-medium text-brand-text" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
                        <Link href="/blog" className="text-lg font-medium text-brand-text" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                        <hr className="border-brand-primary/10" />
                        {!loading && user ? (
                            <>
                                <Link href="/account" className="text-lg font-medium text-brand-secondary" onClick={() => setIsMobileMenuOpen(false)}>My Account</Link>
                                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-left text-lg font-medium text-red-500">Logout</button>
                            </>
                        ) : (
                            <Link href="/login" className="text-lg font-medium text-brand-secondary" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
