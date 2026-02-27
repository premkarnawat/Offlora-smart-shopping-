import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";

const MOCK_BLOGS = [
    {
        id: "1",
        title: "10 Minimalist Desk Setups That Will Boost Your Productivity",
        slug: "minimalist-desk-setups",
        excerpt: "Discover the best aesthetic tech organizers and accessories to build your dream WFH setup inspired by Pinterest.",
        category: "Workspace",
        date: "Oct 12, 2023",
    },
    {
        id: "2",
        title: "Japandi Style on a Budget: Affordable Amazon Finds",
        slug: "japandi-style-budget",
        excerpt: "You don't need to spend thousands to achieve the peaceful Japandi interior look. Here are our top affordable finds.",
        category: "Home Decor",
        date: "Oct 05, 2023",
    },
    {
        id: "3",
        title: "The Ultimate Guide to Selecting the Right Matcha Powder",
        slug: "matcha-powder-guide",
        excerpt: "Culinary vs Ceremonial grade? We bought and tested the top 5 matcha brands so you know exactly what to buy.",
        category: "Wellness",
        date: "Sep 28, 2023",
    }
];

export const metadata = {
    title: "Blog & Guides | Offlora",
    description: "Read our curated aesthetic guides, reviews, and styling tips.",
};

export default function BlogListingPage() {
    return (
        <div className="bg-brand-bg/30 min-h-screen py-16">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tight mb-4">
                        Curated Guides & Reviews
                    </h1>
                    <p className="text-lg text-brand-text/70 max-w-2xl mx-auto">
                        Deep dives into aesthetics, honest product comparisons, and inspiration for your lifestyle.
                    </p>
                </div>

                {/* Featured Post */}
                <div className="glass rounded-3xl overflow-hidden mb-12 bg-white">
                    <div className="grid md:grid-cols-2">
                        <div className="relative aspect-[4/3] md:aspect-auto h-full bg-brand-primary/10">
                            <Image src="/placeholder.jpg" alt="Featured Post" fill className="object-cover" />
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-secondary uppercase tracking-wider mb-4">
                                <BookOpen size={14} /> Featured Guide
                            </span>
                            <h2 className="text-3xl font-bold text-brand-text mb-4 leading-tight hover:text-brand-secondary transition-colors cursor-pointer">
                                <Link href={`/blog/${MOCK_BLOGS[0].slug}`}>{MOCK_BLOGS[0].title}</Link>
                            </h2>
                            <p className="text-brand-text/70 text-lg mb-8 leading-relaxed">
                                {MOCK_BLOGS[0].excerpt}
                            </p>
                            <Link href={`/blog/${MOCK_BLOGS[0].slug}`} className="inline-flex items-center gap-2 font-semibold text-brand-secondary hover:underline group">
                                Read Full Guide <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_BLOGS.slice(1).map((blog) => (
                        <article key={blog.id} className="glass rounded-2xl overflow-hidden bg-white flex flex-col hover:-translate-y-1 transition-transform duration-300">
                            <Link href={`/blog/${blog.slug}`} className="block relative aspect-video bg-brand-primary/10">
                                <Image src="/placeholder.jpg" alt={blog.title} fill className="object-cover" />
                            </Link>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center justify-between text-xs text-brand-text/50 mb-3">
                                    <span className="font-semibold text-brand-secondary uppercase tracking-wider">{blog.category}</span>
                                    <span>{blog.date}</span>
                                </div>
                                <Link href={`/blog/${blog.slug}`} className="block mb-3">
                                    <h3 className="text-xl font-bold text-brand-text leading-snug hover:text-brand-secondary transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>
                                </Link>
                                <p className="text-brand-text/70 text-sm line-clamp-3 mb-6">
                                    {blog.excerpt}
                                </p>
                                <div className="mt-auto">
                                    <Link href={`/blog/${blog.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-secondary hover:underline">
                                        Read article <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
