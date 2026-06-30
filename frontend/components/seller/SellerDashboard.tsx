import Link from "next/link";
import { ArrowUp, ChevronRight, CircleAlert, CreditCard, FilePenLine, Inbox, Package, PackagePlus, ShoppingCart, TrendingUp } from "lucide-react";

const metrics = [
  { label: "Total sales", value: "$12,840.00", detail: "8.2% from yesterday", icon: CreditCard, positive: true },
  { label: "Orders pending", value: "42", detail: "12 require immediate attention", icon: ShoppingCart },
  { label: "Inventory health", value: "94%", detail: "3 items low stock", icon: Package, warning: true },
  { label: "Buyer messages", value: "3", detail: "Response time: 45 min", icon: Inbox },
];

const products = [
  { name: "Ultra-Bass Wireless Headphones Gen 2", sku: "UB-WH-2024-BLK", status: "Active", price: "$129.99", stock: 142, fill: "70%", tint: "bg-emerald-500", image: "🎧" },
  { name: "ErgoFlow Vertical Mouse - Space Grey", sku: "EF-VM-2023-GRY", status: "Active", price: "$54.50", stock: 12, fill: "15%", tint: "bg-[var(--seller-orange)]", image: "🖱️" },
  { name: "Titan Mechanical Keyboard (Backlit)", sku: "TM-KB-RGB-TITAN", status: "Inactive", price: "$189.00", stock: 0, fill: "0%", tint: "bg-rose-500", image: "⌨️" },
];

export function SellerDashboard({ sellerName = "Global Stores LLC" }: { sellerName?: string }) {
  return (
    <div className="mx-auto max-w-[1180px]">
      <section className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">Good morning, {sellerName}</h1>
        <p className="mt-1 text-sm text-slate-600">Here is what&apos;s happening with your store today.</p>
      </section>

      <section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, detail, icon: Icon, positive, warning }) => (
          <article key={label} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p><Icon size={20} className="text-[var(--seller-orange-dark)]" /></div>
            <p className="mt-5 text-xl font-bold text-slate-900">{value}</p>
            <p className={`mt-0.5 flex items-center gap-1 text-xs ${positive ? "text-emerald-600" : warning ? "text-rose-600" : "text-slate-500"}`}>
              {positive && <ArrowUp size={14} />} {warning && <CircleAlert size={14} />} {detail}
            </p>
          </article>
        ))}
      </section>

      <section className="mb-5 grid gap-3 md:grid-cols-3">
        <article className="relative overflow-hidden rounded-xl bg-primary-container p-6 text-on-primary shadow-sm md:col-span-2">
          <div className="relative z-10"><h2 className="text-xl font-bold">Expand Your Catalog</h2><p className="mt-2 max-w-sm text-sm leading-5 text-on-primary-container">Reach millions of customers by adding new products to your inventory today.</p><Link href="#" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-secondary-container px-4 py-3 text-sm font-bold text-on-secondary-container"><PackagePlus size={18} />Add a Product</Link></div>
          <Package className="absolute -right-2 bottom-[-28px] size-40 text-white/10" strokeWidth={1} />
        </article>
        <div className="grid gap-3">
          <QuickAction icon={FilePenLine} title="Complete Drafts" description="5 unfinished listings" />
          <QuickAction icon={TrendingUp} title="View Reports" description="Analyze sales trends" />
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3"><h2 className="font-bold text-slate-900">Recent Listings</h2><Link href="#" className="flex items-center text-xs font-bold text-[var(--seller-orange-dark)] hover:underline">View All Products<ChevronRight size={17} /></Link></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-widest text-slate-500"><tr><th className="px-4 py-3">Product name</th><th className="px-4 py-3">SKU</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Stock</th><th className="px-4 py-3 text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-slate-200">
              {products.map((product) => <tr key={product.sku} className="transition-colors hover:bg-slate-50"><td className="px-4 py-3"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded border border-slate-200 bg-slate-50 text-xl">{product.image}</div><span className="text-sm font-medium text-slate-900">{product.name}</span></div></td><td className="px-4 py-3 font-mono text-xs text-slate-500">{product.sku}</td><td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${product.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"}`}>{product.status}</span></td><td className="px-4 py-3 text-base font-semibold text-slate-900">{product.price}</td><td className="px-4 py-3"><p className="text-sm">{product.stock}</p><div className="mt-1.5 h-1.5 w-24 overflow-hidden rounded-full bg-slate-200"><div className={`h-full rounded-full ${product.tint}`} style={{ width: product.fill }} /></div></td><td className="px-4 py-3 text-right"><button className="rounded border border-[var(--seller-orange-dark)] px-3 py-1 text-xs font-bold text-[var(--seller-orange-dark)] hover:bg-amber-50">Edit</button></td></tr>)}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function QuickAction({ icon: Icon, title, description }: { icon: typeof FilePenLine; title: string; description: string }) {
  return <Link href="#" className="group flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:bg-slate-50"><span className="grid size-11 place-items-center rounded-lg bg-slate-100 text-[var(--seller-orange-dark)] transition-colors group-hover:bg-[var(--seller-orange)] group-hover:text-slate-950"><Icon size={21} /></span><span><span className="block text-sm font-bold text-slate-900">{title}</span><span className="mt-0.5 block text-xs text-slate-500">{description}</span></span></Link>;
}
