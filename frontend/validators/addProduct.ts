import { AvailableCategory } from "@/types/seller";
import z from "zod"

export const baseValidator = z.object({
    title: z.string().min(10),
    description: z.string().min(30),
    price: z.number().positive({ error: "Price must not be an Negative Number" }),
    about: z.string(),
})


export const phoneValidator = baseValidator.extend({
    brand: z.string(),
    operatingSystem: z.string(),
    ram: z.string(),
    cpuModel: z.string(),
    cpuSpeed: z.string(),
    insideBox: z.array(z.string().nonempty({ error: "Content should not left blank" })).min(1, { error: "Add atleast one value " })
})


export const bookValidator = baseValidator.extend({
    publisher: z.string(),
    publicationDate: z.date(),
    edition: z.string(),
    language: z.string(),
    printLength: z.string(),
    isbn_10: z.string(),
    isbn_13: z.string(),
    reading_age: z.number().positive(),
    itemWeight: z.string(),
    dimensions: z.string(),
    countryOfOrigin: z.string(),
    netQuantity: z.string(),
    importer: z.string()

});

export const imageValidator = z.object({
    id: z.string(),
    name: z.string(),
    previewURL: z.string(),
    isCoverImage: z.boolean(),
    file: z.instanceof(File),
})



export const mediaAssetsValidator = z.object({
    productImages: z.array(imageValidator).min(1, {
        error: "Provide Atleast one Image for Cover Image"
    }),
    images: z.array(z.object({
        file: z.instanceof(File)
    })).optional()
})


export const keyValuePairValidator = z.object({
    key: z.string().min(1, { error: "key name should not be leave blank" }),
    value: z.string().min(1, { error: "value should not be leave blank" })
});

export const specificationValidator = z.object({
    name: z.string().min(3, {
        error: "Name should be at least 3 characters long",
    }),
    specification: z.array(keyValuePairValidator).optional()
});

export const productSpecificationValidator = z.object({
    specifications: z.array(specificationValidator).min(1, {
        error: "Please provide at least one specification",
    }),
});


export const baseInventoryValidator = z.object({
    varientName: z.string().min(3, { error: "Varient Name must contain atleast 3 charaters or more" }),
    sku: z.string().min(3, { error: "Sku must contain atleast 3 charaters or more" }),
    price: z.number().positive({ error: "Price must be an positive number " }),
    stock: z.number().positive({ error: "Stock must be an positive number" }),
    varientAttributes: z.array(keyValuePairValidator).optional()
})

export const productInventoryValidator = z.object({
    inventory: z.array(baseInventoryValidator).min(1, { error: "Please Provide atleast 1 product varient" })
})


export type PhoneValidatorSchema = z.infer<typeof phoneValidator>;
export type BookValidatorSchema = z.infer<typeof bookValidator>
export type BaseFeildsValidatorSchema = z.infer<typeof baseValidator>
export type ProductMediaValidatorSchema = z.infer<typeof mediaAssetsValidator>
export type ProductSpecificationSchema = z.infer<typeof productSpecificationValidator>;
export type ProductInventorySchema = z.infer<typeof productInventoryValidator>


export const productValidatorMapping = {
    Phones: phoneValidator,
    Books: bookValidator
}



export const getProductRequestValidator = (catagory: AvailableCategory) => {
    const schema = z.object({
        productBase: baseValidator,
        productMetaDetail: productValidatorMapping[catagory],
        productStocks: productInventoryValidator,
    })

    return schema;
}