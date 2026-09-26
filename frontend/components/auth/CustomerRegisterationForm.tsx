'use client'
import { CustomerRegistrationType, customerRegistrationValidator } from '@/validators/auth/CustomerRegisterationValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import UserDetailForm from './UserDetailForm'
import { ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { customerRegistrationDefaults } from '@/constants/data'
import AddressForm from './AddressForm'

const CustomerRegisterationForm = () => {
    const methods = useForm<CustomerRegistrationType>({
        defaultValues: {
            ...customerRegistrationDefaults
        },
        resolver: zodResolver(customerRegistrationValidator)
    })

    const test = customerRegistrationValidator.safeParse({
        ...customerRegistrationDefaults,
        password: "ddsdsdsdsd",
        confirmPassword: "",
    })
    console.log("ZOD TEST:", test)
    const onSubmit = (data: CustomerRegistrationType) => {

        console.log("data");
        console.log(data);
    }
    const onErr = (err: any) => {
        console.log("err")
        console.log(err);
    }

    return (
        <FormProvider {...methods}>
            <div className="mx-auto w-full max-w-5xl">
                <form
                    className="min-w-0 space-y-3"
                    onSubmit={methods.handleSubmit(onSubmit, onErr)}>

                    <UserDetailForm />
                    <AddressForm />
                    <div className="flex items-start gap-2 rounded-sm bg-surface-container px-3 py-2.5 text-[10px] leading-4 text-on-surface-variant">
                        <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-secondary-container" />
                        <p><span className="font-semibold text-on-surface">Bank-grade 256-bit encryption.</span> Your password and payment details are never stored unhashed. Protected by ShopDirect account safeguards.</p>
                    </div>
                    <Button
                        className="h-11 w-full rounded-sm border border-secondary-container bg-secondary text-sm font-bold text-on-secondary-container transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary hover:bg-secondary/80"
                        type="submit"
                    >
                        Create your ShopDirect ID
                    </Button>
                </form>
            </div>
        </FormProvider>
    )
}

export default CustomerRegisterationForm