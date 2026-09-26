import z from "zod"


export const loginValidator = z.object({
    email: z.email().nonempty({ error: "Email must not be empty" }),
    password: z.string().nonempty({ error: "Password must not be empty" })
})


export type LoginRequestType = z.infer<typeof loginValidator>; 
