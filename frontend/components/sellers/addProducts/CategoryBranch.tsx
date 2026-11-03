import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ROUTES from '@/constants/data/routes'
import { formatCategoryName } from '@/lib/utils'
import { HierarchyCategoryResponseType } from '@/types/products/SellerProductListType'
import Link from 'next/link'


const CategoryBranch = ({ category, href }: { category: HierarchyCategoryResponseType, href: string }) => {
    if (category.childCategories.length === 0) {
        return (
            <li className="min-w-0">
                <Link
                    href={href}
                    className="group flex min-h-14 items-center justify-between gap-3 rounded-lg border border-outline-variant bg-surface-container-low px-4 py-3 text-foreground no-underline transition-colors hover:border-primary hover:bg-primary-container/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    <span className="headline-sm">{formatCategoryName(category.name)}</span>
                    <span className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors group-hover:bg-primary-container/50">
                        Select
                    </span>
                </Link>
            </li>
        )
    }

    return (
        <li className="min-w-0">
            <Accordion multiple className="w-full overflow-hidden rounded-xl border border-outline-variant bg-surface">
                <AccordionItem value={category.name} className="w-full border-0">
                    <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3">
                        <AccordionTrigger className="w-full min-w-0 px-1 py-4 hover:no-underline">
                            <span className="min-w-0 flex-1">
                                <span className="headline-sm block truncate text-foreground">{formatCategoryName(category.name)}</span>
                                <span className="body-sm mt-1 block text-muted-foreground">
                                    {category.childCategories.length} subcategor{category.childCategories.length === 1 ? 'y' : 'ies'}
                                </span>
                            </span>
                        </AccordionTrigger>
                        <Link
                            href={href}
                            className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-primary no-underline hover:bg-primary-container/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                            Select
                        </Link>
                    </div>
                    <AccordionContent className="w-full px-3">
                        <ul className="ml-2 w-full list-none space-y-3 border-l border-outline-variant py-1 pl-3">
                            {category.childCategories.map((childCategory, index) => (
                                <CategoryBranch
                                    key={`${childCategory.name}-${index}`}
                                    category={childCategory}
                                    href={ROUTES.SELLER.PRODUCTS.ADD_PRODUCT.PRODUCT_FORM(childCategory.name)}
                                />
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </li>
    )
}


export default CategoryBranch;