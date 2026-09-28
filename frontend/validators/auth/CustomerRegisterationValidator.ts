import z from "zod";
import { userRegisterationFieldsValidator } from "./UserFieldsValidator";
import { addressValidator } from "./AddressValidator";


export const customerRegistrationValidator = z.object({
    ...userRegisterationFieldsValidator.shape,
    ...addressValidator.shape
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
export type CustomerRegistrationType = z.infer<typeof customerRegistrationValidator>; 