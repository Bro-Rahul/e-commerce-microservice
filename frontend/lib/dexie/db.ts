
import { BookAuthorTableType } from "@/types/dexie/bookAuthorTableType";
import { MediaAssetsType } from "@/types/dexie/mediaAssetsTypes";
import Dexie, { type Table } from "dexie";


class MediaAssetsDb extends Dexie {
    mediaAssets!: Table<MediaAssetsType, number>
    bookAuthor!: Table<BookAuthorTableType, number>

    constructor() {
        super("assets")

        this.version(1).stores({
            mediaAssets: "++id, category, imageType, [category+imageType]",
            bookAuthor: "++id, name"
        })
    }
}


const db = new MediaAssetsDb();

export default db;