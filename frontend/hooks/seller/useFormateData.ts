import useAddProduct from "@/store/useAddProduct"
import { AvailableCategoryType } from "@/types/inventoryTypes"
import {
    ProductDataType,
    ProductDisplayImageType,
    ProductImageType,
} from "@/types/ProductDisplayTypes"
import useDexie from "../dexies/useDexie"
import { useEffect, useState } from "react"
import { MediaAssetsType } from "@/types/dexie/mediaAssetsTypes"

const useFormateData = (category: AvailableCategoryType) => {
    const [productImages, setProductImages] = useState<MediaAssetsType[]>([]);
    const product = useAddProduct(
        (state) => state.products[category]
    )
    const { getImageByCategory } = useDexie();

    useEffect(() => {
        const loadImage = async () => {
            try {
                const images = await getImageByCategory(category);
                setProductImages(images);
            } catch (err) {

            }
        }
        loadImage();
    }, [category]);

    const getDisplayImage = (
        coverImage: File,
        imageCollections: File[]
    ): ProductDisplayImageType[] => {
        const images = [coverImage, ...imageCollections]

        return images.map((image, index) => ({
            imageURL: URL.createObjectURL(image),
            isCoverImage: index === 0,
            name: image.name,
        }))
    }


    const getImageCarousel = (
        images: File[]
    ): ProductImageType[] => {
        return images.map((image) => ({
            imageURL: URL.createObjectURL(image),
            name: image.name,
        }))
    }

    /*
     * Cover image may not be available on first render
     */
    const coverImage = coverImages?.[0]

    const productDisplayData: ProductDataType = {
        mediaAssets: {
            imageCarousel: productImages
                .filter((image) => image.imageType === "Carousel")
                .map((item) => ({
                    imageURL: URL.createObjectURL(item.file),
                    name: item.fileName
                })) ?? [],

            productDisplay: productImages
                .filter(file => file.imageType !== "Carousel")
                .map((item) => ({
                    imageURL: URL.createObjectURL(item.file),
                    name: item.fileName,
                    isCoverImage: item.imageType === "CoverImage"
                })) ?? [],
        },

        productBaseDetails: {
            ...product.baseDetail,
        },

        productInventory: product.inventory,

        productMetaDetails: {
            specifications: product.specifications,
            ...product.productMetaDetail
        },
    }



    const getProductSubmissionData = () => {
        const formData = new FormData();
        const productBaseDetails = product.baseDetail;
        formData.append("productBaseDetail", new Blob(
            [JSON.stringify(productBaseDetails)], {
            type: 'application/json'
        }));

        const metaDetails = product.productMetaDetail;

        formData.append("metaDetails", new Blob(
            [JSON.stringify(metaDetails)], {
            type: "application/json"
        }));

        formData.append("inventory", new Blob(
            [JSON.stringify(product.inventory)], {
            type: "application/json"
        }
        ))

        formData.append("coverImage", coverImage)

        imageCollection.forEach(image => {
            formData.append("imageCollection", image)
        });

        carouselImages.forEach(image => {
            formData.append("carouselImages", image)
        });


        return formData;
    }


    return {
        productDisplayData,
        getProductSubmissionData
    }
}

export default useFormateData