'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'

const page = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        router.push(`/auth/verify?email=${encodeURIComponent(email)}`)
    }

    return (
        <main className="retail-page flex min-h-[calc(100vh-3.125rem)] justify-center px-4 pb-10 pt-[clamp(5rem,24vh,10.5rem)]">
            <section aria-labelledby="reset-heading" className="retail-card h-fit w-full max-w-87.5 p-5 shadow-sm">
                <h1 id="reset-heading" className="headline-lg mb-3">Password assistance</h1>
                <p className="body-md mb-5 text-on-surface-variant">
                    Enter the email address associated with your ShopDirect account to receive a verification code.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold" htmlFor="email">Email address</label>
                        <input
                            autoComplete="email"
                            className="inputfields"
                            id="email"
                            name="email"
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter your email"
                            required
                            type="email"
                            value={email}
                        />
                    </div>

                    <button className="h-10.5 w-full rounded-md border border-secondary-container bg-secondary text-on-secondary-container transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:translate-y-px" type="submit">
                        Send verification code
                    </button>
                </form>

                <div className="my-6 flex items-center gap-2 text-xs text-on-surface-variant">
                    <span aria-hidden="true" className="h-px flex-1 bg-outline-variant" />
                    <span>Remembered your password?</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-outline-variant" />
                </div>

                <a
                    className="flex h-9.5 w-full items-center justify-center rounded-md border border-outline-variant bg-surface-container text-sm text-on-surface transition hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                    href="/auth/login"
                >
                    Back to sign in
                </a>
            </section>
        </main>
    )
}

export default page