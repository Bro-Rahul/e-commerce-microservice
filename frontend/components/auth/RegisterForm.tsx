"use client"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { RegisterFormSchema } from '@/types/zod/authSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerValidator } from '@/validators/authValidator'
import { registerUserRequest } from '@/http/auth'
import toast from 'react-hot-toast'
import useEmailVerification from '@/store/useEmailVerification'
import { useRouter } from 'next/navigation'

const RegisterForm = ({ mode }: { mode: "customer" | "seller" }) => {

    const router = useRouter();
    const setUserId = useEmailVerification((state) => state.setUserId)

    const { control, handleSubmit } = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerValidator),
        defaultValues: {
            email: "",
            password: "",
            username: ""
        }
    })

    const onSubmit = async (registerData: RegisterFormSchema) => {
        const toastId = toast.loading("Authenticating...");

        try {
            const userId = await registerUserRequest(registerData, mode);
            setUserId(userId);
            toast.success("Register successful", {
                id: toastId,
            });

            router.push("/otpVerification")

        } catch (err) {
            toast.error("Register fail", {
                id: toastId,
            });
        }
    }

    return (

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

            {/* Email */}
            <Controller
                control={control}
                name='username'
                render={({ field: { name, value, onChange }, formState: { errors } }) =>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Username
                        </label>
                        <Input
                            name={name}
                            value={value}
                            onChange={e => onChange(e.target.value)}
                            type="text"
                            placeholder="Enter your Username"
                            className="w-full rounded-xl border border-outline bg-background px-4 py-3 outline-none transition-all focus:border-secondary-container focus:ring-1 "
                        />
                        {errors.username && <p className="text-sm text-red-500">{errors.username?.message}</p>}
                    </div>
                }
            />

            {/* Email */}
            <Controller
                name='email'
                control={control}
                render={({ field: { name, value, onChange }, formState: { errors } }) => <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">
                            Email
                        </label>
                    </div>

                    <Input
                        name={name}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        type="email"
                        placeholder="Enter your Email"
                        className="w-full rounded-xl border border-outline bg-background px-4 py-3 outline-none transition-all focus:ring-1"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email?.message}</p>}
                </div>}

            />

            {/* Password */}
            <Controller
                control={control}
                name='password'
                render={({ field: { name, value, onChange }, formState: { errors } }) => <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">
                            Password
                        </label>
                    </div>

                    <Input
                        name={name}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-outline bg-background px-4 py-3 outline-none transition-all focus:ring-1"
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password?.message}</p>}

                </div>}
            />

            {/* Login */}
            <Button
                className=" w-full rounded-xl bg-secondary hover:bg-secondary/90 cursor-pointer py-3 font-semibold text-on-secondary-container transition-all hover:brightness-95 hover:shadow-lg active:scale-[0.98]">
                Sign Up
            </Button>

            {/* Divider */}
            <div className="relative py-3">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-outline-variant" />
                </div>

                <div className="relative flex justify-center">
                    <span className="bg-surface-container-lowest px-4 text-sm text-on-surface-variant">
                        Already Have an Account?
                    </span>
                </div>
            </div>

            {/* Signup */}
            <Link href={'/login'}>
                <Button
                    variant={'outline'}
                    className=" w-full text-black rounded-xl border border-outline cursor-pointer py-3 font-medium transition-all hover:bg-surface-container hover:shadow-sm">
                    Login
                </Button>
            </Link>

        </form>

    )
}

export default RegisterForm