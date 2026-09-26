import z from "zod"

export const userRegisterationFieldsValidator = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters")
        .nonempty({ error: 'First Name must not be empty' }),

    lastName: z
        .string()
        .trim()
        .min(2, "Last name must be at least 2 characters"),

    email: z
        .email("Invalid email address"),

    phoneCountryCode: z
        .string()
        .min(1, "Country code is required"),

    phoneNumber: z
        .string()
        .regex(/^\d{7,15}$/, "Invalid phone number"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),

    confirmPassword: z
        .string()
        .nonoptional()
})
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "Passwords do not match",
            })
        }
    })

export type UserRegisterFieldsType = z.infer<typeof userRegisterationFieldsValidator>;