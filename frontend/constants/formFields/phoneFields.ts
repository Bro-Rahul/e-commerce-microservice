import { PhoneAttributeType } from "@/validators/products/phoneValidator";
import { InputFieldType } from "./inventoryFields";


export const phoneAttributeFields: InputFieldType<PhoneAttributeType>[] = [
    {
        name: "brand",
        label: "Brand",
        placeholder: "Enter the Brand Name...",
        type: "text"
    },
    {
        name: "cpuSpeed",
        label: "CPU Speed",
        placeholder: "Enter the CPU Speed...",
        type: "text"
    },
    {
        name: "installedRam",
        label: "Installed Ram",
        placeholder: "Enter the Installed Ram Name...",
        type: "text"
    },
    {
        name: "memoryStorage",
        label: "Memory Storage",
        placeholder: "Enter the Memory Storage Name...",
        type: "text"
    },
    {
        name: "operatingSystem",
        label: "Operating System",
        placeholder: "Enter the Operating System Name...",
        type: "text"
    },
] 