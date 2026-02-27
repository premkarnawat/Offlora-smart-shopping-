"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export function AnalyticsProvider() {
    const pathname = usePathname();

    useEffect(() => {
        // Exclude admin routes from public analytics
        if (!pathname?.startsWith("/admin")) {
            trackEvent("PAGE_VIEW", { url: pathname });
        }
    }, [pathname]);

    return null;
}
