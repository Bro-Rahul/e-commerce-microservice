import z from "zod";


export const arrayFieldsValidator = z.object({
    arrayData: z
        .array(
            z.object({
                value: z
                    .string()
                    .trim()
                    .min(1, "Item must not be empty"),
            })
        )
        .min(1, "Please mention at least one item in the box"),
})


export type ArrayFieldsForm = z.infer<typeof arrayFieldsValidator>
