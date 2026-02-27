import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-white border-t border-brand-primary/10 pt-16 pb-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="md:col-span-1">
                        <Link href="/" className="font-bold text-2xl text-brand-secondary tracking-tight block mb-4">
                            Offlora
                        </Link>
                        <p className="text-brand-text/70 text-sm leading-relaxed max-w-xs">
                            Your trusted destination for curated affiliate product discoveries, designed for modern shoppers.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-brand-text mb-4">Explore</h3>
                        <ul className="space-y-3">
                            <li><Link href="/products" className="text-brand-text/70 hover:text-brand-secondary text-sm transition-colors">All Products</Link></li>
                            <li><Link href="/categories" className="text-brand-text/70 hover:text-brand-secondary text-sm transition-colors">Categories</Link></li>
                            <li><Link href="/blog" className="text-brand-text/70 hover:text-brand-secondary text-sm transition-colors">Blog & Guides</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-brand-text mb-4">Legal</h3>
                        <ul className="space-y-3">
                            <li><Link href="/terms" className="text-brand-text/70 hover:text-brand-secondary text-sm transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="text-brand-text/70 hover:text-brand-secondary text-sm transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/affiliate-disclosure" className="text-brand-text/70 hover:text-brand-secondary text-sm transition-colors">Affiliate Disclosure</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-brand-text mb-4">Connect</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-brand-text/70 hover:text-brand-secondary text-sm transition-colors">Pinterest</a></li>
                            <li><a href="#" className="text-brand-text/70 hover:text-brand-secondary text-sm transition-colors">Instagram</a></li>
                            <li><Link href="/contact" className="text-brand-text/70 hover:text-brand-secondary text-sm transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-brand-primary/10 pt-8 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-brand-text/50 text-sm">
                        © {new Date().getFullYear()} Offlora. All rights reserved.
                    </p>
                    <p className="text-brand-text/50 text-xs mt-4 md:mt-0 max-w-md text-center md:text-right">
                        Offlora is a participant in the Amazon Services LLC Associates Program and other affiliate advertising programs designed to provide a means for sites to earn advertising fees by advertising and linking to affiliated sites.
                    </p>
                </div>
            </div>
        </footer>
    );
}
