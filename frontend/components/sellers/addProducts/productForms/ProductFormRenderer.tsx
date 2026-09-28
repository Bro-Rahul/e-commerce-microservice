"use client"

import { AvailableCategoryType, CategoryInventoryType } from "@/types/inventoryTypes";
import PhoneForm from "./phone/PhoneForm";
import BookForm from "./book/BookForm";

interface ProductFormRendererProps {
    category: AvailableCategoryType
}

const ProductFormRenderer = ({ category }: ProductFormRendererProps) => {

    switch (category) {

        case "phone":
            return <PhoneForm />
        case "book":
            return <BookForm />
        default:
            return <p>No Form For this </p>
    }
}

export default ProductFormRenderer