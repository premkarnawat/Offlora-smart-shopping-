export const metadata = {
    title: "Privacy Policy",
    description: "How Offlora handles and protects your data.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl min-h-[60vh]">
            <div className="glass p-8 md:p-12 rounded-3xl bg-white">
                <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-6">Privacy Policy</h1>
                <div className="prose prose-brand max-w-none text-brand-text/80">
                    <p>Last updated: October 2023</p>
                    <h2>1. Information We Collect</h2>
                    <p>
                        When you use Offlora, we may collect minimal personal information to provide you with the best experience. The only personally identifiable information we actively collect is your email address if you decide to authenticate via our secure Email OTP system to view affiliate prices.
                    </p>
                    <h2>2. How We Use Your Information</h2>
                    <p>
                        Your email is used strictly for authentication purposes (sending the One-Time Password) and managing your session. We do not sell your email, and we do not use it for marketing newsletters unless you explicitly opt-in elsewhere.
                    </p>
                    <h2>3. Cookies and Tracking</h2>
                    <p>
                        We use HTTP-only cookies to persist your login session securely.
                    </p>
                    <p>
                        We also use internal, privacy-focused analytics to track traffic sources (like Pinterest) and page views so we understand what content resonates with our audience. We do not use invasive third-party tracking pixels that follow you across the internet.
                    </p>
                    <h2>4. Data Security</h2>
                    <p>
                        We implement reasonably secure data collection, storage, and processing practices. However, no method of transmission over the Internet is 100% secure.
                    </p>
                    <h2>5. Changes to This Privacy Policy</h2>
                    <p>
                        We reserve the right to update or change our Privacy Policy at any time. Your continued use of the Service after we post any modifications will constitute your acknowledgment of the modifications.
                    </p>
                </div>
            </div>
        </div>
    );
}
