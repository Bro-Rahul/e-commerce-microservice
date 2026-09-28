import { BookInventoryType, PhoneInventoryType } from "@/validators/inventoryValidator"


type InventoryType = {
    phone: PhoneInventoryType,
    book: BookInventoryType
}

export type AvailableCategoryType = keyof InventoryType;
export type CategoryInventoryType<C extends AvailableCategoryType> = InventoryType[C];
