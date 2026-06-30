
export type LoginResponseType = {
    id: number,
    username: string,
    email: string,
    role: "CUSTOMER" | "SELLER" | "ADMIN",
    avatar: string | null,
    token: string
}

export type OTPRequestType = {
    otpCode: string,
    userId: number
}