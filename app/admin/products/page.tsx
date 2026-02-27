"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, MoreVertical } from "lucide-react";
import Image from "next/image";

export default function AdminProductsPage() {
    const [search, setSearch] = useState("");

    const mockProducts = [
        { id: "1", name: "Aesthetic Ceramic Vase Set", price: "₹499", platform: "Amazon", clicks: 124 },
        { id: "2", name: "Minimalist Desk Organizer", price: "₹299", platform: "Meesho", clicks: 89 },
        { id: "3", name: "Premium Matcha Kit", price: "₹899", platform: "Amazon", clicks: 210 },
    ];

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-brand-text">Products</h1>
                    <p className="text-brand-text/60 mt-1">Manage affiliate products and tracking links.</p>
                </div>
                <button className="flex items-center gap-2 bg-brand-secondary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-brand-secondary/90 transition-colors shadow-md w-full md:w-auto justify-center">
                    <Plus size={18} /> Add Product
                </button>
            </div>

            <div className="glass bg-white rounded-3xl border border-brand-primary/10 overflow-hidden">
                <div className="p-4 border-b border-brand-primary/10 flex items-center justify-between">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text/40" size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-brand-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 bg-brand-bg/50"
                        />
                    </div>
                    <div className="text-sm text-brand-text/60 font-medium">
                        3 total products
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-bg/50 text-brand-text/70 text-sm border-b border-brand-primary/10">
                                <th className="p-4 font-medium">Product</th>
                                <th className="p-4 font-medium">Price</th>
                                <th className="p-4 font-medium">Platform</th>
                                <th className="p-4 font-medium">Total Clicks</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockProducts.map((product) => (
                                <tr key={product.id} className="border-b border-brand-primary/5 hover:bg-brand-bg/30 transition-colors">
                                    <td className="p-4 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-brand-primary/10 relative overflow-hidden flex-shrink-0">
                                            <Image src="/placeholder.jpg" alt="thumbnail" fill className="object-cover" />
                                        </div>
                                        <span className="font-semibold text-brand-text max-w-[200px] truncate">{product.name}</span>
                                    </td>
                                    <td className="p-4 text-brand-text/80">{product.price}</td>
                                    <td className="p-4">
                                        <span className="px-2.5 py-1 bg-brand-primary/10 text-brand-secondary rounded-md text-xs font-bold uppercase tracking-wider">
                                            {product.platform}
                                        </span>
                                    </td>
                                    <td className="p-4 font-medium text-brand-text">
                                        {product.clicks}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-brand-text/60 hover:text-brand-secondary hover:bg-brand-primary/10 rounded-lg transition-colors">
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-2 text-brand-text/60 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
