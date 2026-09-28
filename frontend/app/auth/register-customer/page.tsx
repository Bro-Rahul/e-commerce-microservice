'use client'

import Link from 'next/link'
import { CreditCard, UserRound } from 'lucide-react'
import CustomerRegisterationForm from '@/components/auth/CustomerRegisterationForm'



const page = () => {

    return (
        <main className="retail-page min-h-[calc(100vh-3.125rem)]">
            <div className="mx-auto w-[80%] max-w-5xl py-4">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="mb-1 text-[10px] text-on-surface-variant">Registration Portal <span className="px-1">/</span> Account Setup</p>
                        <h1 className="text-xl font-bold leading-7 text-on-surface">Create your ShopDirect ID</h1>
                        <p className="text-xs text-on-surface-variant">Seamless unified identity for direct customer shopping and merchant storefronts.</p>
                    </div>
                </div>

                <div className="mb-3 flex w-fit items-center rounded-sm border border-outline-variant bg-surface-container-lowest p-1">
                    <span aria-current="page" className="flex h-8 items-center gap-2 bg-primary px-4 text-[11px] font-semibold text-primary-foreground">
                        <UserRound aria-hidden="true" className="size-3.5" /> Customer Account
                    </span>
                    <Link className="flex h-8 items-center gap-2 px-4 text-[11px] text-on-surface-variant transition hover:bg-surface-container" href="/auth/register-seller">
                        <CreditCard aria-hidden="true" className="size-3.5" /> Seller / Merchant
                    </Link>
                </div>
                <CustomerRegisterationForm />
            </div>
            <footer className="border-t border-outline-variant bg-surface-container px-5 py-3 text-center text-[10px] text-on-surface-variant">
                <div className="mb-1 flex justify-center gap-4"><a href="#conditions">Conditions of Use</a><a href="#privacy">Privacy Notice</a><a href="#help">Help</a></div>
                <p>© 2026 ShopDirect. All rights reserved.</p>
            </footer>
        </main>
    )
}

export default page