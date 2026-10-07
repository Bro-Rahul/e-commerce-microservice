import db from '@/lib/dexie/db'
import { BookAuthorTableType } from '@/types/dexie/bookAuthorTableType'
import { AvailableCategoryType } from '@/types/inventoryTypes'

const useAuthorImage = () => {

    const addAuthorProfile = async (profile: BookAuthorTableType) => {
        await db.bookAuthor.clear()
        return await db.bookAuthor.add(profile)
    }

    const getAuthorProfile = async () => {
        return await db.bookAuthor.toCollection().first()
    }

    const deleteAuthorProfile = async (id: number) => {
        return await db.bookAuthor.delete(id);
    }

    const deleteVariantImages = async (category: AvailableCategoryType, variantId: number) => {
        return await db.mediaAssets
            .where(["category+variantId"])
            .equals([category, variantId])
            .delete()
    }

    return {
        deleteAuthorProfile,
        getAuthorProfile,
        addAuthorProfile,
        deleteVariantImages
    }

}

export default useAuthorImage