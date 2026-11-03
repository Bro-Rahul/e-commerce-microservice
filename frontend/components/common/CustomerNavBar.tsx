import { MapPin, Search, ShoppingCart, Menu } from 'lucide-react';
import ThemeChanger from '../ui/ThemeChanger';
import Link from 'next/link';

const CustomerNavBar = () => {
    return (
        <header className="sticky top-0 z-40 text-white">
            <div className="bg-[#0e1a28]">
                <div className="mx-auto flex max-w-max items-center gap-3 px-4 py-2 sm:gap-5 sm:px-6">
                    <Link href="/" className="shrink-0 text-xl font-black tracking-tight text-white sm:text-2xl">
                        ShopDirect
                    </Link>
                    <div className="hidden items-center gap-1 text-white sm:flex">
                        <MapPin size={17} />
                        <div className="leading-tight">
                            <span className="block text-[10px] text-white/70">Deliver to</span>
                            <span className="text-xs font-bold">New York 10001</span>
                        </div>
                    </div>
                    <form
                        className="flex min-w-0 flex-1 overflow-hidden rounded-md bg-white text-slate-900 focus-within:ring-2 focus-within:ring-secondary"
                        onSubmit={(event) => {
                            event.preventDefault();
                            document.getElementById("smartphones")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        role="search"
                    >
                        <label className="sr-only" htmlFor="store-search">
                            Search ShopDirect
                        </label>
                        <select
                            aria-label="Search department"
                            className="hidden max-w-36 border-0 bg-slate-100 px-2 text-xs sm:block"
                            defaultValue="all"
                        >
                            <option value="all">All Departments</option>
                            <option value="electronics">Electronics</option>
                            <option value="books">Books</option>
                        </select>
                        <input
                            id="store-search"
                            placeholder="Search ShopDirect"
                            className="min-w-0 flex-1 border-0 px-3 py-2 text-sm outline-none placeholder:text-slate-500 focus:ring-0 sm:px-4"
                        />
                        <button
                            type="submit"
                            aria-label="Search"
                            className="flex items-center justify-center bg-secondary px-4 text-on-secondary transition hover:brightness-95"
                        >
                            <Search size={18} />
                        </button>
                    </form>
                    <div className="hidden flex-col leading-tight xl:flex">
                        <span className="text-[10px] text-white/70">Hello, Sign In</span>
                        <Link href="/auth/login" className="text-xs font-bold text-white hover:underline">
                            Account &amp; Lists
                        </Link>
                    </div>
                    <div className="hidden flex-col leading-tight lg:flex">
                        <span className="text-[10px] text-white/70">Returns</span>
                        <Link href="/auth/login" className="text-xs font-bold text-white hover:underline">
                            &amp; Orders
                        </Link>
                    </div>
                    <a
                        href="#smartphones"
                        className="relative flex shrink-0 items-center gap-1 text-white"
                    //use context here for managing the cart
                    // aria-label={`Cart with ${cartCount} items`}
                    >
                        {/* <span className="absolute -right-1 -top-2 min-w-4 rounded-full bg-secondary px-1 text-center text-[10px] font-bold text-on-secondary">
                {cartCount}
              </span> */}
                        <ShoppingCart size={23} />
                        <span className="hidden text-xs font-bold sm:inline">Cart</span>
                    </a>
                    <ThemeChanger />
                </div>
            </div>
            <nav className="bg-[#232f3e]">
                <div className="mx-auto flex max-w-max items-center gap-1 overflow-x-auto px-4 py-1.5 text-xs sm:gap-3 sm:px-6">
                    <a href="#categories" className="flex shrink-0 items-center gap-1 rounded px-2 py-1 font-bold text-white hover:bg-white/10">
                        <Menu size={15} /> All
                    </a>
                    <a href="#deals" className="rounded px-2 py-1 text-white hover:bg-white/10">Deals</a>
                    <a href="#benefits" className="rounded px-2 py-1 text-white hover:bg-white/10">Service</a>
                    <a href="#books" className="rounded px-2 py-1 text-white hover:bg-white/10">Registry</a>
                    <a href="#books" className="rounded px-2 py-1 text-white hover:bg-white/10">Gift Cards</a>
                    <Link href="/auth/register-seller" className="rounded px-2 py-1 text-white hover:bg-white/10">Sell</Link>
                    <a href="#deals" className="ml-auto hidden shrink-0 rounded px-2 py-1 font-bold text-white hover:bg-white/10 md:block">
                        Shop the Holiday Gift Guide
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default CustomerNavBar