import Heading from "@/components/sellers/addProducts/Heading"
import CoverImage from "@/components/sellers/addProducts/mediaAssets/CoverImage"
import ImageCarousel from "@/components/sellers/addProducts/mediaAssets/ImageCarousel"
import ImageCollection from "@/components/sellers/addProducts/mediaAssets/ImageCollection"
import { Button } from "@/components/ui/button"
import { Images } from "lucide-react"

interface MediaAssetsPageProps {
    params: Promise<{
        slug: string
    }>
}

const page = async ({ params }: MediaAssetsPageProps) => {
    const { slug } = await params

    return (
        <main className="mx-auto w-[80%] flex-1 px-4 pb-32 pt-6 sm:px-6 md:px-10 md:pt-10">
            <Heading Icon={Images}>
                <span>
                    <span className="headline-md block">Media assets</span>
                    <span className="mt-1 block text-sm font-normal text-on-surface-variant">
                        Add clear, high-quality images that show your product at its best.
                    </span>
                </span>
            </Heading>

            <form className="overflow-hidden rounded-xl border border-outline-variant bg-card shadow-sm">
                <div className="border-b border-outline-variant bg-surface-container-low px-5 py-4 sm:px-8">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined rounded-lg bg-primary p-2 text-xl text-on-primary text-white">
                            photo_library
                        </span>
                        <div>
                            <h2 className="headline-sm">Product images</h2>
                            <p className="mt-1 text-sm text-on-surface-variant">
                                Add a primary image, carousel images, and supporting product photos.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-8 p-5 sm:p-8">
                    <CoverImage />
                    <ImageCarousel />
                    <ImageCollection />
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-outline-variant bg-surface-container-low px-5 py-4 sm:flex-row sm:justify-end sm:px-8">
                    <Button
                        className="rounded-lg border border-outline-variant px-5 py-2.5 text-sm font-bold text-on-surface transition hover:bg-surface-container"
                        variant="outline"
                        type="button"
                    >
                        Cancel
                    </Button>
                    <a href={`/seller/add-product/${slug}/inventory`}>
                        <Button
                            className="w-full rounded-lg bg-secondary px-5 py-2.5 text-sm font-bold text-on-secondary transition hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:ring-offset-2 sm:w-auto"
                            type="submit"
                        >
                            Save and continue
                        </Button>
                    </a>
                </div>
            </form>
        </main>
    )
}

export default page