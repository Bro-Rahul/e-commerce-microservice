import { OTPRequestType } from "@/types/auth/authTypes"
import { BASEURL } from ".."
import { RegisterFormSchema } from "@/types/zod/authSchema"

export const AUTHBASEURL = `${BASEURL}/user/auth`

export const registerUserRequest = async (registerUserRequest: RegisterFormSchema, role: string): Promise<number> => {

    const request = await fetch(`${AUTHBASEURL}/register-${role}/`, {
        method: "POST",
        body: JSON.stringify(registerUserRequest),
        headers: {
            "Content-Type": "application/json"
        },
    });
    if (!request.ok) {
        const errors = await request.json();
        throw new Error(errors.error || "Unable to register User at this moment");
    }

    return request.json();
}

export const otpVerificationRequest = async (otpRequest: OTPRequestType) => {

    const request = await fetch(`${AUTHBASEURL}/verify-opt/`, {
        method: "POST",
        body: JSON.stringify(otpRequest),
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (!request.ok) {
        const errors = await request.json();
        throw new Error(errors.error || "Unable to verify otp");
    }

    return request.json();
}