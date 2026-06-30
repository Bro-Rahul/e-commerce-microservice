import React from 'react'



interface AttributeRendererProps {
    attributes: [string, string][];
}
const AttributeRenderer = ({ attributes }: AttributeRendererProps) => {
    return (
        <ul className="list-disc list-inside text-xs space-y-1 text-gray-800">
            {attributes.map(([key, val], index) => <li className='capitalize' key={index}><span className="font-bold capitalize">{key}:</span> {val}</li>)}
        </ul>
    )
}

export default AttributeRenderer