import SpecificationForm from '../../specifications/SpecificationForm'
import PhoneAttributesForm from './PhoneAttributesForm'
import InventoryForm from '../../inventory/InventoryForm'
import WhatIsInBoxForm from './WhatIsInBoxForm'


const PhoneForm = () => {
    return (
        <>
            <PhoneAttributesForm />
            <InventoryForm category='phone' />
            <SpecificationForm category='phone' />
            <WhatIsInBoxForm />
        </>
    )
}

export default PhoneForm