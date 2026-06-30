"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm, Controller } from "react-hook-form"
import { LoginFromSchema } from "@/types/zod/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidator } from "@/validators/authValidator";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginForm({ mode }: { mode: "customer" | "seller" }) {
    const router = useRouter();
    const { control, handleSubmit } = useForm<LoginFromSchema>({
        resolver: zodResolver(loginValidator),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    const onSubmit = async (loginData: LoginFromSchema) => {
        try {
            const result = await signIn("credentials", {
                username: loginData.username,
                password: loginData.password,
                redirect: false,
            });

            if (!result?.ok) {
                toast.error(result?.error ?? "Invalid username or password", {
                    position: "bottom-right",
                    duration: 5000
                });
                return;
            }

            toast.success("Login successful", {
                position: "bottom-right",
                duration: 5000
            });

            router.push("/");
        } catch (error) {
            toast.error("Something went wrong", {
                position: "bottom-right",
                duration: 5000
            });
        }
    }


    return (
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

            {/* Username */}
            <Controller
                name="username"
                control={control}
                render={({ field: { name, onChange, value, }, formState: { errors } }) => <div>
                    <label className="block text-sm font-medium mb-2">
                        Username
                    </label>
                    <Input
                        type="text"
                        name={name}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        placeholder="Enter your Username"
                        className="w-full rounded-xl border border-outline bg-background px-4 py-3 outline-none transition-all focus:border-secondary-container focus:ring-"
                    />
                    {errors.username && <p className="text-sm text-red-500">{errors.username?.message}</p>}

                </div>
                }
            />

            {/* Password */}
            <Controller
                name="password"
                control={control}
                render={({ field: { name, value, onChange }, formState: { errors } }) =>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium">
                                Password
                            </label>

                            <a
                                href="#"
                                className="text-sm text-secondary hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>

                        <Input
                            type="password"
                            name={name}
                            value={value}
                            onChange={e => onChange(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full rounded-xl border border-outline bg-background px-4 py-3 outline-none transition-all focus:ring-1"
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>
                }

            />

            {/* Login */}
            <Button
                className=" w-full rounded-xl bg-secondary hover:bg-secondary/90 cursor-pointer py-3 font-semibold text-on-secondary-container transition-all hover:brightness-95 hover:shadow-lg active:scale-[0.98]">
                Sign in
            </Button>

            {/* Divider */}
            <div className="relative py-3">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-outline-variant" />
                </div>

                <div className="relative flex justify-center">
                    <span className="bg-surface-container-lowest px-4 text-sm text-on-surface-variant">
                        New to ShopDirect?
                    </span>
                </div>
            </div>

            {/* Signup */}
            <Link href={'/register'}>
                <Button
                    variant={'outline'}
                    className=" w-full text-black rounded-xl border border-outline cursor-pointer py-3 font-medium transition-all hover:bg-surface-container hover:shadow-sm">
                    Create your account
                </Button>
            </Link>

        </form>
    );
}