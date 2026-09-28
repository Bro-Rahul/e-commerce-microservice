'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

const codeLength = 6

const otpValidator = z.object({
    otp: z.array(z.object({
        code: z.string().regex(/^\d$/, 'Enter all six digits to verify your email.'),
    })).length(codeLength),
})

type OTPFormValues = z.infer<typeof otpValidator>

const page = () => {
    const [email, setEmail] = useState('')
    const [notice, setNotice] = useState('')
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<OTPFormValues>({
        defaultValues: {
            otp: Array.from({ length: codeLength }, (_, index) => ({ code: '' }))
        },
        resolver: zodResolver(otpValidator),
    })

    const { fields } = useFieldArray<OTPFormValues, 'otp'>({
        name: 'otp',
        control,
    });

    const code = watch('otp')

    useEffect(() => {
        setEmail(new URLSearchParams(window.location.search).get('email') ?? '')
    }, [])

    const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && !code[index]?.code && index > 0) {
            inputRefs.current[index - 1]?.focus()
        } else if (event.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus()
        } else if (event.key === 'ArrowRight' && index < codeLength - 1) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleCodeChange = (index: number, value: string) => {
        const digits = value.replace(/\D/g, '')
        const digitsToSet = digits.length > 1 ? digits.slice(0, codeLength - index).split('') : [digits]

        digitsToSet.forEach((digit, offset) => {
            const targetIndex = index + offset
            if (targetIndex < codeLength) {
                const fieldName = `otp.${targetIndex}.code` as const
                setValue(fieldName, digit, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
            }
        })

        if (digits && index < codeLength - 1) {
            inputRefs.current[Math.min(index + digitsToSet.length, codeLength - 1)]?.focus()
        }
    }

    const handlePaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
        const digits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, codeLength - index)
        if (!digits) return

        event.preventDefault()
        handleCodeChange(index, digits)
        inputRefs.current[Math.min(index + digits.length, codeLength - 1)]?.focus()
    }


    const onSubmit = (_data: OTPFormValues) => {
        setNotice('OTP verification is not connected yet.')
    }

    return (
        <main className="retail-page flex min-h-[calc(100vh-3.125rem)] flex-col">
            <div className="flex flex-1 items-center justify-center px-4 py-10">
                <section aria-labelledby="verify-heading" className="retail-card  w-full max-w-80 p-5 shadow-sm">
                    <h1 id="verify-heading" className="headline-md mb-1">Verify email address</h1>
                    <p className="mb-4 text-[11px] leading-4 text-on-surface-variant">
                        To verify your email, enter the One Time Password (OTP) sent to{' '}
                        <span className="font-semibold text-on-surface">{email || 'your email address'}</span>.{' '}

                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div aria-label="One-time password" className="mb-5 grid grid-cols-6 gap-1.5">
                            {fields.map((field, index) => {
                                const { ref, ...registration } = register(`otp.${index}.code`)
                                return (
                                    <input
                                        {...registration}
                                        key={field.id}
                                        ref={(element) => {
                                            ref(element)
                                            inputRefs.current[index] = element
                                        }}
                                        aria-label={`Digit ${index + 1} of ${codeLength}`}
                                        autoComplete={index === 0 ? 'one-time-code' : 'off'}
                                        className="inputfields text-center"
                                        inputMode="numeric"
                                        maxLength={codeLength}
                                        onChange={(event) => handleCodeChange(index, event.target.value)}
                                        onKeyDown={(event) => handleKeyDown(index, event)}
                                        onPaste={(event) => handlePaste(index, event)}
                                        pattern="[0-9]*"
                                        type="text"
                                    />
                                )
                            })}
                        </div>

                        <button className="h-10 w-full rounded-sm border border-secondary-container bg-secondary text-xs font-semibold text-on-secondary-container transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:translate-y-px" type="submit">
                            Verify OTP
                        </button>
                        {errors.otp && <p className="mt-2 text-xs text-error" role="alert">Enter all six digits to verify your email.</p>}
                    </form>

                    {notice && <p aria-live="polite" className="mt-3 text-xs text-on-surface-variant">{notice}</p>}

                    <div className="my-3 border-t border-outline-variant pt-2.5 text-[10px] text-on-surface-variant">
                        <div className="flex items-center justify-between gap-3">
                            <span>Didn&apos;t receive the code?</span>
                            <button
                                className="font-medium text-secondary-container hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                                onClick={() => setNotice('OTP resend is not connected yet.')}
                                type="button"
                            >
                                Resend OTP
                            </button>
                        </div>
                        <Link
                            className="mt-2 block text-center text-secondary-container hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                            href={`/auth/forget-password${email ? `?email=${encodeURIComponent(email)}` : ''}`}
                        >
                            Change email address
                        </Link>
                    </div>
                </section>
            </div>

            <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-outline-variant bg-surface-container px-5 py-3 text-[10px] text-on-surface-variant">
                <div>
                    <p className="font-semibold text-on-surface">ShopDirect</p>
                    <p>© 2026 ShopDirect. All rights reserved.</p>
                </div>
                <div aria-label="Support and policies" className="flex flex-wrap gap-4">
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                    <span>Contact Support</span>
                </div>
            </footer>
        </main>
    )
}

export default page

