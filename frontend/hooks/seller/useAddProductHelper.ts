import useAddProduct, { ProductVariantsType } from '@/store/useAddProduct'
import { AvailableCategoryType } from '@/types/inventoryTypes'
import { useEffect, useState } from 'react'

const useAddProductHelper = (category: AvailableCategoryType) => {
    const { products } = useAddProduct();
    const [productData, setProductData] = useState<ProductVariantsType>({
        currentVariant: "",
        mainVariant: "",
        variantKeys: [],
        variants: {}
    });

    useEffect(() => {
        const loadData = () => {
            const productData = useAddProduct.getState().products[category];
            setProductData(productData);
        }

        if (useAddProduct.persist.hasHydrated()) {
            loadData();
        }

        const unSubscribe = useAddProduct.persist.onFinishHydration(loadData);

        return unSubscribe;

    }, []);

    return {
        productData
    }
}

export default useAddProductHelper