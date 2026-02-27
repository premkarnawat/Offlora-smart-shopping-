import { ProductCard } from "@/components/ProductCard";
import { SlidersHorizontal } from "lucide-react";

// Mock data
const MOCK_PRODUCTS = [
    { id: "1", name: "Aesthetic Ceramic Vase Set", slug: "aesthetic-vase", price: "499", platform: "Amazon", category: { name: "Home Decor" } },
    { id: "2", name: "Minimalist Desk Organizer", slug: "desk-organizer", price: "299", platform: "Meesho", category: { name: "Workspace" } },
    { id: "3", name: "Premium Matcha Tea Kit", slug: "matcha-kit", price: "899", platform: "Amazon", category: { name: "Wellness" } },
    { id: "4", name: "Linen Blend Throw Blanket", slug: "throw-blanket", price: "1299", platform: "Meesho", category: { name: "Living" } },
    { id: "5", name: "Ribbed Glass Coffee Mug", slug: "glass-mug", price: "199", platform: "Amazon", category: { name: "Kitchen" } },
    { id: "6", name: "Bamboo Bath Caddy", slug: "bath-caddy", price: "1499", platform: "Meesho", category: { name: "Bathroom" } },
];

export const metadata = {
    title: "All Products | Offlora",
    description: "Browse our curated collection of aesthetic and functional affiliate products.",
};

export default function ProductsPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-brand-text mb-2">Curated Collection</h1>
                    <p className="text-brand-text/70">Discover the best products from around the web, vetted by our team.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-primary/20 rounded-lg text-sm font-medium hover:bg-brand-bg transition-colors shadow-soft">
                        <SlidersHorizontal size={16} /> Filters
                    </button>
                    <select className="px-4 py-2 bg-white border border-brand-primary/20 rounded-lg text-sm font-medium hover:bg-brand-bg transition-colors shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-secondary/20">
                        <option>Latest Arrivals</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Most Popular</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters Desktop */}
                <aside className="hidden md:block w-64 flex-shrink-0">
                    <div className="glass p-6 rounded-2xl sticky top-24">
                        <div className="mb-6">
                            <h3 className="font-semibold text-brand-text mb-3">Categories</h3>
                            <ul className="space-y-2">
                                {["Home Decor", "Workspace", "Wellness", "Fashion", "Beauty", "Tech"].map((cat) => (
                                    <li key={cat}>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="rounded border-brand-primary/30 text-brand-secondary focus:ring-brand-secondary" />
                                            <span className="text-sm text-brand-text/80 group-hover:text-brand-secondary transition-colors">{cat}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold text-brand-text mb-3">Platform</h3>
                            <ul className="space-y-2">
                                {["Amazon", "Meesho", "Flipkart", "Myntra"].map((platform) => (
                                    <li key={platform}>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="rounded border-brand-primary/30 text-brand-secondary focus:ring-brand-secondary" />
                                            <span className="text-sm text-brand-text/80 group-hover:text-brand-secondary transition-colors">{platform}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-grow">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {MOCK_PRODUCTS.map((prod) => (
                            <ProductCard key={prod.id} product={prod} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
