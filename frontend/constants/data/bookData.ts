import { BookAttributesType, BookAuthorType } from "@/validators/products/bookValidator";

export const defaultBookAttributes: BookAttributesType = {
    author: '',
    isbn10: '',
    isbn13: '',
    publisher: '',
    publicationDate: '',
    edition: '',
    language: '',
    binding: 'PAPERBACK',
    pages: 0,
    genre: '',
    series: '',
    description: '',
    readingAgeMin: undefined,
    readingAgeMax: undefined,
    countryOfOrigin: '',
    height: undefined,
    width: undefined,
    thickness: undefined,
    weight: undefined,
}

export const defaultBookAuthor: BookAuthorType = {
    name: '',
    description: '',
    profilePicture: '',
}


export const bookVariantKeyOptions: string[] = ["binding"] 