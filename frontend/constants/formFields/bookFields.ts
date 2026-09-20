import { BookInventoryType } from "@/validators/inventoryValidator";
import { inventoryFields, InventoryFieldType } from "./inventoryFields";

export const bookInventoryFields: InventoryFieldType<BookInventoryType>[] = [
    ...inventoryFields,

    {
        name: "author",
        label: "Author",
        type: "text",
        placeholder: "Enter Author Name",
    },
    {
        name: "publisher",
        label: "Publisher",
        type: "text",
        placeholder: "Enter Publisher",
    },
    {
        name: "isbn",
        label: "ISBN",
        type: "text",
        placeholder: "Enter ISBN",
    },
    {
        name: "edition",
        label: "Edition",
        type: "text",
        placeholder: "Enter Edition",
    },
    {
        name: "language",
        label: "Language",
        type: "text",
        placeholder: "Enter Language",
    },
    {
        name: "format",
        label: "Book Format",
        type: "text",
        placeholder: "Enter Book Format",
    },
];