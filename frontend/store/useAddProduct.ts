import { productsDefaults } from "@/constants/data"
import { AvailableCategoryType } from "@/types/inventoryTypes"
import { AvailableInventoryType } from "@/validators/inventoryValidator"
import { ProductBaseFieldsType } from "@/validators/ProductBaseFieldsValidator"
import { SpecificationType } from "@/validators/specificationValidator"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ProductMetaDetailType {
  [k: string]: any
}

interface ProductDetailsType {
  baseDetail: ProductBaseFieldsType
  inventory: AvailableInventoryType[]
  specifications: SpecificationType,
  productMetaDetail: ProductMetaDetailType
}

export type ProductType = {
  [K in AvailableCategoryType]: ProductDetailsType
}

type useAddProductContextType = {
  products: ProductType

  setProductBaseDetails: (
    category: AvailableCategoryType,
    payload: Partial<ProductBaseFieldsType>
  ) => void

  updateProductInventory: (
    category: AvailableCategoryType,
    payload: Partial<AvailableInventoryType[]>
  ) => void,

  addNewProductInventory: (
    category: AvailableCategoryType,
    payload: number
  ) => void,

  updateSpecifications: (
    category: AvailableCategoryType,
    payload: Partial<SpecificationType>
  ) => void

  updateMetaDetails: (
    category: AvailableCategoryType,
    payload: ProductMetaDetailType
  ) => void
}

const useAddProduct = create<useAddProductContextType>()(
  persist(
    (set) => ({
      products: productsDefaults,

      setProductBaseDetails: (category, payload) =>
        set((state) => ({
          products: {
            ...state.products,

            [category]: {
              ...state.products[category],

              baseDetail: {
                ...state.products[category].baseDetail,
                ...payload,
              },
            },
          },
        })),
      updateProductInventory: (category, payload) => (
        set((state) => ({
          products: {
            ...state.products,
            [category]: {
              ...state.products[category],
              inventory: payload
            }
          }
        }))
      ),

      addNewProductInventory: (category, index) =>
        set((state) => ({
          products: {
            ...state.products,
            [category]: {
              ...state.products[category],
              inventory: [...state.products[category].inventory, state.products[category].inventory[index]]
            }
          }
        })),

      updateSpecifications: (category, payload) =>
        set((state) => ({

          products: {
            ...state.products,
            [category]: {
              ...state.products[category],
              specifications: payload
            }
          }
        })),
      updateMetaDetails: (category, payload) =>
        set((state) => ({
          products: {
            ...state.products,
            [category]: {
              ...state.products[category],
              productMetaDetail: {
                ...state.products[category].productMetaDetail,
                ...payload
              }
            }
          }
        }))
    }),
    {
      name: "addProduct",
    }
  )
)

export default useAddProduct