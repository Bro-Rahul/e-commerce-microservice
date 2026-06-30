"use client";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { Button } from "../ui/button";
import useEmailVerification from "@/store/useEmailVerification";
import toast from "react-hot-toast";
import { otpVerificationRequest } from "@/http/auth";
import { useRouter } from "next/navigation";

const OTPVerificationCard = () => {
    const [otp, setOTP] = useState("");
    const userId = useEmailVerification((state) => state.userId);
    const router = useRouter();

    const onSubmit = async () => {
        const toastId = toast.loading("Validating the OTP...");

        try {
            await otpVerificationRequest({
                userId: userId!,
                otpCode: otp,
            });
            toast.success("Email Verification Completed", {
                id: toastId,
            });

            router.push("/login")

        } catch (err: any) {
            toast.error(err, {
                id: toastId,
            });
        }
    }


    return (
        <div className="flex flex-col items-center text-center space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-on-surface">
                    Verify your account
                </h3>

                <p className="mt-2 text-sm text-on-surface-variant">
                    We've sent a 6-digit verification code to your email.
                </p>
            </div>

            <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOTP}
                className="justify-center"
            >
                <InputOTPGroup className="gap-2">
                    <InputOTPSlot index={0} className="h-12 w-12 rounded-lg" />
                    <InputOTPSlot index={1} className="h-12 w-12 rounded-lg" />
                    <InputOTPSlot index={2} className="h-12 w-12 rounded-lg" />
                    <InputOTPSlot index={3} className="h-12 w-12 rounded-lg" />
                    <InputOTPSlot index={4} className="h-12 w-12 rounded-lg" />
                    <InputOTPSlot index={5} className="h-12 w-12 rounded-lg" />
                </InputOTPGroup>
            </InputOTP>

            <Button
                disabled={otp.length !== 6}
                onClick={onSubmit}
                className="w-full rounded-xl bg-secondary py-3 font-medium text-on-secondary-container transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-secondary/80 cursor-pointer
        "
            >
                Verify OTP
            </Button>

            <p className="text-sm text-on-surface-variant">
                Didn't receive the code?{" "}
                <Button
                    variant={'ghost'}
                    className="font-medium text-secondary hover:underline"
                >
                    Resend
                </Button>
            </p>
        </div>
    );
};

export default OTPVerificationCard;