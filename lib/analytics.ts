export const getTrafficSource = () => {
    if (typeof window === "undefined") return "direct";

    const referrer = document.referrer.toLowerCase();
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source")?.toLowerCase();
    const refParam = urlParams.get("ref")?.toLowerCase();

    if (referrer.includes("pinterest.com") || utmSource === "pinterest" || refParam === "pinterest") {
        return "pinterest";
    }

    if (referrer.includes("google.com")) return "google";
    if (referrer.includes("instagram.com")) return "instagram";

    return referrer ? "referral" : "direct";
};

export const trackEvent = async (
    eventType: string,
    data?: { productId?: string, url?: string }
) => {
    try {
        const source = getTrafficSource();

        // Attempt to store source in localStorage for session persistence
        if (typeof window !== "undefined" && source !== "direct" && source !== "referral") {
            localStorage.setItem("offlora_source", source);
        }

        const persistedSource = typeof window !== "undefined" ? localStorage.getItem("offlora_source") : null;

        await fetch("/api/analytics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                eventType,
                source: persistedSource || source,
                ...data
            }),
            // Keepalive ensures the request finishes even if the user navigates away (e.g., clicking affiliate link)
            keepalive: true
        });
    } catch (error) {
        console.error("Failed to track event", error);
    }
};
