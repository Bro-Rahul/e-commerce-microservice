import z from "zod"
import { userRegisterationFieldsValidator } from "./UserFieldsValidator"
import { addressValidator } from "./AddressValidator"

export const sellerRegisterationValidator = z.object({
    ...userRegisterationFieldsValidator.shape,

    ...addressValidator.shape,

    businessEmail: z
        .string()
        .trim()
        .email("Enter a valid business email"),

    storeDescription: z
        .string()
        .trim()
        .min(1, "Store description must not be empty"),

    businessName: z
        .string()
        .trim()
        .min(1, "Business name must not be empty"),

    logoUrl: z
        .string()
        .trim()
        .min(1, "Logo URL must not be empty"),

    gstNumber: z
        .string()
        .trim()
        .min(1, "GST number must not be empty"),

    storeName: z
        .string()
        .trim()
        .min(1, "Store name must not be empty"),

    businessPhone: z
        .string()
        .trim()
        .min(1, "Business phone must not be empty"),

    accountNumber: z
        .string()
        .trim()
        .min(1, "Account number must not be empty"),

    ifscCode: z
        .string()
        .trim()
        .min(1, "IFSC code must not be empty"),
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

export type SellerRegistrationType =
    z.infer<typeof sellerRegisterationValidator>