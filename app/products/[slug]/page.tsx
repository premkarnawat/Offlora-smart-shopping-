"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, XCircle, ShieldCheck, Truck, ExternalLink, Tag } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { AuthModal } from "@/components/AuthModal";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
    const { user } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // In a real app, fetch `product` from DB based on params.slug
    const mockAffiliateLink = "https://amazon.com/dp/B08X12345";

    const handleAffiliateClick = () => {
        if (!user) {
            setIsAuthModalOpen(true);
        } else {
            // User is logged in, redirect to affiliate link
            // In a real scenario, you'd trigger an Analytics Event API call here
            window.open(mockAffiliateLink, "_blank");
        }
    };

    return (
        <div className="bg-brand-bg/30 min-h-screen pb-24 md:pb-12">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 py-4 text-sm text-brand-text/60">
                <Link href="/" className="hover:text-brand-secondary">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/products" className="hover:text-brand-secondary">Products</Link>
                <span className="mx-2">/</span>
                <span className="text-brand-text">Aesthetic Ceramic Vase</span>
            </div>

            <div className="container mx-auto px-4">
                <div className="glass rounded-3xl overflow-hidden bg-white p-4 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">

                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-brand-bg/50 border border-brand-primary/10">
                                <Image
                                    src="/placeholder.jpg"
                                    alt="Product Title"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-brand-bg/50 border border-brand-primary/10 cursor-pointer hover:border-brand-secondary transition-colors">
                                        <Image src="/placeholder.jpg" alt="thumbnail" fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col">
                            <div className="mb-4">
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-secondary bg-brand-secondary/10 px-2 py-1 rounded-md mb-3 uppercase tracking-wider">
                                    <Tag size={12} /> Home Decor
                                </span>
                                <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-2 leading-tight">
                                    Aesthetic Ceramic Donut Vase Set
                                </h1>
                                <p className="text-brand-text/60 text-lg">Perfect for Pampas Grass & Dried Flowers.</p>
                            </div>

                            <div className="flex items-end gap-3 mb-8">
                                <span className="text-4xl font-extrabold text-brand-text">₹499</span>
                                <span className="text-brand-text/50 line-through mb-1">₹999</span>
                                <span className="text-green-600 font-medium text-sm mb-1.5 ml-2">(50% OFF)</span>
                            </div>

                            {/* Action Buttons (Desktop) */}
                            <div className="hidden md:flex gap-4 mb-8">
                                <button
                                    onClick={handleAffiliateClick}
                                    className="flex-1 bg-brand-secondary text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-secondary/90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    Check the Latest Price <ExternalLink size={20} />
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-bg/50 border border-brand-primary/10">
                                    <ShieldCheck className="text-brand-primary" size={24} />
                                    <span className="text-sm font-medium text-brand-text">Verified Quality</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-bg/50 border border-brand-primary/10">
                                    <Truck className="text-brand-primary" size={24} />
                                    <span className="text-sm font-medium text-brand-text">Fast Delivery via Amazon</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-brand-text mb-3">Our Review</h3>
                                <div className="prose prose-brand max-w-none text-brand-text/80">
                                    <p>We tested this ceramic vase set and it instantly elevates any corner. The matte finish feels extremely premium compared to other glossy, cheap-looking vases on the market.</p>
                                    <p>It has a textured, unglazed look that fits perfectly into Japandi, Wabi-Sabi, or Minimalist decor styles. We highly recommend pairing it with dried bunny tails or faux pampas.</p>
                                </div>
                            </div>

                            {/* Pros & Cons */}
                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                <div className="bg-green-50/50 p-5 rounded-2xl border border-green-100">
                                    <h4 className="flex items-center gap-2 font-bold text-green-800 mb-3">
                                        <CheckCircle2 size={18} /> Pros
                                    </h4>
                                    <ul className="space-y-2 text-sm text-green-900/80">
                                        <li>• Heavy and sturdy (won't tip easily)</li>
                                        <li>• Premium matte texture</li>
                                        <li>• Aesthetic minimalist design</li>
                                    </ul>
                                </div>
                                <div className="bg-red-50/50 p-5 rounded-2xl border border-red-100">
                                    <h4 className="flex items-center gap-2 font-bold text-red-800 mb-3">
                                        <XCircle size={18} /> Cons
                                    </h4>
                                    <ul className="space-y-2 text-sm text-red-900/80">
                                        <li>• Smaller opening, fits 3-4 stems max</li>
                                        <li>• Not meant to hold water (unglazed inside)</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-brand-primary/20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:hidden z-50">
                <button
                    onClick={handleAffiliateClick}
                    className="w-full bg-brand-secondary text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-secondary/90 shadow-md flex items-center justify-center gap-2"
                >
                    Check Latest Price <ExternalLink size={20} />
                </button>
            </div>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onSuccess={() => window.open(mockAffiliateLink, "_blank")}
                title="Unlock Affiliate Price"
            />
        </div>
    );
}
