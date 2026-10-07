import {
  getProductsDefaults,
  productStateDefaults,
} from "@/constants/data/productData";

import { AvailableCategoryType } from "@/types/inventoryTypes";
import { ProductMetaDetailsType } from "@/types/ProductDisplayTypes";
import { InventoryFieldType } from "@/validators/inventoryValidator";
import { ProductBaseFieldsType } from "@/validators/ProductBaseFieldsValidator";
import { SpecificationType } from "@/validators/specificationValidator";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProductDetailsType {
  baseDetail: ProductBaseFieldsType;
  inventory: InventoryFieldType;
  specifications: SpecificationType;
  productMetaDetail: ProductMetaDetailsType;
}

type ProductVariantsType = {
  variants: Record<string, ProductDetailsType>;
  mainVariant: string;
  currentVariant: string;
  variantKeys: string[];
};

export type ProductType = {
  [K in AvailableCategoryType]: ProductVariantsType;
};

type UseAddProductContextType = {
  products: ProductType;

  addNewVariant: (
    category: AvailableCategoryType
  ) => void;

  removeVariant: (
    category: AvailableCategoryType
  ) => void;

  setCurrentVariant: (
    category: AvailableCategoryType,
    variantId: string
  ) => void;

  setAsMainVariant: (
    category: AvailableCategoryType
  ) => void;

  addInventory: (
    category: AvailableCategoryType,
    payload: InventoryFieldType
  ) => void;

  addBaseDetail: (
    category: AvailableCategoryType,
    payload: ProductBaseFieldsType
  ) => void;

  addProductMetaDetail: (
    category: AvailableCategoryType,
    payload: ProductMetaDetailsType
  ) => void;

  addProductSpecifications: (
    category: AvailableCategoryType,
    payload: SpecificationType
  ) => void;
};

const useAddProduct = create<UseAddProductContextType>()(
  persist(
    (set) => ({
      products: getProductsDefaults(),

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

      // -----------------------------
      // ADD SPECIFICATIONS
      // -----------------------------
      addProductSpecifications: (category, payload) =>
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

                    specifications: payload,
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