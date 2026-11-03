import PhoneProduct from './PhoneProduct'
import { ProductDataType } from '@/types/ProductDisplayTypes'
import BookProduct from './BookProduct'
import { keyValuePairType } from '@/validators/specificationValidator'
import ProductVariantProvider from '@/context/ProductVariantProvider'
import { findAllAvailableOptions, formateVariantsData, getDefaultSelectedOptions } from '@/lib/utils'
import { productVariantsOptions } from '@/constants/data/productData'

const ProductRenderer = ({
    category,
    productData,
    variantsData,
    currentVariant
}: {
    category: string,
    productData: ProductDataType,
    currentVariant: string,
    variantsData: Record<string, keyValuePairType[]>
}) => {

    const optionsKey = productVariantsOptions[category];
    let content;

    switch (category) {
        case 'phones':
            content = <PhoneProduct productData={productData} />
            break
        case 'books':
            content = <BookProduct productData={productData} />
            break;
    }
    return <ProductVariantProvider
        variantsData={formateVariantsData(variantsData)}
        allVariantOptions={findAllAvailableOptions(optionsKey, variantsData)}
        optionsKeys={optionsKey}
        selectedOptions={getDefaultSelectedOptions(optionsKey, currentVariant, variantsData)}
        category={category}
        currentVariant={currentVariant}
    >
        {content}
    </ProductVariantProvider>
}

export default ProductRenderer