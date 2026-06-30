import RegisterCard from '@/components/auth/RegisterCard'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Register Account",
};

const RegisterPage = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-surface-container px-4 py-10">
            <RegisterCard />
        </main>
    )
}

export default RegisterPage