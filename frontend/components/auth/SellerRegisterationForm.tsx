'use client'

import { ShieldCheck } from 'lucide-react'
import { sellerRegisterationValidator, SellerRegistrationType } from '@/validators/auth/SellerRegisterationValidator'
import { FormProvider, useForm } from 'react-hook-form'
import { sellerRegistrationDefaults } from '@/constants/data'
import UserDetailForm from './UserDetailForm'
import AddressForm from './AddressForm'
import SellerProfileForm from './SellerProfileForm'
import { Button } from '../ui/button'
import { zodResolver } from '@hookform/resolvers/zod'

const SellerRegisterationForm = () => {

    const methods = useForm<SellerRegistrationType>({
        defaultValues: {
            ...sellerRegistrationDefaults
        },
        resolver: zodResolver(sellerRegisterationValidator)
    })

    const onSubmit = (data: SellerRegistrationType) => {
        console.log("data");
        console.log(data);
    }

    const onErr = (err: any) => {
        console.log("err");
        console.log(err);
    }
    return (
        <FormProvider {...methods}>
            <div className="mx-auto w-full max-w-5xl">
                <form className="min-w-0 space-y-3" id="seller-registration-form" onSubmit={methods.handleSubmit(onSubmit, onErr)}>
                    <UserDetailForm />
                    <AddressForm />
                    <SellerProfileForm />

                    <div className="flex items-start gap-2 rounded-sm bg-surface-container px-3 py-2.5 text-[10px] leading-4 text-on-surface-variant">
                        <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-secondary-container" />
                        <p><span className="font-semibold text-on-surface">Bank-grade 256-bit encryption.</span> Your password and payment details are never stored unhashed. Verified against national consumer safeguards.</p>
                    </div>
                    <Button
                        className="h-11 w-full rounded-sm border border-secondary-container bg-secondary text-sm font-bold text-on-secondary-container transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary hover:bg-secondary/80"
                        type="submit"
                    >
                        Create your Seller ID
                    </Button>
                </form>
            </div>
        </FormProvider>
    )
}

export default SellerRegisterationForm