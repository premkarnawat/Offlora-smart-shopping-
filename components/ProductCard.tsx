"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export interface ProductCardProps {
    product: {
        id: string;
        name: string;
        slug: string;
        price?: string | null;
        platform: string;
        images?: { url: string }[];
        category?: { name: string };
    };
}

export function ProductCard({ product }: ProductCardProps) {
    const imageUrl = product.images?.[0]?.url || "/placeholder.jpg"; // Fallback image

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="glass rounded-xl overflow-hidden group flex flex-col h-full bg-white"
        >
            <Link href={`/products/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-brand-bg/50">
                <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {product.platform && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-brand-text shadow-sm">
                        {product.platform}
                    </div>
                )}
            </Link>

            <div className="p-4 flex flex-col flex-grow">
                {product.category && (
                    <span className="text-xs text-brand-secondary font-medium tracking-wider uppercase mb-1">
                        {product.category.name}
                    </span>
                )}
                <Link href={`/products/${product.slug}`} className="block">
                    <h3 className="font-semibold text-brand-text leading-tight mb-2 line-clamp-2 hover:text-brand-secondary transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="font-bold text-lg text-brand-text">
                        {product.price ? `₹${product.price}` : "Check Price"}
                    </span>
                    <Link
                        href={`/products/${product.slug}`}
                        className="text-sm font-medium text-brand-secondary hover:underline"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
