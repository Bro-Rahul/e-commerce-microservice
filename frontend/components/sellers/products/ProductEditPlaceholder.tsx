interface ProductEditPlaceholderProps {
    title: string
    description: string
}

const ProductEditPlaceholder = ({ title, description }: ProductEditPlaceholderProps) => (
    <section aria-labelledby="product-section-title" className="border border-outline-variant bg-card p-6 sm:p-8">
        <h2 id="product-section-title" className="text-lg font-bold text-foreground">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
        <p className="mt-5 border-t border-outline-variant pt-4 text-sm text-muted-foreground">
            Product data and save functionality are not connected on this page yet.
        </p>
    </section>
)

export default ProductEditPlaceholder
