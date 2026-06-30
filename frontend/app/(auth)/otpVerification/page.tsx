"use client"
import OTPVerificationCard from '@/components/auth/OTPVerificationCard'


const OTPVerificationPage = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-surface-container px-4 py-10">
            <div className='w-full max-w-md'>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 shadow-xl">
                    <h2 className="text-2xl font-semibold text-on-surface mb-6">
                        Sign Up Completion
                    </h2>
                    <OTPVerificationCard />
                </div>
            </div>
        </main>
    )
}

export default OTPVerificationPage