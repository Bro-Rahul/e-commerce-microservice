import z from "zod"
import { userRegisterationFieldsValidator } from "./UserFieldsValidator"
import { addressValidator } from "./AddressValidator"

export const sellerRegisterationValidator = z.object({
    ...userRegisterationFieldsValidator.shape,

    ...addressValidator.shape,

    legalName: z
        .string()
        .trim()
        .min(1, "Legal name must not be empty"),

    storeName: z
        .string()
        .trim()
        .min(1, "Store name must not be empty"),

    businessType: z
        .string()
        .trim()
        .min(1, "Business type must be selected"),

    productCategory: z
        .string()
        .trim()
        .min(1, "Product category must be selected"),

    taxNumber: z
        .string()
        .trim()
        .min(1, "Tax number must not be empty"),

    registrationNumber: z
        .string()
        .trim()
        .min(1, "Registration number must not be empty"),

    accountHolder: z
        .string()
        .trim()
        .min(1, "Account holder name must not be empty"),

    bankAccount: z
        .string()
        .trim()
        .min(1, "Bank account number must not be empty"),

    routingCode: z
        .string()
        .trim()
        .min(1, "Routing code must not be empty"),
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