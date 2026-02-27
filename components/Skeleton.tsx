import React from "react";

export function Skeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-brand-primary/10 rounded-md ${className}`}></div>
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="glass rounded-xl overflow-hidden flex flex-col h-full bg-white">
            <Skeleton className="aspect-[4/5] w-full rounded-none" />
            <div className="p-4 flex flex-col flex-grow space-y-3">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
                <div className="mt-auto flex items-center justify-between pt-4">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
            </div>
        </div>
    );
}
