import useProductVariantProvider from "@/hooks/context/useProductVariantProvider";
import { useRouter } from "next/navigation"
import toast from "react-hot-toast";

interface ProductVariantsProps {
    variantsOptions: Record<string, string[]>
    selectedVariantOptions: Record<string, string>
}

const ProductVariants = ({ variantsOptions, selectedVariantOptions }: ProductVariantsProps) => {
    const { push } = useRouter();
    const { toggleVariantOptions, setVariantData, category } = useProductVariantProvider();
    const handleToggleVariant = (variantName: string, value: string) => {
        const { newVariantId, updatedSelections } = toggleVariantOptions(selectedVariantOptions, variantName, value);
        console.log(newVariantId)
        console.log(updatedSelections)
        if (newVariantId && category) {
            setVariantData(pre => ({
                ...pre,
                selectedOptions: updatedSelections,
                stockAvailable: true,
                currentVariant: newVariantId
            }));
            push(`/seller/add-product/${category}/product-display/${newVariantId}`)
        } else {
            setVariantData(pre => ({
                ...pre,
                selectedOptions: updatedSelections,
                stockAvailable: false,
            }));
            toast.error("No such varian Exits for this product", {
                position: 'bottom-right',
                duration: 5000
            })
        }

    }

    return (
        <section className="border-t border-border px-4 py-6 md:px-6" aria-labelledby="product-variants-heading">
            <div className="flex flex-col gap-4">
                {Object.entries(variantsOptions).map(([variantName, values]) => (
                    <article key={variantName} className="bg-card">
                        <p className="mb-2 text-sm text-foreground">
                            <span className="capitalize">{variantName}</span>:{' '}
                            <strong>{selectedVariantOptions[variantName]}</strong>
                        </p>

                        <div className="flex flex-wrap items-stretch gap-2">
                            {values.map((value) => {
                                const isSelected = selectedVariantOptions[variantName] === value

                                return (
                                    <button
                                        key={`${variantName}-${value}`}
                                        type="button"
                                        aria-pressed={isSelected}
                                        onClick={() => handleToggleVariant(variantName, value)}
                                        className={`min-w-24 rounded-md border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isSelected
                                            ? 'border-primary bg-primary/10 font-semibold text-foreground ring-1 ring-primary'
                                            : 'border-border bg-background text-foreground hover:border-primary hover:bg-primary/5'
                                            }`}
                                    >
                                        {value}
                                    </button>
                                )
                            })}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default ProductVariants