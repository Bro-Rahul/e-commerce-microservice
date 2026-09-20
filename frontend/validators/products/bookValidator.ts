import z from "zod"

export const bookFieldsValidator = z.object({
    author: z
        .string()
        .min(1, "Author is required"),

    publisher: z
        .string()
        .min(1, "Publisher is required"),

    isbn: z
        .string()
        .min(1, "ISBN is required"),

    edition: z
        .string()
        .min(1, "Edition is required"),

    language: z
        .string()
        .min(1, "Language is required"),

    format: z
        .string()
        .min(1, "Book format is required"),
})