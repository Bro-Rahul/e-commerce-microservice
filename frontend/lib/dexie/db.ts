import { MediaAssetsType } from "@/types/mediaAssetsTypes";
import Dexie, { type Table } from "dexie";


class MediaAssetsDb extends Dexie {
    mediaAssets!: Table<MediaAssetsType, number>

    constructor() {
        super("assets")

        this.version(1).stores({
            mediaAssets: "++id, category, imageType, [category+imageType]",
        })
    }
}


const db = new MediaAssetsDb();

export default db;