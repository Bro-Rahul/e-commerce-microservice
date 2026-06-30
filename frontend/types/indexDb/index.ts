export interface ImageTableRowType {
    id: string
    name: string;
    file: Blob;
    createdAt: Date;
    category: string;
    isCoverImage: boolean;
}
