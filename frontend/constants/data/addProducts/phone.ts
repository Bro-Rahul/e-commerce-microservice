import { FormFieldSchema } from "@/types/formFields";
import { PhoneValidatorSchema } from "@/validators/addProduct";
import { baseFieldsDefaults } from "./baseFields";


export const baseFields: FormFieldSchema[] = [
    {
        type: "text",
        name: "title",
        label: "Product Title",
        placeholder: "Enter product title.."
    },

    {
        type: "text",
        name: "description",
        label: "Product Description",
        placeholder: "Enter product Description.."
    },

    {
        type: "number",
        name: "price",
        label: "Product Price",
        placeholder: "Product Price.."
    },

    {
        type: "textarea",
        name: "about",
        label: "About Item",
        placeholder: "Provide an detail overview of the product.."
    },
]

export const phoneFields: FormFieldSchema[] = [

    {
        type: "text",
        name: "brand",
        label: "Brand",
        placeholder: "Enter Brand Name.."
    },

    {
        type: "text",
        name: "operatingSystem",
        label: "Operating System",
        placeholder: "Operating System.."
    },
    {
        type: "text",
        name: "ram",
        label: "RAM Memory Installed Size",
        placeholder: "Enter ram memory.."
    },
    {
        type: "text",
        name: "cpuModel",
        label: "CPU Model",
        placeholder: "Enter CPU Model.."
    },
    {
        type: "text",
        name: "cpuSpeed",
        label: "CPU Speed",
        placeholder: "Enter CPU Speed.."
    },
];

export const phoneDefaults: PhoneValidatorSchema = {
    ...baseFieldsDefaults,
    brand: "",
    cpuModel: "",
    cpuSpeed: "",
    operatingSystem: "",
    ram: "",
}