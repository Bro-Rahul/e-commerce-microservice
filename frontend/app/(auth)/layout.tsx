import React from 'react'
import options from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";


const layout = async ({
    children
}: { children: React.ReactNode }) => {
    const session = await getServerSession(options);
    if (session?.user) {
        redirect("/");
    }

    return (
        <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-orange-50">
            <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-primary shadow-sm backdrop-blur-md">
                <div className=" mx-auto flex h-16 max-w-7xl items-center px-gutter">
                    <span className=" text-2xl font-bold italic tracking-tight text-white select-none w-full text-center">
                        ShopDirect
                    </span>
                </div>
            </header>
            {children}
        </div>
    )
}

export default layout