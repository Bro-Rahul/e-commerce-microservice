import { FormFieldSchema } from "@/types/formFields";
import { BookValidatorSchema } from "@/validators/addProduct";
import { baseFieldsDefaults } from "./baseFields";

export const bookFields: FormFieldSchema[] = [

    {
        type: "text",
        name: "publisher",
        label: "Publisher",
        placeholder: "Enter Publisher Name.."
    },
    {
        type: "date",
        name: "publicationDate",
        label: "Publication Date",
        placeholder: "Publication Data..."
    },
    {
        type: "text",
        name: "edition",
        label: "Edition",
        placeholder: "Enter Edition.."
    },
    {
        type: "select",
        label: "Language",
        name: "language",
        options: [
            {
                value: "english",
                label: "English"
            },
            {
                value: "hindi",
                label: "Hindi"
            },
            {
                value: "german",
                label: "Germen"
            }
        ]

    },
    {
        type: "text",
        name: "printLength",
        label: "Print Length",
        placeholder: "Total Pages in the print"
    },

    {
        type: "text",
        name: "isbn_10",
        label: "ISBN-10",
        placeholder: "ISBN-10 Number.."
    },

    {
        type: "text",
        name: "isbn_13",
        label: "isbn-13",
        placeholder: "ISBN-13 Number"
    },
    {
        type: "number",
        name: "reading_age",
        label: "Reading Age",
        placeholder: "Customer suggest Age.."
    },
    {
        type: "text",
        name: "itemWeight",
        label: "Item Weight",
        placeholder: "Enter Book Weight.."
    },
    {
        type: "text",
        name: "dimensions",
        label: "Dimenstions",
        placeholder: "Book Dimensions.."
    },
    {
        type: "text",
        name: "countryOfOrigin",
        label: "Country of Origin",
        placeholder: "Enter Book Origin.."
    },
    {
        type: "text",
        name: "netQuantity",
        label: "Net Quantity",
        placeholder: "Enter the quantity.."
    },
    {
        type: "text",
        name: "importer",
        label: "Importer",
        placeholder: "Enter importer names"
    }

];


export const bookDefaults: BookValidatorSchema = {
    ...baseFieldsDefaults,
    countryOfOrigin: "",
    dimensions: "",
    edition: "",
    importer: "",
    isbn_10: "",
    isbn_13: "",
    itemWeight: "",
    language: "",
    netQuantity: "",
    printLength: "",
    publicationDate: new Date(),
    publisher: "",
    reading_age: 0,
}
