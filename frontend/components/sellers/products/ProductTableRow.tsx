import Image from "next/image"
import { SellerProductListingType } from '@/types/products/SellerProductListType'
import { formatStatus, getStatusStyle, getStockHealth } from '@/lib/utils'
import { baseURL } from "@/repositary/baseURL"
import Link from "next/link"


interface ProductTableRowProps {
    product: SellerProductListingType
    isSelected: boolean
    onSelectionChange: (variantId: string, isSelected: boolean) => void
}

const ProductTableRow = ({ product, isSelected, onSelectionChange }: ProductTableRowProps) => {
    const health = getStockHealth(product.inventory.quantity)
    const status = formatStatus(product.productStatus)

    return (
        <tr className={`transition-colors ${isSelected ? 'bg-secondary/10 hover:bg-secondary/10' : 'hover:bg-surface-container-low/70'}`}>
            <td className="px-4 py-3.5">
                <input
                    aria-label={`Select ${product.title}`}
                    type="checkbox"
                    checked={isSelected}
                    onChange={(event) => onSelectionChange(product.variantId, event.target.checked)}
                    className="size-4 rounded-sm border-input accent-secondary"
                />
            </td>
            <td className="px-3 py-3.5">
                <Link href={`/seller/products/${product.variantId}`}>
                    <div className="flex min-w-64 items-center gap-3">
                        {product.coverImage ? (
                            <Image
                                src={`${baseURL.assetsBaseURL}${product.coverImage}`}
                                alt={`${product.title} cover`}
                                width={56}
                                height={56}
                                unoptimized
                                className="size-14 shrink-0 border border-outline-variant/70 object-cover"
                            />
                        ) : (
                            <div aria-hidden="true" className="size-14 shrink-0 border border-outline-variant/70 bg-surface-container-high" />
                        )}
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-foreground">{product.title}</p>
                            <p className="mt-0.5 truncate text-xs text-muted-foreground">{product.description}</p>
                            <p className="mt-0.5 text-[10px] text-muted-foreground">Product ID: {product.productId}</p>
                        </div>
                    </div>
                </Link>
            </td>
            <td className="px-3 py-3.5 text-sm text-foreground">{product.inventory.sku}</td>
            <td className="px-3 py-3.5">
                <span className="inline-block bg-surface-container-high px-2 py-1 text-[10px] font-bold uppercase text-on-surface-variant">{product.category}</span>
            </td>
            <td className="px-3 py-3.5 text-base font-semibold tabular-nums text-foreground">${product.inventory.price.toFixed(2)}</td>
            <td className="px-3 py-3.5">
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-3 text-[11px] font-semibold">
                        <span className="text-foreground">{product.inventory.quantity.toLocaleString()} units</span>
                        <span className={health.color}>{health.label}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-container">
                        <div className={`h-full rounded-full ${health.barColor}`} style={{ width: health.width }} />
                    </div>
                </div>
            </td>
            <td className="px-3 py-3.5">
                <span className={`inline-flex items-center gap-1.5 border px-2 py-1 text-[11px] font-bold ${getStatusStyle(product.productStatus)}`}>
                    <span className={`size-1.5 rounded-full ${product.productStatus === 'ACTIVE' ? 'bg-tertiary-container dark:bg-on-tertiary-container' : product.productStatus === 'PENDING_REVIEW' || product.productStatus === 'DRAFT' ? 'bg-secondary dark:bg-on-secondary-container' : product.productStatus === 'OUT_OF_STOCK' ? 'bg-destructive' : 'bg-on-surface-variant dark:bg-on-surface'}`} />
                    {status}
                </span>
            </td>
        </tr>
    )
}

export default ProductTableRow