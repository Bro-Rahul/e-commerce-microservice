import LoginCard from '@/components/auth/LoginCard'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Login Account",
  description: "Access your ShopDirect account.",
};

const LoginPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-surface-container px-4 py-10">
      <LoginCard />
    </main>
  )
}

export default LoginPage