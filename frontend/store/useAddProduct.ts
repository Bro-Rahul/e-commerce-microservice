import {
  getProductsDefaults,
  productStateDefaults,
} from "@/constants/data/productData";

import { ProductMetaDetailsType } from "@/types/ProductDisplayTypes";
import { InventoryFieldType } from "@/validators/inventoryValidator";
import { ProductBaseFieldsType } from "@/validators/ProductBaseFieldsValidator";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProductDetailsType {
  baseDetail: ProductBaseFieldsType;
  inventory: InventoryFieldType;
  isMainVariant: boolean,
  productMetaDetail: ProductMetaDetailsType;
}

export type ProductVariantsType = {
  variants: Record<string, ProductDetailsType>;
  mainVariant: string;
  currentVariant: string;
  variantKeys: string[];
};

// export type ProductType = {
//   [K in AvailableCategoryType]: ProductVariantsType;
// };

export type ProductType = {
  [K: string]: ProductVariantsType;
};


type UseAddProductContextType = {
  products: ProductType;

  getProductData: (category: string) => ProductVariantsType,

  addNewVariant: (
    category: string
  ) => void;

  removeVariant: (
    category: string
  ) => void;

  setCurrentVariant: (
    category: string,
    variantId: string
  ) => void;

  setAsMainVariant: (
    category: string
  ) => void;

  addInventory: (
    category: string,
    payload: InventoryFieldType
  ) => void;

  addBaseDetail: (
    category: string,
    payload: ProductBaseFieldsType
  ) => void;

  addProductMetaDetail: (
    category: string,
    payload: ProductMetaDetailsType
  ) => void;
};

const useAddProduct = create<UseAddProductContextType>()(
  persist(
    (set, get) => ({
      products: {},

      getProductData(category) {
        const { products } = get();

        // Return existing product data
        if (category in products) {
          return products[category];
        }
        // Generate default data
        const categoryData = getProductsDefaults(category);

        set((state) => ({
          ...state,
          products: {
            ...state.products,
            [category]: categoryData
          }
        }))

        return categoryData;
      },

      // -----------------------------
      // ADD NEW VARIANT
      // -----------------------------
      addNewVariant: (category) =>
        set((state) => {
          const variantId = crypto.randomUUID();

          const categoryData = state.products[category];

          return {
            products: {
              ...state.products,

              [category]: {
                ...categoryData,

                variants: {
                  ...categoryData.variants,

                  [variantId]: {
                    ...productStateDefaults,
                  },
                },

                variantKeys: [
                  ...categoryData.variantKeys,
                  variantId,
                ],

                currentVariant: variantId,
              },
            },
          };
        }),

      // -----------------------------
      // REMOVE VARIANT
      // -----------------------------
      removeVariant: (category) =>
        set((state) => {
          const categoryData = state.products[category];

          const {
            currentVariant,
            variantKeys,
            variants,
            mainVariant,
          } = categoryData;

          // Don't remove the last variant
          if (variantKeys.length <= 1) {
            return state;
          }

          // Create a NEW object instead of mutating variants
          const updatedVariants = {
            ...variants,
          };

          delete updatedVariants[currentVariant];

          const currentVariantIndex =
            variantKeys.indexOf(currentVariant);

          const updatedVariantKeys = variantKeys.filter(
            (id) => id !== currentVariant
          );

          const newCurrentVariant =
            updatedVariantKeys[
            Math.min(
              currentVariantIndex,
              updatedVariantKeys.length - 1
            )
            ];

          return {
            products: {
              ...state.products,

              [category]: {
                ...categoryData,

                variants: updatedVariants,

                variantKeys: updatedVariantKeys,

                currentVariant: newCurrentVariant,

                mainVariant:
                  mainVariant === currentVariant
                    ? newCurrentVariant
                    : mainVariant,
              },
            },
          };
        }),

      // -----------------------------
      // SET CURRENT VARIANT
      // -----------------------------
      setCurrentVariant: (category, variantId) =>
        set((state) => ({
          products: {
            ...state.products,

            [category]: {
              ...state.products[category],

              currentVariant: variantId,
            },
          },
        })),

      // -----------------------------
      // SET MAIN VARIANT
      // -----------------------------
      setAsMainVariant: (category) =>
        set((state) => ({
          products: {
            ...state.products,

            [category]: {
              ...state.products[category],

              mainVariant:
                state.products[category].currentVariant,
            },
          },
        })),

      // -----------------------------
      // ADD INVENTORY
      // -----------------------------
      addInventory: (category, payload) =>
        set((state) => {
          const categoryData = state.products[category];

          const { currentVariant } = categoryData;

          return {
            products: {
              ...state.products,

              [category]: {
                ...categoryData,

                variants: {
                  ...categoryData.variants,

                  [currentVariant]: {
                    ...categoryData.variants[currentVariant],

                    inventory: payload,
                  },
                },
              },
            },
          };
        }),

      // -----------------------------
      // ADD BASE DETAIL
      // -----------------------------
      addBaseDetail: (category, payload) =>
        set((state) => {
          const categoryData = state.products[category];

          const { currentVariant } = categoryData;

          return {
            products: {
              ...state.products,

              [category]: {
                ...categoryData,

                variants: {
                  ...categoryData.variants,

                  [currentVariant]: {
                    ...categoryData.variants[currentVariant],

                    baseDetail: payload,
                  },
                },
              },
            },
          };
        }),

      // -----------------------------
      // ADD PRODUCT META DETAIL
      // -----------------------------
      addProductMetaDetail: (category, payload) =>
        set((state) => {
          const categoryData = state.products[category];

          const { currentVariant } = categoryData;

          return {
            products: {
              ...state.products,

              [category]: {
                ...categoryData,

                variants: {
                  ...categoryData.variants,

                  [currentVariant]: {
                    ...categoryData.variants[currentVariant],

                    productMetaDetail: {
                      ...categoryData.variants[currentVariant].productMetaDetail,
                      ...payload
                    }
                  },
                },
              },
            },
          };
        }),
    }),

    {
      name: "addProduct",
    }
  )
);

export default useAddProduct;