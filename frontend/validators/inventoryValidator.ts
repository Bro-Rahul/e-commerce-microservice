import z from "zod"
import { phoneFieldsValidator } from "./products/phoneValidator";
import { bookFieldsValidator } from "./products/bookValidator";


export const additionalFieldsValidator = z.array(z.object({
    key: z.string().nonempty(),
    value: z.string().nonempty()
}));

export const baseInventoryFieldValidator = z.object({
    sku: z.string().nonempty({ error: "SKU must not be empty" }),

    name: z.string().nonempty({ error: "Stock name must not be empty" }),

    price: z.number().positive({ error: "Price must be an Positive number" }).nonoptional(),

    quantity: z.number().positive({ error: "quantity must be an Positive number" }).nonoptional(),

    stockDescription: z.string().nonempty({ error: "stock Description must not be empty" }),

    additionalFields: additionalFieldsValidator

});


export const phoneInventoryValidators = baseInventoryFieldValidator.extend(phoneFieldsValidator.shape);
export const bookInventoryValidators = baseInventoryFieldValidator.extend(bookFieldsValidator.shape)


export type PhoneInventoryType = z.infer<typeof phoneInventoryValidators>
export type BookInventoryType = z.infer<typeof bookInventoryValidators>
export type BaseInventoryFieldType = z.infer<typeof baseInventoryFieldValidator>
export type AdditionalFieldsType = z.infer<typeof additionalFieldsValidator>

export type AvailableInventoryType = PhoneInventoryType | BookInventoryType