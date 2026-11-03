"use client"

import PhoneForm from "./phone/PhoneForm";
import BookForm from "./book/BookForm";

interface ProductFormRendererProps {
    category: string
}

const ProductFormRenderer = ({ category }: ProductFormRendererProps) => {

    switch (category) {

        case "phones":
            return <PhoneForm category={category} />
        case "books":
            return <BookForm category={category} />
        default:
            return <p>No Form For this </p>
    }
}

export default ProductFormRenderer