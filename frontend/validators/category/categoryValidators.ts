import z from "zod"


export const createCategoryValidator = (availableCategory: string[]) => z.object({
    name: z.string().min(3, { error: "Category must be 3 character long" }).nonempty({ error: "Category must not be left Empty" }),
    description: z.string().min(3, { error: "Description must be 3 character long" }).nonempty({ error: "Description must not be left Empty" }),
    parentCategoryName: z.string()
}).superRefine((data, ctx) => {
    if (availableCategory.includes(data.name.trim().toLowerCase())) {
        ctx.addIssue({
            code: "custom",
            message: "This Category is already present!",
            path: ["name"]
        })
    }

    if (data.parentCategoryName.length !== 0 && !availableCategory.includes(data.parentCategoryName.trim())) {
        ctx.addIssue({
            code: "custom",
            message: "No Such Category exits create an new One first!",
            path: ["parentCategory"]
        })
    }

});


export type CreateCategoryType = {
    name: string,
    description: string,
    parentCategoryName: string
}