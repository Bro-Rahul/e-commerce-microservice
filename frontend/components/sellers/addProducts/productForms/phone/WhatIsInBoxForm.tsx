import useAddProduct from '@/store/useAddProduct'
import { useEffect, useState } from 'react'
import ArrayFields, { ArrayDataType } from '../../inventory/ArrayFields'

const WhatIsInBoxForm = () => {
    const { products, addProductMetaDetail } = useAddProduct()
    const [values, setValues] = useState<ArrayDataType[]>([]);

    const { currentVariant } = products['phone']

    const onSave = (data: ArrayDataType[]) => {
        addProductMetaDetail("phone", {
            "insideBox": data
        });
    }

    useEffect(() => {
        const setProductValues = () => {
            const { currentVariant, variants } = useAddProduct.getState().products.phone
            const metaDetail = variants[currentVariant].productMetaDetail
            const attribute = metaDetail?.insideBox ?? []
            setValues(attribute)

        }

        if (useAddProduct.persist.hasHydrated()) {
            setProductValues()
            return
        }

        const unsubscribe =
            useAddProduct.persist.onFinishHydration(() => {
                setProductValues()
            })

        return unsubscribe;

    }, [currentVariant])
    return (
        <ArrayFields
            searchKey='insideBox'
            title='What is in the Box'
            description='Enter the things that will be found inside the box '
            values={values}
            onSave={onSave}
        />
    )
}

export default WhatIsInBoxForm