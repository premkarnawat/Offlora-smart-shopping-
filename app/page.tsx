import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, Star, ShieldCheck, Sparkles } from "lucide-react";

// Mock data for initial render since DB might be empty
const MOCK_PRODUCTS = [
    { id: "1", name: "Aesthetic Ceramic Vase Set", slug: "aesthetic-vase", price: "499", platform: "Amazon", category: { name: "Home Decor" } },
    { id: "2", name: "Minimalist Desk Organizer", slug: "desk-organizer", price: "299", platform: "Meesho", category: { name: "Workspace" } },
    { id: "3", name: "Premium Matcha Tea Kit", slug: "matcha-kit", price: "899", platform: "Amazon", category: { name: "Wellness" } },
    { id: "4", name: "Linen Blend Throw Blanket", slug: "throw-blanket", price: "1299", platform: "Meesho", category: { name: "Living" } },
];

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-brand-bg pt-20 pb-32">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-brand-secondary/10 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-semibold text-brand-secondary mb-6 shadow-sm border border-brand-primary/20">
                        <Sparkles size={14} />
                        <span>Curated for your aesthetic</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-brand-text tracking-tight mb-6 leading-tight">
                        Discover products you&apos;ll actually <span className="text-brand-secondary italic">love.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-brand-text/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                        We scour Pinterest trends and sift through reviews so you don&apos;t have to. Real recommendations, aesthetic finds, and honest pros & cons.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/products" className="w-full sm:w-auto px-8 py-4 bg-brand-secondary text-white rounded-full font-medium text-lg hover:bg-brand-secondary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
                            Explore Collection <ArrowRight size={20} />
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8 text-brand-text/60 text-sm font-medium">
                        <div className="flex items-center gap-2"><Star size={16} className="text-brand-primary" /> Handpicked</div>
                        <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-brand-primary" /> Verified Reviews</div>
                    </div>
                </div>
            </section>

            {/* Category Pills */}
            <section className="py-8 border-y border-brand-primary/10 bg-white sticky top-16 z-40">
                <div className="container mx-auto px-4">
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {["All", "Home Decor", "Workspace", "Wellness", "Fashion", "Beauty", "Tech"].map((cat) => (
                            <button key={cat} className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-medium transition-colors ${cat === "All" ? "bg-brand-text text-white" : "bg-brand-bg text-brand-text hover:bg-brand-primary/20"}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Products Grid */}
            <section className="py-20 bg-brand-bg/50">
                <div className="container mx-auto px-4">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-brand-text tracking-tight mb-2">Trending Right Now</h2>
                            <p className="text-brand-text/60">Pieces that are blowing up on Pinterest.</p>
                        </div>
                        <Link href="/products" className="hidden md:flex items-center gap-1 text-sm font-medium text-brand-secondary hover:underline">
                            View all <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {MOCK_PRODUCTS.map((prod) => (
                            <ProductCard key={prod.id} product={prod} />
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link href="/products" className="inline-flex items-center gap-1 text-sm font-medium text-brand-secondary hover:underline">
                            View all <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Curated Blog / Guides Section */}
            <section className="py-20 bg-white border-t border-brand-primary/10">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h2 className="text-3xl font-bold text-brand-text tracking-tight mb-6">Not sure what to buy?</h2>
                    <p className="text-lg text-brand-text/70 mb-8 leading-relaxed">
                        Read our in-depth guides, aesthetic lookbooks, and honest comparisons to help you build your perfect space.
                    </p>
                    <Link href="/blog" className="inline-block px-6 py-3 border-2 border-brand-secondary text-brand-secondary rounded-full font-medium hover:bg-brand-secondary hover:text-white transition-colors">
                        Read Our Guides
                    </Link>
                </div>
            </section>
        </div>
    );
}
