'use client'
import { Button } from '@/components/ui/button'
import useImageLoader from '@/hooks/seller/useImageLoader'
import { AvailableCategoryType } from '@/types/inventoryTypes'
import { Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'


interface SaveAssetsBtnProps {
    slug: AvailableCategoryType
}

const SaveAssetsBtn = ({ slug }: SaveAssetsBtnProps) => {
    const { handleImage, images } = useImageLoader(slug, "CoverImage");
    const { push } = useRouter();

    const handleClick = () => {
        if (images.length === 0) {
            toast.error("Please Provide Cover Image! ", {
                position: 'bottom-right',
                duration: 5000
            })
            return;
        }
        push(`/seller/add-product/${slug}/product-detail`);

    }

    return (
        <div className="flex flex-col-reverse gap-3 border-t border-outline-variant bg-surface-container-low px-5 py-4 sm:flex-row sm:justify-end sm:px-8">
            <Button
                type='submit'
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