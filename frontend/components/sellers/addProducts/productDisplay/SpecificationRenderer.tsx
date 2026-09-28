import { SpecificationType } from '@/validators/specificationValidator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'

interface SpecificationRendererProps {
    specificationsData: SpecificationType
}

const SpecificationRenderer = ({ specificationsData }: SpecificationRendererProps) => {
    const midpoint = Math.ceil(specificationsData.length / 2)

    return (
        <div className="border-t border-border px-4 py-8 md:px-6">
            <h3 className="mb-6 text-[20px] font-bold text-foreground">
                Poco M8 5G Frost Silver 8GB RAM 128GB ROM Mobile Phone Information
            </h3>

            <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
                {[specificationsData.slice(0, midpoint), specificationsData.slice(midpoint)].map((specificationsSection, sectionIndex) => (
                    <Accordion key={sectionIndex} className="border-t border-border" multiple>
                        {specificationsSection.map(({ name, specifications }, index) => (
                            <AccordionItem key={`${name}-${sectionIndex}-${index}`} value={`specification-${sectionIndex}-${index}`}>
                                <AccordionTrigger className="py-4 font-bold text-foreground hover:no-underline">
                                    {name}
                                </AccordionTrigger>
                                <AccordionContent className="rounded-md bg-muted/50 px-4">
                                    <dl className="divide-y divide-border border-b border-border">
                                        {specifications.map(({ key, value }) => (
                                            <div key={key} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-2 sm:gap-4">
                                                <dt className="text-sm font-semibold text-foreground">{key}</dt>
                                                <dd className="text-sm text-muted-foreground">{value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ))}
            </div>
        </div>)
}

export default SpecificationRenderer