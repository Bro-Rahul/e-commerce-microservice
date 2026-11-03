"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  Headphones,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Zap,
} from "lucide-react";
import Footer from "@/components/common/Footer";
import ProductRail from "@/components/customer/home/ProductRail";

export type StoreProduct = {
  name: string;
  detail: string;
  price: string;
  originalPrice?: string;
  rating: string;
  reviews: string;
  image: string;
  badge?: string;
};

const smartphones: StoreProduct[] = [
  {
    name: "Poco M8 5G",
    detail: "Frost Silver · 8GB RAM · 256GB",
    price: "₹21,863",
    originalPrice: "₹25,199",
    rating: "4.5",
    reviews: "143",
    badge: "Bestseller",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALKkENFnx-kbzMnvCuNpUkD4vMCD8uW3fZ2tkBhfYQzEXkzeJghSumaeXMq2imlYQpMnZPPR-qoAf1CjDrRcvyD6ZpcPHQdaU6Aph85Tghcb34aEGOXO4eV1BzGQLqDfRhtxVzg3Gpo17LfAba1HO2Ngk_WSsyIGTegZR_5XPLzCbHcXph-Kf7_9wyOxr6SbTbTh5FZdjUD_S3-Tl_I44GaGq3bvuEMWsRExF_PLPo",
  },
  {
    name: "Samsung Galaxy S25",
    detail: "Titanium · 12GB RAM · 256GB",
    price: "$799.00",
    rating: "4.8",
    reviews: "890",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAdnvxF9EBw8_nQVc1Dj66tfR-yW9DoHIv6kjNC8juZ4g-0MS_L1VR2WRsU1QGK8IaRzuVmMUPFW-pKLXNBmeT-1b_IhVUP1q8OFJb9Ox43NrD6F4LnCP1nB8_TuY54fqVlUKMZl1JzBCFv4QeJBoao_3ttHAKUByqPGNvyf8lttMJpnWy1sgnhuVKBzw7n-8SYQjHt_8CzKM_665yAP5Fy9n5Tp5ZW1y-YpMUGFy8p",
  },
  {
    name: "OnePlus Nord CE6",
    detail: "Aqua Blue · 8GB RAM · 128GB",
    price: "$349.00",
    rating: "4.6",
    reviews: "421",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCzfYYAOCJgmG9isZWBTuOUnBNBwCJRbnRjLNVi6IImI_wHocjk53kWMEGFaD3tovyKTj80QuyoZRc0pb5VDepIbWCXSMRfy_3LVLZehXVUItscpuMh2OS6pZRfPMxnISu9urxI_EM1fWcNUeKlVFv0ZT3MVccGQbXVy1JoB89IkV6jzJDkC65F2HY-ObzNRJJfO6TiTXxia8dUrChOcm-DBLQmPoDH1jXm5yBlR0d",
  },
  {
    name: "iPhone 15 Pro",
    detail: "Natural Titanium · 256GB",
    price: "$999.00",
    rating: "4.7",
    reviews: "1,204",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDV2Zi67symopnvqeIbvmwUCTve2M1PfOSizeDvvTwjPHKjcpf7fWq1YycFFDrACoztKpfxVdB0OTSvii6pEPNNEQKqldnOoWkPqWbtmwMDl_UHmfpFF5_AiLg7j7gr0BCKTgxNMRgDWj6ukWQaUEPxXEUnZaWyHtDUnoiApUmASpG-R6e-VITn_3BaMOn07rBuiSnkdq8yX3Q3_vIdiN7Sdfsz70ZTFOVfbv1LB9v5",
  },
];

const books: StoreProduct[] = [
  {
    name: "The Asura's Curse",
    detail: "Anu Kay · Paperback",
    price: "₹250.00",
    originalPrice: "₹399.00",
    rating: "4.7",
    reviews: "132",
    badge: "Trending fiction",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ7GPRZaoDSu8HUptIT7WFY9Wb19YlB0mBfjEnvUjvnsRqoAI5wNverWiWFAWl34Vg0HXpUNDAGFEJtGHOLfVmmQIZX7I777eyx3rpxKgubfuhcFEWZKGjLvNJx6j5dBtCPewVUQIQS7dJ0ivd-TBP6Vf673gNoeRk0XFlv3ZT2l3yF7sLD47sW6PwAb4N0aDvMtxRKuBzbbhwJvd_0BXqj28EGM-DPfkvaf3ltdx7",
  },
  {
    name: "Atomic Habits",
    detail: "James Clear · Hardcover",
    price: "$14.99",
    originalPrice: "$27.00",
    rating: "4.9",
    reviews: "18,920",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkynWgY7pRb4xFACJPkEnKup3m3iM2XIhlYbVV0qAL4tODqW52MtVk-GqtCxd3GAau7czUfY5TnEQUMJVw2i2yqV9DSqwunhP-LuDsoUCHjfE8jVB6GE2CHay8RIwgTWdfXqKq_O0MHX1AK8l0XWCHsWXoEoX749jKvWqmZQ8lISaAkuvDn6_9YFvrcU4uoSfKY1kH5tGdC9sFoQ5fJSzwOXNL0WCJequ2sUbZPcfl",
  },
  {
    name: "The Psychology of Money",
    detail: "Morgan Housel · Paperback",
    price: "$12.50",
    originalPrice: "$19.99",
    rating: "4.6",
    reviews: "9,410",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDVzgOjkbPrgvv9vZL0ulzCI1kMsyIf0iWjfaoc7izCi-ehXVyQCUNsn6BaO5kRJaLFh_p_V2AHRFDH1dTiq04KpKQoJWMysuScfEeKngHW-e9yCroFnI7VeXz78VT5Uv7d5ZzsL-JBNwgTvIoZkTiICO9jwJ8rvDAX_s8iDRxfWvoHRbBMpFnOJIroJnc5FDY2YN-5mj6UaU0rZrTQrvAqR_6jRCmOA4myWc38QAtz",
  },
  {
    name: "Sapiens",
    detail: "Yuval Noah Harari · Paperback",
    price: "$16.80",
    originalPrice: "$24.00",
    rating: "4.7",
    reviews: "12,873",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDB7Ey7bnFia9fej2I-83DA5CilOb0l0BcxjCxh3YnkmYeV4Xsu305sMxHkM6RrNs7xMKKA5HT5fjIMXDHNCJwlVEwO1DHLAr7Tq9OWRKUrlfbV8Bcgsx7xOAtsw_4nOsx2B_n29GaXVLkCl92GZM51dcq5KmAiOPodMm85_KCfWrTYSX1YXZcGjBlBzntgGbnQMEPrj3Q61E-fUbKdR1Fli7pRpEFmJM-7cHxQ-EcZ",
  },
];

const discoveryCards = [
  {
    title: "Trending Smartphones",
    subtitle: "Latest 5G flagship & mid-tier drops",
    icon: "phone",
    items: [
      { name: "Poco M8 5G", price: "From ₹21,863", image: smartphones[0].image },
      { name: "Galaxy S25", price: "$799.00", image: smartphones[1].image },
      { name: "Nord CE6", price: "$349.00", image: smartphones[2].image },
      { name: "iPhone 15 Pro", price: "$999.00", image: smartphones[3].image },
    ],
  },
  {
    title: "Fiction & Mythology Books",
    subtitle: "Critically acclaimed bestsellers",
    icon: "book",
    items: [
      { name: "Asura's Curse", price: "₹250", image: books[0].image },
      { name: "Atomic Habits", price: "$14.99", image: books[1].image },
      { name: "Psychology of Money", price: "$12.50", image: books[2].image },
      { name: "Sapiens", price: "$16.80", image: books[3].image },
    ],
  },
];



export default function CustomerPage() {
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const query = search.trim().toLowerCase();
  const matchingPhones = smartphones.filter((product) =>
    `${product.name} ${product.detail}`.toLowerCase().includes(query),
  );
  const matchingBooks = books.filter((product) =>
    `${product.name} ${product.detail}`.toLowerCase().includes(query),
  );

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const addToCart = (product: StoreProduct) => {
    setCartCount((count) => count + 1);
    setNotice(`${product.name} added to your cart`);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <main className="pb-10">
        <section className="bg-linear-to-b from-primary-container to-background pb-8 pt-4 sm:pb-10">
          <div className="mx-auto grid max-w-max gap-4 px-4 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(250px,0.65fr)]">
            <div className="relative flex min-h-82.5 items-end overflow-hidden rounded-xl bg-[#0e1a28] p-6 text-white shadow-lg sm:min-h-97.5 sm:p-10">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtaQwzqNIlqUeqxWiWkWqLYErXmUOYQOHqEZ4L6n_4fbY70Si2TzaP-PGe_3MYJ-uha5RBcl28RMpRVmJ59ht1G867rLsPYR46jZdsTYX7XWKBSxrYjqduVuZJeL0QPlckooMLXstdhKoczm5EWnUnN7llZv89qQLqLQvYO3HMUbFQFhPTAgdYlYfWPmKCUxIbJd8f5PwUQ3-dLOgfrdlRW2q6bqd2iFQtJn0A_Hun"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-luminosity transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-r from-[#0e1a28] via-[#0e1a28]/85 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-t from-[#0e1a28]/80 to-transparent" />
              <div className="relative z-10 max-w-2xl">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary-fixed">
                  <span className="h-2 w-2 rounded-full bg-secondary" /> Global Tech Premiere
                </span>
                <h1 className="max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                  Next-Gen Smartphone Experience
                </h1>
                <p className="mt-2 text-sm font-medium text-primary-fixed-dim sm:text-base">
                  Poco M8 5G &amp; Samsung Galaxy S25 Series
                </p>
                <p className="mt-3 max-w-lg text-xs leading-relaxed text-white/75 sm:text-sm">
                  Unmatched performance, 120Hz Hyper-AMOLED displays, and Snapdragon Gen 4 processors starting at $299.
                  Instant cashback &amp; no-cost EMI available today.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a href="#smartphones" className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-3 text-xs font-bold text-on-secondary shadow transition hover:brightness-95">
                    Explore Deals <ArrowRight size={15} />
                  </a>
                  <a href="#smartphones" className="rounded-lg bg-white/10 px-4 py-3 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/20">
                    Shop Electronics
                  </a>
                  <span className="hidden items-center gap-1.5 rounded-md bg-black/30 px-3 py-2 text-[10px] text-white/80 sm:inline-flex">
                    <ShieldCheck size={14} className="text-secondary" /> 1-Year Extended Warranty Included
                  </span>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <article className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-5 shadow-sm">
                <div>
                  <span className="rounded bg-secondary-fixed px-2 py-1 text-[9px] font-black uppercase tracking-wide text-on-secondary-fixed">Editor&apos;s choice</span>
                  <h2 className="mt-3 text-base font-bold text-on-surface">The Asura&apos;s Curse by Anu Kay</h2>
                  <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
                    Unravel ancient Indian mythology &amp; high-stakes kingdom intrigue. Starting ₹250.
                  </p>
                </div>
                <a href="#books" className="mt-4 flex items-center justify-between rounded-md bg-surface-container px-3 py-2 text-xs font-semibold text-on-surface">
                  Paperback Edition <span className="text-secondary">Order now →</span>
                </a>
              </article>
              <article className="flex flex-col justify-between rounded-xl bg-[#00333d] p-5 text-white shadow-sm">
                <div>
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-tertiary-fixed">
                    <Zap size={14} /> Prime exclusive
                  </p>
                  <h2 className="mt-2 text-base font-bold">Guaranteed 24-Hr Delivery</h2>
                  <p className="mt-2 text-xs leading-relaxed text-white/75">
                    Free delivery on over 2.5 million essentials, with same-day dispatch in major metros.
                  </p>
                </div>
                <a href="#benefits" className="mt-4 rounded-md bg-tertiary-fixed px-3 py-2 text-center text-xs font-bold text-on-tertiary-fixed">
                  Check My Postal Code
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto -mt-2 grid max-w-max gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4" aria-label="Featured categories">
          {discoveryCards.map((card) => (
            <article key={card.title} className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-4 shadow-md sm:p-5">
              <div>
                <h2 className="text-base font-bold tracking-tight text-on-surface">{card.title}</h2>
                <p className="mb-4 text-xs text-on-surface-variant">{card.subtitle}</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {card.items.map((item) => (
                    <a key={item.name} href={card.icon === "book" ? "#books" : "#smartphones"} className="group rounded-lg bg-surface-container-low p-2">
                      <div className="mb-1.5 aspect-square overflow-hidden rounded-md bg-surface-container-highest">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover transition group-hover:scale-105" />
                      </div>
                      <span className="block truncate text-xs font-semibold text-on-surface">{item.name}</span>
                      <span className="text-[11px] font-bold text-error">{item.price}</span>
                    </a>
                  ))}
                </div>
              </div>
              <a href={card.icon === "book" ? "#books" : "#smartphones"} className="mt-4 flex items-center gap-1 text-xs font-bold text-secondary">
                {card.icon === "book" ? "Explore bookstores" : "See all smartphones"} <ArrowRight size={13} />
              </a>
            </article>
          ))}
          <article id="deals" className="rounded-xl bg-surface-container-lowest p-4 shadow-md sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-on-surface">Deals of the Day</h2>
                <p className="mt-1 text-[11px] text-error">◷ Ends in: 04:32:07</p>
              </div>
              <span className="rounded bg-error-container px-2 py-1 text-[9px] font-bold text-on-error-container">Up to 40%</span>
            </div>
            <a href="#smartphones" className="mt-3 block overflow-hidden rounded-lg bg-surface-container-low">
              <img src={smartphones[0].image} alt="Featured smartphone deal" className="h-36 w-full object-contain p-2" />
              <div className="px-3 pb-3">
                <p className="text-xs font-semibold text-on-surface">Poco M8 5G — Flagship performance</p>
                <p className="mt-1 text-sm font-black text-error">₹21,863 <span className="ml-1 text-[10px] font-normal text-outline line-through">₹25,199</span></p>
              </div>
            </a>
          </article>
          <article className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-4 shadow-md sm:p-5">
            <div>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-fixed text-on-primary-fixed"><ShoppingCart size={18} /></div>
              <h2 className="text-base font-bold text-on-surface">Sign in for the Best Experience</h2>
              <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">
                Get personalized smart recommendations, access order tracking in real time, and sync your unified wishlists across all devices.
              </p>
              <Link href="/auth/login" className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-secondary px-3 py-2.5 text-xs font-bold text-on-secondary">
                Sign in securely
              </Link>
              <p className="mt-2 text-center text-[10px] text-on-surface-variant">
                New customer? <Link href="/auth/register-customer" className="font-semibold text-tertiary">Start here</Link>
              </p>
            </div>
            <div className="mt-4 space-y-2 rounded-lg bg-surface-container-low p-3 text-[10px] text-on-surface-variant">
              <p className="flex items-center gap-2"><Check size={12} className="text-secondary" /> One-click express checkout</p>
              <p className="flex items-center gap-2"><Check size={12} className="text-secondary" /> Saved addresses &amp; payment cards</p>
            </div>
          </article>
        </section>

        <section id="benefits" className="mx-auto mt-7 grid max-w-max grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4">
          {[
            { title: "Fast & Free Delivery", detail: "Free 24hr delivery on orders $35+", Icon: Truck },
            { title: "10-Day Replacement", detail: "No-questions-asked quick exchange", Icon: RotateCcw },
            { title: "Bank-Grade Payment", detail: "256-bit encrypted checkout", Icon: ShieldCheck },
            { title: "24/7 Priority Support", detail: "Live chat & immediate phone assist", Icon: Headphones },
          ].map(({ title, detail, Icon }) => (
            <div key={title} className="flex items-center gap-3 rounded-xl bg-surface-container p-3 sm:p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-lowest text-tertiary shadow-sm"><Icon size={19} /></div>
              <div><h3 className="text-xs font-bold text-on-surface">{title}</h3><p className="mt-0.5 text-[10px] text-on-surface-variant">{detail}</p></div>
            </div>
          ))}
        </section>

        <ProductRail
          title="Top Picks in Smartphones & Gadgets"
          subtitle="High-speed connectivity, flagship optics & all-day battery life"
          label="smartphones"
          products={matchingPhones}
          onAdd={addToCart}
        />
        <ProductRail
          title="Popular Reads & Editor's Book Club"
          subtitle="Explore modern epics, timeless self-mastery, and international bestsellers"
          label="books"
          products={matchingBooks}
          onAdd={addToCart}
        />

        <section className="mx-auto mt-7 max-w-max px-4 sm:px-6">
          <div className="rounded-xl bg-surface-container p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-sm font-bold text-on-surface"><BookOpen size={16} className="text-on-surface-variant" /> Inspired by your recent browsing history</h2>
              <a href="#smartphones" className="shrink-0 text-xs font-semibold text-secondary">Manage History</a>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {[...smartphones.slice(0, 3), ...books.slice(0, 3)].map((product, index) => (
                <a key={product.name} href={index < 3 ? "#smartphones" : "#books"} className="group rounded-lg bg-surface-container-lowest p-2.5 transition hover:shadow">
                  <div className="mb-2 aspect-square overflow-hidden rounded bg-surface-container-low">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition group-hover:scale-105" />
                  </div>
                  <span className="block truncate text-xs font-semibold text-on-surface">{product.name}</span>
                  <span className="mt-1 block text-xs font-bold text-on-surface">{product.price}</span>
                  <span className="text-[10px] text-error">{index === 0 ? "In High Demand" : "Prime · 1-Day"}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
