import { BookInventoryType } from "@/validators/inventoryValidator";
import { inventoryFields, InventoryFieldType } from "./inventoryFields";

export const bookInventoryFields: InventoryFieldType<BookInventoryType>[] = [
    ...inventoryFields,

    {
        name: "binding",
        label: "Binding",
        type: "text",
        placeholder: "Enter Author Name",
    },
    {
        name: "isbn10",
        label: "ISBN 10",
        type: "text",
        placeholder: "Enter ISBN 10 number",
    },
    {
        name: "isbn13",
        label: "ISBN 13",
        type: "text",
        placeholder: "Enter ISBN 13 number ",
    },

];

export const bookAttributesFields = [
    {
        name: "author",
        label: "Author",
        type: "text",
        placeholder: "Enter author name",
    },
    {
        name: "isbn10",
        label: "ISBN-10",
        type: "text",
        placeholder: "Enter ISBN-10",
    },
    {
        name: "isbn13",
        label: "ISBN-13",
        type: "text",
        placeholder: "Enter ISBN-13",
    },
    {
        name: "publisher",
        label: "Publisher",
        type: "text",
        placeholder: "Enter publisher name",
    },
    {
        name: "publicationDate",
        label: "Publication Date",
        type: "date",
        placeholder: "Select publication date",
    },
    {
        name: "edition",
        label: "Edition",
        type: "text",
        placeholder: "e.g. 2nd Edition",
    },
    {
        name: "language",
        label: "Language",
        type: "text",
        placeholder: "Enter book language",
    },
    {
        name: "binding",
        label: "Binding",
        type: "select",
        placeholder: "Select binding type",
        options: [
            {
                label: "Paperback",
                value: "PAPERBACK",
            },
            {
                label: "Hardcover",
                value: "HARDCOVER",
            },
            {
                label: "Box Set",
                value: "BOX_SET",
            },
            {
                label: "Mass Market Paperback",
                value: "MASS_MARKET_PAPERBACK",
            },
        ],
    },
    {
        name: "pages",
        label: "Number of Pages",
        type: "number",
        placeholder: "Enter number of pages",
    },
    {
        name: "genre",
        label: "Genre",
        type: "text",
        placeholder: "Enter book genre",
    },
    {
        name: "series",
        label: "Series",
        type: "text",
        placeholder: "Enter series name",
    },
    {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Enter book description",
    },
    {
        name: "readingAgeMin",
        label: "Minimum Reading Age",
        type: "number",
        placeholder: "Enter minimum age",
    },
    {
        name: "readingAgeMax",
        label: "Maximum Reading Age",
        type: "number",
        placeholder: "Enter maximum age",
    },
    {
        name: "countryOfOrigin",
        label: "Country of Origin",
        type: "text",
        placeholder: "Enter country of origin",
    },
    {
        name: "height",
        label: "Height",
        type: "number",
        placeholder: "Enter height",
    },
    {
        name: "width",
        label: "Width",
        type: "number",
        placeholder: "Enter width",
    },
    {
        name: "thickness",
        label: "Thickness",
        type: "number",
        placeholder: "Enter thickness",
    },
    {
        name: "weight",
        label: "Weight",
        type: "number",
        placeholder: "Enter weight",
    },
];