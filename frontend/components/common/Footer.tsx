import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="bg-[#0e1a28] text-white">
            <div className="mx-auto grid max-w-max grid-cols-2 gap-8 px-6 py-9 sm:grid-cols-4">
                {[
                    { title: "Get to Know Us", links: ["Careers", "Blog", "About ShopDirect", "Investor Relations"] },
                    { title: "Make Money with Us", links: ["Sell on ShopDirect", "Supply to ShopDirect", "Become an Affiliate", "Advertise Your Products"] },
                    { title: "Payment Products", links: ["ShopDirect Business Card", "Shop with Points", "Reload Your Balance", "Currency Converter"] },
                    { title: "Let Us Help You", links: ["ShopDirect and COVID-19", "Your Account", "Your Orders", "Shipping Rates & Policies"] },
                ].map((column) => (
                    <div key={column.title}>
                        <h2 className="mb-3 text-sm font-bold">{column.title}</h2>
                        <ul className="space-y-2">
                            {column.links.map((item) => <li key={item}><a href="#categories" className="text-xs text-white/70 hover:text-white hover:underline">{item}</a></li>)}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="border-t border-white/15 py-6 text-center">
                <Link href="/" className="text-lg font-black text-white">ShopDirect</Link>
                <div className="mt-2 flex justify-center gap-4 text-[10px] text-white/75">
                    <a href="#categories">Conditions of Use</a><a href="#categories">Privacy Notice</a><a href="#categories">Interest-Based Ads</a>
                </div>
                <p className="mt-3 text-[10px] text-white/50">© 1996–2026, ShopDirect.com, Inc. or its affiliates</p>
            </div>
        </footer>)
}

export default Footer