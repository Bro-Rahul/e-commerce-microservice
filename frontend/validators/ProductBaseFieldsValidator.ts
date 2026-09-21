import z from "zod"

export const productBaseFieldsValidator = z.object({
    title: z.string().nonempty({ error: "Title must not be empty" }),
    description: z.string().nonempty({ error: "Description must not be empty" }),
    category: z.string().nonempty({ error: "Category must not be empty" }),
    about: z.string().nonempty({ error: "About must not be empty" })
})

export default productBaseFieldsValidator;
export type ProductBaseFieldsType = z.infer<typeof productBaseFieldsValidator>