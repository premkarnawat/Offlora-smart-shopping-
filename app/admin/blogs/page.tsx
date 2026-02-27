"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

export default function AdminBlogsPage() {
    const [search, setSearch] = useState("");

    const mockBlogs = [
        { id: "1", title: "10 Minimalist Desk Setups", status: "Published", views: 1204, date: "Oct 12, 2023" },
        { id: "2", title: "Japandi Style on a Budget", status: "Published", views: 892, date: "Oct 05, 2023" },
        { id: "3", title: "Best Aesthetic Tech Accessories", status: "Draft", views: 0, date: "Oct 15, 2023" },
    ];

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-brand-text">Blog Posts</h1>
                    <p className="text-brand-text/60 mt-1">Write and manage organic SEO content.</p>
                </div>
                <button className="flex items-center gap-2 bg-brand-secondary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-brand-secondary/90 transition-colors shadow-md w-full md:w-auto justify-center">
                    <Plus size={18} /> New Post
                </button>
            </div>

            <div className="glass bg-white rounded-3xl border border-brand-primary/10 overflow-hidden">
                <div className="p-4 border-b border-brand-primary/10 flex items-center justify-between">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text/40" size={18} />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-brand-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 bg-brand-bg/50"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-bg/50 text-brand-text/70 text-sm border-b border-brand-primary/10">
                                <th className="p-4 font-medium">Post Title</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Views</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockBlogs.map((blog) => (
                                <tr key={blog.id} className="border-b border-brand-primary/5 hover:bg-brand-bg/30 transition-colors">
                                    <td className="p-4 font-semibold text-brand-text max-w-[300px] truncate">{blog.title}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${blog.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td className="p-4 font-medium text-brand-text/80">{blog.views}</td>
                                    <td className="p-4 text-brand-text/60 text-sm">{blog.date}</td>
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
