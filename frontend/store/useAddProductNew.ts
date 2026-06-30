import { bookDefaults } from '@/constants/data/addProducts/book'

import { BookValidatorSchema } from '@/validators/addProduct'
import React from 'react'

type ProductDataMap = {
    Books: {
        author: string;
        pages: number;
    };

    Phones: {
        brand: string;
        model: string;
    };

    Clothing: {
        size: string;
        color: string;
    };
};

type AvailableCategory = keyof ProductDataMap;

const productList: {
    [K in AvailableCategory]: {
        category: K;
        data: ProductDataMap[K];
    };
} = {
    Books: {
        category: "Books",
        data: {
            author: "",
            pages: 0,
        },
    },

    Phones: {
        category: "Phones",
        data: {
            brand: "",
            model: "",
        },
    },

    Clothing: {
        category: "Clothing",
        data: {
            size: "M",
            color: "Black",
        },
    },
};

function getProduct<K extends AvailableCategory>(category: K) {
    return productList[category];
}


const useAddProductNew = () => {


}

export default useAddProductNew