import { BookValidatorSchema } from '@/validators/addProduct'


interface BookRendererProps {
    bookData: BookValidatorSchema
}

const BookRenderer = ({ bookData }: BookRendererProps) => {


    return (
        <section
            className="bg-white border border-outline-variant rounded-lg overflow-hidden flex flex-col">
            <div
                className="p-6 border-b border-outline-variant bg-surface-container-lowest flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                    <span className="material-symbols-outlined text-black">info</span> Product Overview
                </h2>
            </div>
            <div className="p-6 space-y-6">
                {Object.entries(bookData).map(([key, value]) =>
                    <div key={key}>
                        <p className="text-body-sm text-on-surface-variant font-medium mb-1">Product {key}</p>
                        <p className="font-headline-md text-headline-md">{value.toString()}</p>
                    </div>)}

            </div>
        </section>
    )
}

export default BookRenderer