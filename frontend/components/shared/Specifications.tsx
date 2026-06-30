import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


interface Specifications {
    name: string,
    specification: Record<string, string>
}

interface SpecificationsProps {
    specifications: Specifications[]
}

const Specifications = ({ specifications }: SpecificationsProps) => {
    return (

        <section className="border-t border-gray-200 pt-10">
            <h3 className="mb-8 text-2xl font-bold text-gray-900">
                Product Information
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                <div className="space-y-1">
                    {specifications
                        .filter((_, i) => i % 2 === 0)
                        .map((specification) => (
                            <Accordion
                                key={specification.name}
                                type="single"
                                collapsible
                                className="w-full"
                            >
                                <AccordionItem
                                    value={specification.name}
                                    className="border border-gray-200 bg-white"
                                >
                                    <AccordionTrigger className="px-5 py-4 text-left font-semibold hover:no-underline">
                                        {specification.name}
                                    </AccordionTrigger>

                                    <AccordionContent className="pb-4">
                                        <div className="border-t border-gray-100">
                                            {Object.entries(specification.specification).map(
                                                ([key, value], index, arr) => (
                                                    <div
                                                        key={key}
                                                        className={`grid grid-cols-2 px-4 py-3 ${index !== arr.length - 1
                                                            ? "border-b border-gray-100"
                                                            : ""
                                                            } ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                                    >
                                                        <p className="font-medium text-gray-600 capitalize">
                                                            {key}
                                                        </p>
                                                        <p className="text-right text-gray-900">
                                                            {value}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))}
                </div>

                <div className="space-y-1">
                    {specifications
                        .filter((_, i) => i % 2 === 1)
                        .map((specification) => (
                            <Accordion
                                key={specification.name}
                                type="single"
                                collapsible
                                className="w-full"
                            >
                                <AccordionItem
                                    value={specification.name}
                                    className="border border-gray-200 bg-white"
                                >
                                    <AccordionTrigger className="px-5 py-4 text-left font-semibold hover:no-underline">
                                        {specification.name}
                                    </AccordionTrigger>

                                    <AccordionContent className="pb-4">
                                        <div className="border-t border-gray-100">
                                            {Object.entries(specification.specification).map(
                                                ([key, value], index, arr) => (
                                                    <div
                                                        key={key}
                                                        className={`grid grid-cols-2 px-4 py-3 ${index !== arr.length - 1
                                                            ? "border-b border-gray-100"
                                                            : ""
                                                            } ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                                    >
                                                        <p className="font-medium text-gray-600 capitalize">
                                                            {key}
                                                        </p>
                                                        <p className="text-right text-gray-900">
                                                            {value}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))}
                </div>
            </div>
        </section>
    )
}

const data = <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
    <div className="space-y-px">
        <div className="accordion-item flex justify-between items-center py-3 cursor-pointer group">
            <span className="font-bold text-sm">Additional details</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
        </div>
        <div className="accordion-item flex justify-between items-center py-3 cursor-pointer group">
            <span className="font-bold text-sm">Camera</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
        </div>
        <div className="accordion-item flex justify-between items-center py-3 cursor-pointer group">
            <span className="font-bold text-sm">Battery</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
        </div>
        <div className="accordion-item flex justify-between items-center py-3 cursor-pointer group">
            <span className="font-bold text-sm">Measurements</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
        </div>
        <div
            className="accordion-item border-b border-gray-200 flex justify-between items-center py-3 cursor-pointer group">
            <span className="font-bold text-sm">Video</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
        </div>
    </div>

    <div className="space-y-px">
        <div className="accordion-item flex justify-between items-center py-3 cursor-pointer group">
            <span className="font-bold text-sm">Display</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
        </div>
        <div className="accordion-item flex justify-between items-center py-3 cursor-pointer group">
            <span className="font-bold text-sm">Connectivity</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
        </div>
        <div className="accordion-item flex justify-between items-center py-3 cursor-pointer group">
            <span className="font-bold text-sm">Item details</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
        </div>
        <div className="accordion-item flex justify-between items-center py-3 cursor-pointer group">
            <span className="font-bold text-sm">Battery Life</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
        </div>
        <div
            className="accordion-item border-b border-gray-200 flex justify-between items-center py-3 cursor-pointer group">
            <span className="font-bold text-sm">Navigation</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
        </div>
    </div>
</div>

export default Specifications