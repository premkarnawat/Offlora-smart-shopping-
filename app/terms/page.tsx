export const metadata = {
    title: "Terms of Service",
    description: "Terms and conditions for using the Offlora platform.",
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl min-h-[60vh]">
            <div className="glass p-8 md:p-12 rounded-3xl bg-white">
                <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-6">Terms of Service</h1>
                <div className="prose prose-brand max-w-none text-brand-text/80">
                    <p>Last updated: October 2023</p>
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using Offlora (the &quot;Website&quot;), you accept and agree to be bound by the terms and provision of this agreement. Find aesthetics for your home, workspace, and lifestyle.
                    </p>
                    <h2>2. Use License</h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on Offlora for personal, non-commercial transitory viewing only.
                    </p>
                    <h2>3. Disclaimer</h2>
                    <p>
                        The materials on Offlora are provided on an 'as is' basis. Offlora makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                    <h2>4. Limitations</h2>
                    <p>
                        In no event shall Offlora or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Offlora.
                    </p>
                    <h2>5. Affiliated Sites</h2>
                    <p>
                        Offlora is an affiliate discovery platform. We link to third-party stores (like Amazon, Meesho, etc.). We are not responsible for the fulfillment, shipping, returns, or customer service of any products purchased through our affiliate links. Please refer to our Affiliate Disclosure for more details.
                    </p>
                </div>
            </div>
        </div>
    );
}
