import Link from "next/link";

const Header = () => {
    return (
        <header className="sticky top-0 z-100 w-full">
            {/* Top Header */}
            <div className="bg-primary shadow-md">
                <div className="max-w-350 mx-auto px-6 lg:px-12 py-3 flex items-center gap-4">
                    {/* Logo */}
                    <a
                        href="#"
                        className="text-2xl font-bold text-white whitespace-nowrap"
                    >
                        ShopDirect
                    </a>

                    {/* Location */}
                    <div className="hidden lg:flex items-center text-gray-100 cursor-pointer hover:border hover:border-white p-2 rounded-sm transition">
                        <span className="material-symbols-outlined mr-1">
                            location_on
                        </span>

                        <div className="flex flex-col">
                            <span className="text-xs text-gray-300 leading-none">
                                Deliver to
                            </span>
                            <span className="text-sm font-bold leading-none">
                                New York 10001
                            </span>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="grow">
                        <div className="flex bg-white rounded-md overflow-hidden">
                            <select className="bg-gray-100 text-gray-700 px-3 border-r border-gray-200 focus:outline-none">
                                <option>All Departments</option>
                            </select>

                            <input
                                type="text"
                                placeholder="Search ShopDirect"
                                className="grow px-4 py-2 text-gray-800 focus:outline-none"
                            />

                            <button className="bg-amber-400 px-5 hover:bg-amber-500 transition">
                                <span className="material-symbols-outlined text-slate-900">
                                    search
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4 text-white">
                        <Link href={"/login"}>
                            <div className="hidden xl:flex flex-col cursor-pointer hover:border hover:border-white p-2 rounded-sm">
                                <span className="text-xs text-gray-300">
                                    Hello, Sign In
                                </span>
                                <span className="text-sm font-bold">
                                    Account & Lists
                                </span>
                            </div>
                        </Link>

                        <div className="hidden xl:flex flex-col cursor-pointer hover:border hover:border-white p-2 rounded-sm">
                            <span className="text-xs text-gray-300">
                                Returns
                            </span>
                            <span className="text-sm font-bold">
                                & Orders
                            </span>
                        </div>

                        <a
                            href="#"
                            className="flex items-end relative hover:border hover:border-white p-2 rounded-sm"
                        >
                            <span className="absolute -top-1 right-2 bg-amber-400 text-slate-900 text-xs font-bold px-1.5 rounded-full">
                                0
                            </span>

                            <span className="material-symbols-outlined text-[32px]">
                                shopping_cart
                            </span>

                            <span className="ml-1 hidden md:block font-bold">
                                Cart
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <nav className="bg-slate-800 text-white border-t border-slate-700">
                <div className="max-w-350 mx-auto px-6 lg:px-12 h-10 flex items-center gap-6">
                    <button className="flex items-center font-semibold hover:bg-slate-700 px-2 py-1 rounded transition">
                        <span className="material-symbols-outlined mr-1 text-[20px]">
                            menu
                        </span>
                        All
                    </button>

                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href="#"
                            className="hover:bg-slate-700 px-2 py-1 rounded transition"
                        >
                            Deals
                        </a>

                        <a
                            href="#"
                            className="hover:bg-slate-700 px-2 py-1 rounded transition"
                        >
                            Service
                        </a>

                        <a
                            href="#"
                            className="hover:bg-slate-700 px-2 py-1 rounded transition"
                        >
                            Registry
                        </a>

                        <a
                            href="#"
                            className="hover:bg-slate-700 px-2 py-1 rounded transition"
                        >
                            Gift Cards
                        </a>

                        <a
                            href="#"
                            className="hover:bg-slate-700 px-2 py-1 rounded transition"
                        >
                            Sell
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;