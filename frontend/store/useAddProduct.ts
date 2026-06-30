import { bookDefaults } from "@/constants/data/addProducts/book";
import { phoneDefaults } from "@/constants/data/addProducts/phone";
import { AvailableCategory } from "@/types/seller";
import { PhoneValidatorSchema, BookValidatorSchema, ProductSpecificationSchema, ProductInventorySchema } from "@/validators/addProduct"
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface ProductImage {
    file: File;
    id: string;
    name: string;
    isCoverImageId: number;
    previewUrl: string;
}

interface MediaAssetsSchema {
    productImages: ProductImage[],
}
export type ProductSchemaMap = {
    Books: BookValidatorSchema;
    Phones: PhoneValidatorSchema;
};

export interface AddProductContextSchema {
    products: ProductSchemaMap;

    productSpecifications: Record<
        AvailableCategory, ProductSpecificationSchema
    >
    mediaAssets: Record<
        AvailableCategory, MediaAssetsSchema
    >
    inventory: Record<
        AvailableCategory, ProductInventorySchema
    >

    updateProduct: <T extends keyof ProductSchemaMap>(
        type: T,
        data: Partial<ProductSchemaMap[T]>
    ) => void;

    setProductSpecifications: (specifications: ProductSpecificationSchema, category: AvailableCategory) => void,

    setMediaAssets: (productImages: ProductImage[], category: AvailableCategory) => void,

    setInventory: (productInventory: ProductInventorySchema, category: AvailableCategory) => void,

    resetProducts: () => void;

}

const useAddProduct = create<AddProductContextSchema>()(
    persist(
        (set) => ({
            products: {
                Books: bookDefaults,
                Phones: phoneDefaults,
            },
            productSpecifications: {
                Books: {
                    specifications: []
                },
                Phones: {
                    specifications: []
                }
            },
            mediaAssets: {
                Books: {
                    productImages: []
                },
                Phones: {
                    productImages: []
                }
            },

            inventory: {
                Books: {
                    inventory: []
                },
                Phones: {
                    inventory: []
                }
            },


            updateProduct: (type, data) =>
                set((state) => ({
                    products: {
                        ...state.products,
                        [type]: {
                            ...state.products[type],
                            ...data,
                        },
                    },
                })),

            setProductSpecifications: (specifications, category) =>
                set((state) => ({
                    ...state,
                    productSpecifications: {
                        ...state.productSpecifications,
                        [category]: {
                            ...state.productSpecifications[category],
                            ...specifications
                        }
                    }
                })),

            setMediaAssets: (assets, category) =>
                set((state) => ({
                    ...state,
                    mediaAssets: {
                        ...state.mediaAssets,
                        [category]: {
                            ...assets
                        }
                    }
                })),

            setInventory: (inventory, category) =>
                set((state) => ({
                    ...state,
                    inventory: {
                        ...state.inventory,
                        [category]: {
                            ...inventory
                        }
                    }
                })),

            resetProducts: () =>
                set({
                    products: {
                        Books: bookDefaults,
                        Phones: phoneDefaults,
                    },
                    productSpecifications: {
                        Books: {
                            specifications: []
                        },
                        Phones: {
                            specifications: []
                        }
                    }
                }),
        }),
        {
            name: "add-product-store",
            storage: createJSONStorage(() => localStorage)
        }
    )
);


export default useAddProduct;