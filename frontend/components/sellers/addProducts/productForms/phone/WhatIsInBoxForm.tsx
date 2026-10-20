import ArrayFields, { ArrayDataType } from '../../inventory/ArrayFields'

interface WhatIsInBoxFormProps {
    defaultValues: ArrayDataType[],
    handleSubmit: (data: ArrayDataType[]) => void
}

const WhatIsInBoxForm = ({ defaultValues, handleSubmit }: WhatIsInBoxFormProps) => {

    const onSave = (data: ArrayDataType[]) => {
        handleSubmit(data)
    }

    return (
        <ArrayFields
            searchKey='insideBox'
            title='What is in the Box'
            description='Enter the things that will be found inside the box '
            values={defaultValues}
            onSave={onSave}
        />
    )
}

export default WhatIsInBoxForm