'use client'

import { Button } from '@/components/ui/button'
import { LoginRequestType, loginValidator } from '@/validators/auth/LoginRequestValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { EyeClosed, Eye } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import Link from 'next/link'

const page = () => {
    const [viewPassword, setViewPassword] = useState<boolean>(false);

    const { handleSubmit, control, register } = useForm<LoginRequestType>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(loginValidator)
    })
    const onSubmit = (data: LoginRequestType) => {
        console.log(data)
    }

    return (
        <main className="retail-page flex min-h-[calc(100vh-3.125rem)] justify-center px-4 pb-10 pt-[clamp(5rem,24vh,10.5rem)]">
            <section aria-labelledby="signin-heading" className="retail-card h-fit w-full max-w-87.5 p-5 shadow-sm">
                <h1 id="signin-heading" className="headline-lg mb-4">Sign in</h1>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name='email'
                        render={({ fieldState: { error } }) => <div className="space-y-1.5">
                            <label className="block text-xs font-semibold" htmlFor="username">Email</label>
                            <input
                                className='inputfields'
                                {...register('email')}
                                placeholder='Enter Email'
                                type='email'
                            />
                            {error?.message && <p className='error'>{error.message}</p>}
                        </div>
                        }
                    />

                    <Controller
                        control={control}
                        name='password'
                        render={({ fieldState: { error } }) =>
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between gap-3">
                                    <label className="text-xs font-semibold" htmlFor="password">Password</label>
                                    <Link
                                        href="/auth/forget-password"
                                        className="text-xs text-secondary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <input
                                        autoComplete="current-password"
                                        className="inputfields pr-10"
                                        id="password"
                                        placeholder="Enter Password"
                                        type={viewPassword ? 'text' : 'password'}
                                        {...register('password')}
                                    />
                                    <button
                                        aria-label={viewPassword ? 'Hide password' : 'Show password'}
                                        aria-pressed={viewPassword}
                                        className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-on-surface-variant hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-secondary"
                                        onClick={() => setViewPassword((visible) => !visible)}
                                        type="button"
                                    >
                                        {!viewPassword ? <EyeClosed aria-hidden="true" size={18} /> : <Eye aria-hidden="true" size={18} />}
                                    </button>
                                </div>
                                {error?.message && <p className='error'>{error.message}</p>}
                            </div>
                        }
                    />
                    <Button className="h-10.5 w-full rounded-md border border-secondary-container bg-secondary text-on-secondary-container transition hover:brightness-95 hover:bg-secondary/80 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:translate-y-px" type="submit">
                        Sign in
                    </Button>

                </form>

                <div className="my-7 flex items-center gap-2 text-xs text-on-surface-variant">
                    <span aria-hidden="true" className="h-px flex-1 bg-outline-variant" />
                    <span>New to ShopDirect?</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-outline-variant" />
                </div>

                <Link href={'/auth/register-customer'}>
                    <button
                        className="h-9.5 w-full rounded-md border border-outline-variant bg-surface-container text-sm transition hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                        type="button"
                    >
                        Create your ShopDirect account
                    </button>
                </Link>
            </section>
        </main>
    )
}

export default page