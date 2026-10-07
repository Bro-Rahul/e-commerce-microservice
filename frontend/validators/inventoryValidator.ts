import z from "zod"
import { phoneAttributeValidator } from "./products/phoneValidator";


export const additionalFieldsValidator = z.array(z.object({
    key: z.string().nonempty(),
    value: z.string().nonempty()
}));

export const inventoryFieldValidator = z.object({
    sku: z.string().nonempty({ error: "SKU must not be empty" }),

    name: z.string().nonempty({ error: "Stock name must not be empty" }),

    price: z.coerce.number<number>().positive({ error: "Price must be an Positive number" }),

    quantity: z.coerce.number<number>().positive({ error: "quantity must be an Positive number" }),

    stockDescription: z.string().nonempty({ error: "stock Description must not be empty" }),

    additionalFields: additionalFieldsValidator

});


export type InventoryFieldType = z.infer<typeof inventoryFieldValidator>
export type AdditionalFieldsType = z.infer<typeof additionalFieldsValidator>