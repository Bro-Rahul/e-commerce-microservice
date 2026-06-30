import { ImageTableRowType } from "@/types/indexDb";
import { db } from "./indexDb";



export async function addImage(payload: ImageTableRowType): Promise<string> {
    return await db.images.put(payload);
}

export async function addGallaryImages(payload: ImageTableRowType[]): Promise<string> {
    const id = await db.images.bulkPut(payload);
    return id;
}

export async function getImagesByCategory(category: string) {
    return await db.images.where("category").equals(category).toArray();
}


export async function deleteImageById(id: string) {
    await db.images.delete(id);
}