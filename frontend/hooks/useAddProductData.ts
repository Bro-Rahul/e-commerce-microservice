import { getImagesByCategory } from '@/lib/imageService';
import useAddProduct from '@/store/useAddProduct';
import { AvailableCategory } from '@/types/seller';
import z from "zod"




const productBaseRequestSchema = z.object({
    title: z.string({ error: "Title is required " }),
    description: z.string({ error: "Description is required" }),
    price: z.number().nonnegative({ error: "Price must not be negative" }),
    metaDetail: z.record(z.string(), z.any()),
    category: z.string({ error: "Category is required" }),
    aboutItem: z.string({ error: "About Item is required" })
});

const productStockVariantsSchema = z.object({
    varientName: z.string(),
    stock: z.number().nonnegative({ error: "Stocks value must be positive" }),
    sku: z.string(),
    price: z.number().nonnegative({ error: "Price must not be negative number" }),
    attributes: z.array(z.string()).optional(),
    values: z.array(z.string()).optional()
})

const productImageDataSchema = z.object({
    name: z.string(),
    isCoverImage: z.boolean(),
})


const productCreationRequestSchema = z.object({
    productBase: productBaseRequestSchema,
    productStock: z.array(productStockVariantsSchema),
});


type CreateNewProductSchema = z.infer<typeof productCreationRequestSchema>
type ProductStockSchema = z.infer<typeof productStockVariantsSchema>

const useAddProductData = (category: AvailableCategory) => {
    const { products, productSpecifications, inventory } = useAddProduct();
    const { title, description, about, price, ...rest } = products[category]
    const inventoryData: ProductStockSchema[] = inventory[category].inventory.map(item => ({
        ...item,
        attributes: item.varientAttributes?.map(attr => attr.key) || [],
        values: item.varientAttributes?.map(attr => attr.value) || []
    }));


    const getProductData = (): CreateNewProductSchema => {

        const productData: CreateNewProductSchema = {
            productBase: {
                aboutItem: about,
                category: category,
                description: description,
                metaDetail: {
                    ...rest,
                    specifications: productSpecifications[category].specifications
                },
                price: price,
                title: title
            },
            productStock: inventoryData
        }

        return productData;
    }


    const createProduct = async (token: string) => {
        const formData = new FormData();
        const payload = getProductData();
        const images = await getImagesByCategory(category);

        formData.append("productBase", new Blob([
            JSON.stringify(payload.productBase)
        ], {
            type: "application/json"
        }))

        formData.append("productStock", new Blob([
            JSON.stringify({
                "productStocks": payload.productStock
            })
        ], {
            type: "application/json"
        }))

        const imageMetaData = images.map(image => ({
            name: image.name,
            isCoverImage: image.isCoverImage
        }))

        formData.append("productImage", new Blob([
            JSON.stringify(imageMetaData)], {
            type: "application/json"
        }))

        const imageFiles = images.map(image => image.file);

        imageFiles.forEach(image => {
            formData.append("images", image);
        });

        const response = await fetch("http://localhost:8081/catalog/product", {
            body: formData,
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            const err = await response.json();
            console.log(err)
            return;
        }
        return response.text();

    }


    return {
        createProduct
    }


}

export default useAddProductData