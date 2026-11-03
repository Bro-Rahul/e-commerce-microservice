"use client"
import Link from 'next/link'
import ThemeChanger from '../ui/ThemeChanger'

const SellerNavBar = () => {

    return (
        <header className="sticky top-0 z-40 text-white">
            <div className="bg-[#0e1a28] flex justify-between items-center px-10">
                <div className=" gap-3 px-4 py-2 sm:gap-5 sm:px-6">
                    <Link href="/" className="shrink-0 text-xl font-black tracking-tight text-white sm:text-2xl">
                        ShopDirect
                    </Link>
                </div>
                <ThemeChanger />
            </div>
        </header>
    )
}

export default SellerNavBar