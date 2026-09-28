import { BaseInventoryFieldType } from "@/validators/inventoryValidator";

export type InventoryFieldType<T> = {
    name: keyof T;
    label: string;
    type: string;
    placeholder: string;
};

export const inventoryFields: InventoryFieldType<BaseInventoryFieldType>[] = [
    {
        name: "sku",
        label: "SKU",
        type: "text",
        placeholder: "Enter SKU",
    },
    {
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Enter Name for variant",
    },
    {
        name: "price",
        label: "Price",
        type: "number",
        placeholder: "Enter Price",
    },
    {
        name: "quantity",
        label: "Quantity",
        type: "number",
        placeholder: "Enter Quantity",
    },
    {
        name: "stockDescription",
        label: "Stock Description",
        type: "textarea",
        placeholder: "Enter Stock Description",
    },
    {
        name: "additionalFields",
        label: "Additional Fields",
        type: "text",
        placeholder: "Enter Additional Fields",
    },
]


