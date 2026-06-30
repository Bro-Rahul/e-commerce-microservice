import z, { email } from "zod";

export const loginValidator = z.object({
    username: z.string().min(3, "Username must be contain atleast 3 characters").max(50, "Username must be contain atmax 50 characters"),
    password: z.string().min(3, "Password must be contain atleast 3 characters").max(50, "Password must be contain atmax 50 characters")
})

export const registerValidator = z.object({
    username: z.string().min(3, "Username must be contain atleast 3 characters").max(50, "Username must be contain atmax 50 characters"),
    password: z.string().min(3, "Password must be contain atleast 3 characters").max(50, "Password must be contain atmax 50 characters"),
    email: z.email().nonempty()
})