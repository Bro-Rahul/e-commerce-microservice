import z from "zod"

export const addressValidator = z.object({
    countryRegion: z.string().min(1, "Country/Region is required"),

    addressLine1: z
        .string()
        .min(5, "Address must be at least 5 characters")
        .max(150, "Address is too long"),

    addressLine2: z
        .string()
        .max(150, "Address is too long")
        .optional()
        .or(z.literal("")),

    city: z.string().min(1, "City is required"),

    state: z.string().min(1, "State is required"),

    postalCode: z
        .string()
        .min(1, "Postal code is required"),

    areaCode: z
        .string()
        .min(1, "Area code is required"),
})


export type AddressType = z.infer<typeof addressValidator>;