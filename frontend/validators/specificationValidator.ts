import z from "zod";

export const keyValuePairValidator = z.object({
    key: z.string().nonempty({ error: "Key must not be empty" }),
    value: z.string().nonempty({ error: "Value must not be empty" })
})

export const specificationValidator = z.array(z.object({
    name: z.string().nonempty({ error: "Specification Name must not be empty" }),
    specifications: z.array(keyValuePairValidator)
}))

export type keyValuePairType = z.infer<typeof keyValuePairValidator>
export type SpecificationType = z.infer<typeof specificationValidator>