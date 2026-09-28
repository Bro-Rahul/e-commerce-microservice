import { PhoneInventoryType } from "@/validators/inventoryValidator";
import { inventoryFields, InventoryFieldType } from "./inventoryFields";


export const phoneInventoryFields: InventoryFieldType<PhoneInventoryType>[] = [
    ...inventoryFields,
    {
        name: "brand",
        label: "Brand",
        type: "text",
        placeholder: "Enter Brand",
    },
    {
        name: "installedRam",
        label: "Installed RAM",
        type: "text",
        placeholder: "Enter Installed RAM",
    },
    {
        name: "operatingSystem",
        label: "Operating System",
        type: "text",
        placeholder: "Enter Operating System",
    },
    {
        name: "cpuSpeed",
        label: "CPU Speed",
        type: "text",
        placeholder: "Enter CPU Speed",
    },
    {
        name: "memoryStorage",
        label: "Memory Storage",
        type: "text",
        placeholder: "Enter Memory Storage",
    },
]