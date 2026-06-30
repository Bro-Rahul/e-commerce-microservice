import { ImageTableRowType } from "@/types/indexDb";
import Dexie, { Table } from "dexie";


export class ImageDB extends Dexie {
    images!: Table<ImageTableRowType, string>;

    constructor() {
        super("ImageDatabase");

        this.version(1).stores({
            images: "id, name, category, isCoverImage, createdAt",
        });
    }
}

export const db = new ImageDB();