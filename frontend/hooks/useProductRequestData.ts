"use client"
import useAddProduct from '@/store/useAddProduct'
import { AvailableCategory } from '@/types/seller'

const useProductRequestData = (category: AvailableCategory) => {
    const { products, inventory, productSpecifications } = useAddProduct()

    const getProductRequestValidator = () => {
        const formdata = new FormData();
        const { about, description, price, title, ...rest } = products[category];
        return {
            productBase: {
                about,
                description,
                price,
                title,
                category,
            },
            productMetaDetail: {
                ...rest,
                specifications: productSpecifications[category],
            },
            productStocks: inventory[category],
        };
    }

    return {
        getProductRequestValidator
    }

}

export default useProductRequestData