import useAddProduct, { ProductDetailsType } from "@/store/useAddProduct"
import { AvailableCategoryType } from "@/types/inventoryTypes"
import {
    ProductDataType,
    ProductDisplayImageType,
    ProductImageType,
} from "@/types/ProductDisplayTypes"
import useProductImage from "../dexies/useProductImage"
import useImageLoader from "../dexies/useImageLoader"
import { keyValuePairType } from "@/validators/specificationValidator"
import { ImagePlaceType } from "@/types/dexie/mediaAssetsTypes"


const useFormateData = ({ category }: { category: AvailableCategoryType }) => {
    const { variantKeys, variants, mainVariant } = useAddProduct(
        (state) => state.products[category]
    )
    const { getImageByCategory } = useProductImage();
    const images = useImageLoader({
        dependency: [category],
        loaderFn: async () => await getImageByCategory(category)
    });


    const getDisplayImage = (
        variantsId: string,
    ): ProductDisplayImageType[] => {
        return images?.filter(image => image.imageType !== "CarouselImages" && image.variantId === variantsId)
            .map((image) => ({
                imageURL: URL.createObjectURL(image.file),
                isCoverImage: image.imageType === "CoverImage",
                name: image.fileName,
            })) ?? []
    }


    const getCarouselImages = (variantsId: string): ProductImageType[] => {
        return images?.filter(image => image.imageType === "CarouselImages" && image.variantId === variantsId)
            .map((image) => ({
                imageURL: URL.createObjectURL(image.file),
                name: image.fileName,
            })) ?? []
    }

    const getProductData = () => {
        return variantKeys.reduce<Record<string, ProductDataType>>((acc, curr) => {
            acc[curr] = {
                productBaseDetails: variants[curr].baseDetail,
                productInventory: variants[curr].inventory,
                productMetaDetails: variants[curr].productMetaDetail,
                mediaAssets: {
                    imageCarousel: getCarouselImages(curr),
                    productDisplay: getDisplayImage(curr)
                }
            };
            return acc;
        }, {});
    }

    const getProductVariantsData = () => {
        return variantKeys.reduce<Record<string, keyValuePairType[]>>((acc, curr) => {
            acc[curr] = variants[curr].inventory.additionalFields
            return acc;
        }, {});
    }

    const filterVariantImage = (productId: string, imageType: ImagePlaceType) => {
        return images?.filter(image => image.variantId === productId && image.imageType === imageType) ?? [];
    }

    const getProductSubmissionData = async () => {
        const formData = new FormData();
        const assetsMeta: any[] = [];
        let index: number = 0, variantId: number = 1;

        const variantsData: ProductDetailsType[] = []
        Object.entries(variants).forEach(([productId, productData]) => {
            variantsData.push({ ...productData, isMainVariant: productId === mainVariant });
            const caouselImage = filterVariantImage(productId, "CarouselImages")
            for (const image of caouselImage) {
                assetsMeta.push({ index: index, name: image.fileName, type: image.imageType, isCover: false, variantId: variantId })
                formData.append("images", image.file);
                index++;
            }

            const imageDisplay = filterVariantImage(productId, "CollectionImages")
            for (const image of imageDisplay) {
                assetsMeta.push({ index: index, name: image.fileName, type: image.imageType, isCover: image.imageType === "CoverImage", variantId: variantId })
                formData.append("images", image.file);
                index++;
            }
            const coverImage = filterVariantImage(productId, "CoverImage").pop();
            assetsMeta.push({ index: index, name: coverImage?.fileName, type: coverImage!.imageType, isCover: coverImage!.imageType === "CoverImage", variantId: variantId })
            formData.append("images", coverImage?.file!);
            index++
            variantId++;
        })

        formData.append("category", category);

        formData.append("variants", new Blob([
            JSON.stringify(variantsData)
        ], {
            type: "application/json"
        }))
        formData.append("imageMetaDetail", new Blob([
            JSON.stringify(assetsMeta)
        ], {
            type: "application/json"
        }))

        for (const entry of formData.entries()) {
            console.log("key: " + entry[0])
            if (entry[1] instanceof Blob) {
                console.log("value")
                if (entry[1].type === "application/json") {
                    console.log(JSON.parse(await entry[1].text()))
                } else {
                    console.log("file value")
                }
            }
        }

        return formData;
    }

    return {
        getProductData,
        getProductVariantsData,
        getProductSubmissionData,
        variantKeys
    }
}

export default useFormateData