import { InventoryFieldType } from "@/validators/inventoryValidator";

type OptionsType = {
    label: string,
    value: string
}

export type InputFieldType<T> = {
    name: keyof T;
    label: string;
    type: string;
    placeholder: string;
    helperText?: string,
    options?: OptionsType[]
};

export const inventoryFields: InputFieldType<InventoryFieldType>[] = [
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


