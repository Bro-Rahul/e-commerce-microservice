import { PackageSearch } from "lucide-react";
import { categories } from "@/constants/data/seller/catalog";
import CatagoryList from "@/components/seller/catalog/CatagoryList";



export default function CatalogPage() {
  return (
    <div className="mx-auto w-full max-w-375">
      <div className="mb-4">
        <h1 className="mb-2 text-[28px] font-bold leading-8.5 tracking-tight text-on-surface">Select Product Category</h1>
        <p className="text-base leading-6 text-on-surface-variant">Choose the category that best describes your product to begin your listing.</p>
      </div>

      <CatagoryList
        categories={categories}
      />

      <section className="relative mt-5 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low p-5">
        <div className="relative z-10 max-w-2xl">
          <h2 className="mb-2 text-xl font-bold leading-6.5 text-primary">Not seeing your category?</h2>
          <p className="mb-6 text-sm leading-5 text-on-surface-variant">Explore our full taxonomy to find more specific niches for your product. Accurate categorization helps buyers find your items faster.</p>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-lg bg-secondary-container px-6 py-2 text-sm font-bold text-on-secondary-container transition hover:brightness-95">Browse Full Catalog</button>
            <button className="rounded-lg border border-outline bg-surface-container-lowest px-6 py-2 text-sm font-bold text-primary transition hover:bg-surface-container-high">Contact Seller Support</button>
          </div>
        </div>
        <PackageSearch className="pointer-events-none absolute -right-4 -bottom-8 hidden size-52 text-primary-container/10 lg:block" strokeWidth={1} />
      </section>
    </div>
  );
}
