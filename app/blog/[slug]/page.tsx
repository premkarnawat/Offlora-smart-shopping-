import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    // In a real app, fetch blog content from DB based on params.slug

    const MOCK_PRODUCTS = [
        { id: "1", name: "Aesthetic Ceramic Vase Set", slug: "aesthetic-vase", price: "499", platform: "Amazon", category: { name: "Home Decor" } },
        { id: "2", name: "Minimalist Desk Organizer", slug: "desk-organizer", price: "299", platform: "Meesho", category: { name: "Workspace" } }
    ];

    return (
        <article className="min-h-screen bg-white">
            {/* Header Banner */}
            <div className="relative h-[40vh] min-h-[400px] w-full bg-brand-primary/20 flex items-end">
                <Image src="/placeholder.jpg" alt="Blog cover" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                <div className="container mx-auto px-4 relative z-10 pb-12">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm font-medium transition-colors">
                        <ArrowLeft size={16} /> Back to Blog
                    </Link>
                    <div className="max-w-3xl">
                        <span className="inline-block px-3 py-1 bg-brand-secondary text-white text-xs font-bold uppercase tracking-wider rounded-md mb-4">
                            Workspace
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            10 Minimalist Desk Setups That Will Boost Your Productivity
                        </h1>
                        <div className="flex items-center gap-6 text-white/80 text-sm font-medium">
                            <span className="flex items-center gap-2"><Clock size={16} /> 5 min read</span>
                            <span>Oct 12, 2023</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <div className="w-full lg:w-2/3 max-w-3xl mx-auto lg:mx-0">
                    <div className="prose prose-lg prose-brand max-w-none">
                        <p className="lead text-xl text-brand-text/80 mb-8 font-medium">
                            Discover the best aesthetic tech organizers and accessories to build your dream WFH setup inspired by Pinterest.
                        </p>

                        <p>
                            If your desk looks like a war zone of tangled cables, coffee mugs, and sticky notes, it's probably affecting your ability to focus. Research shows that our physical environment significantly impacts our cognitive processes.
                        </p>

                        <h2>1. The Foundation: A Clean Desk Mat</h2>
                        <p>
                            Before adding any accessories, start with a solid foundation. A vegan leather desk mat not only protects your desk surface but defines your workspace visually. It anchors your keyboard and mouse in a dedicated zone.
                        </p>

                        {/* Embedded Product Suggestion */}
                        <div className="my-10 p-6 bg-brand-bg rounded-2xl border border-brand-primary/20">
                            <h3 className="text-xl font-bold mt-0 mb-4 flex items-center gap-2">
                                ✨ Featured Pick
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-6 items-center">
                                <div className="relative aspect-square rounded-xl overflow-hidden">
                                    <Image src="/placeholder.jpg" alt="Product" fill className="object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Dual-Sided PU Leather Desk Pad</h4>
                                    <p className="text-sm text-brand-text/70 mb-4">Waterproof, easy to clean, and provides a smooth writing surface. Highly rated on Amazon.</p>
                                    <Link href="/products/desk-mat" className="inline-block px-5 py-2 bg-brand-secondary text-white rounded-lg text-sm font-bold shadow-sm hover:shadow-md transition-all">
                                        Check Price Details
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <h2>2. Elevate Your Screen</h2>
                        <p>
                            Next, consider ergonomics. Your monitor should be at eye level. A wooden monitor stand adds warmth to the setup (crucial for Japandi aesthetics) while providing storage underneath for your keyboard at the end of the day.
                        </p>

                        <blockquote>
                            "A cluttered desk represents a cluttered mind." - Unknown
                        </blockquote>

                        <h2>Conclusion</h2>
                        <p>
                            Building a minimalist desk setup isn't about getting rid of everything; it's about making sure everything on your desk serves a purpose or brings you joy.
                        </p>
                    </div>

                    {/* Social Share */}
                    <div className="mt-12 pt-8 border-t border-brand-primary/10 flex items-center justify-between">
                        <h3 className="font-bold text-brand-text">Share this guide</h3>
                        <div className="flex gap-2">
                            <button className="p-2 bg-brand-bg hover:bg-brand-primary/20 text-brand-secondary rounded-full transition-colors"><Share2 size={20} /></button>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="w-full lg:w-1/3">
                    <div className="sticky top-24">
                        <h3 className="text-xl font-bold text-brand-text mb-6">Related Products</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
                            {MOCK_PRODUCTS.map(prod => (
                                <ProductCard key={prod.id} product={prod} />
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </article>
    );
}
