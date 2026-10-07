'use client'
import { Button } from '@/components/ui/button'
import useImageLoader from '@/hooks/dexies/useImageLoader'
import useProductImage from '@/hooks/dexies/useProductImage'
import { AvailableCategoryType } from '@/types/inventoryTypes'
import { Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'


interface SaveAssetsBtnProps {
    slug: AvailableCategoryType
    variantId: string,
    advanceOnSave?: boolean
}

const SaveAssetsBtn = ({ slug, variantId, advanceOnSave = true }: SaveAssetsBtnProps) => {
    const { getImages } = useProductImage();
    const images = useImageLoader({
        dependency: [],
        loaderFn: async () => await getImages("phone", "CoverImage", variantId)
    });
    const { push } = useRouter();

    const handleClick = () => {
        if (!images) {
            toast.error("Please Provide Cover Image! ", {
                position: 'bottom-right',
                duration: 5000
            })
            return;
        }
        if (advanceOnSave) {
            push(`/seller/add-product/${slug}/product-detail`)
            return
        }

        toast.success("Media assets saved", {
            position: 'bottom-right',
            duration: 5000
        })

    }

    return (
        <div className="flex flex-col-reverse gap-3 border-t border-outline-variant bg-surface-container-low px-5 py-4 sm:flex-row sm:justify-end sm:px-8">
            <Button
                type='button'
                className="rounded-lg border border-outline-variant px-5 py-2.5 text-sm font-bold text-on-surface transition hover:bg-surface-container"
                variant={'outline'}
                onClick={handleClick}
            >
                <Save />Save
            </Button>
        </div>
    )
}

export default SaveAssetsBtn