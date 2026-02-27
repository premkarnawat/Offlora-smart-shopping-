export const metadata = {
    title: "Affiliate Disclosure",
    description: "Understand how Offlora earns commissions through product recommendations.",
};

export default function AffiliateDisclosurePage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl min-h-[60vh]">
            <div className="glass p-8 md:p-12 rounded-3xl bg-white">
                <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-6">Affiliate Disclosure</h1>
                <div className="prose prose-brand max-w-none text-brand-text/80">
                    <p>Last updated: October 2023</p>
                    <p>
                        Offlora believes in transparency. Our mission is to curate the best products and help you discover items that elevate your lifestyle, workspace, and home.
                    </p>
                    <h2>Amazon Associates Program</h2>
                    <p>
                        Offlora is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in and affiliated sites.
                    </p>
                    <p>
                        As an Amazon Associate, we earn from qualifying purchases. This means if you click on an affiliate link and purchase an item, we may receive a small commission at no extra cost to you.
                    </p>
                    <h2>Other Programs</h2>
                    <p>
                        We also participate in affiliate programs with Meesho, Flipkart, and other independent brands. The commissions earned help maintain this platform and allow our team to continue reviewing and curating high-quality products.
                    </p>
                    <h2>Editorial Integrity</h2>
                    <p>
                        Our recommendations are based strictly on our own research, testing, and assessment of trends (primarily via Pinterest and social media). Brands cannot pay us to be included in our "Top Picks" or give positive reviews. If a post is sponsored, it will be clearly marked as such at the top of the article.
                    </p>
                </div>
            </div>
        </div>
    );
}
