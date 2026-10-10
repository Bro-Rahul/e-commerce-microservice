import useAddProduct from "@/store/useAddProduct"
import { AvailableCategoryType } from "@/types/inventoryTypes"
import {
    ProductDataType,
    ProductDisplayImageType,
    ProductImageType,
} from "@/types/ProductDisplayTypes"
import useProductImage from "../dexies/useProductImage"
import useImageLoader from "../dexies/useImageLoader"
import { keyValuePairType } from "@/validators/specificationValidator"


const useFormateData = (category: AvailableCategoryType) => {
    const { variantKeys, variants } = useAddProduct(
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
        return images?.filter(image => image.imageType !== "Carousel" && image.variantId === variantsId)
            .map((image) => ({
                imageURL: URL.createObjectURL(image.file),
                isCoverImage: image.imageType === "CoverImage",
                name: image.fileName,
            })) ?? []
    }


    const getCarouselImages = (variantsId: string): ProductImageType[] => {
        return images?.filter(image => image.imageType === "Carousel" && image.variantId === variantsId)
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
                },
                variantOptions: {
                    [curr]: variants[curr].inventory.additionalFields
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

    return {
        getProductData,
        getProductVariantsData,
        variantKeys
    }
}

export default useFormateData