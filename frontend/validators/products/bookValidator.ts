import z from "zod";

// Book inventory fields
export const bookFieldsValidator = z.object({
    binding: z.enum(
        [
            "PAPERBACK",
            "HARDCOVER",
            "BOX_SET",
            "MASS_MARKET_PAPERBACK",
        ],
        {
            error: "Please select a binding type",
        }
    ),

    isbn10: z
        .string()
        .regex(
            /^\d{9}[\dX]$/,
            "Please enter a valid ISBN-10"
        )
        .optional(),

    isbn13: z
        .string()
        .regex(
            /^\d{13}$/,
            "Please enter a valid 13-digit ISBN-13"
        )
        .optional(),
});


// Book attributes
export const BookAttributesValidator = z.object({

    author: z
        .string()
        .min(1, "Please enter the author's name"),

    isbn10: z
        .string()
        .regex(
            /^\d{9}[\dX]$/,
            "Please enter a valid ISBN-10"
        )
        .optional(),

    isbn13: z
        .string()
        .regex(
            /^\d{13}$/,
            "Please enter a valid 13-digit ISBN-13"
        )
        .optional(),

    publisher: z
        .string()
        .min(1, "Please enter the publisher name"),

    publicationDate: z.union([
        z.string().min(
            1,
            "Please select the publication date"
        ),
        z.date({
            error: "Please select a valid publication date",
        }),
    ]),

    edition: z
        .string()
        .optional(),

    language: z
        .string()
        .min(1, "Please enter the book language"),

    binding: z.enum(
        [
            "PAPERBACK",
            "HARDCOVER",
            "BOX_SET",
            "MASS_MARKET_PAPERBACK",
        ],
        {
            error: "Please select a binding type",
        }
    ),

    pages: z
        .number({
            error: "Please enter the number of pages",
        })
        .int("Number of pages must be a whole number")
        .positive("Number of pages must be greater than 0"),

    genre: z
        .string()
        .min(1, "Please enter the book genre"),

    series: z
        .string()
        .optional(),

    description: z
        .string()
        .nonempty({ error: 'Please enter a description for the book' }),

    readingAgeMin: z
        .number({
            error: "Please enter a valid minimum age",
        })
        .int("Minimum age must be a whole number")
        .nonnegative("Minimum age cannot be negative")
        .optional(),

    readingAgeMax: z
        .number({
            error: "Please enter a valid maximum age",
        })
        .int("Maximum age must be a whole number")
        .nonnegative("Maximum age cannot be negative")
        .optional(),

    countryOfOrigin: z
        .string()
        .optional(),

    height: z
        .number({
            error: "Please enter a valid height",
        })
        .positive("Height must be greater than 0")
        .optional(),

    width: z
        .number({
            error: "Please enter a valid width",
        })
        .positive("Width must be greater than 0")
        .optional(),

    thickness: z
        .number({
            error: "Please enter a valid thickness",
        })
        .positive("Thickness must be greater than 0")
        .optional(),

    weight: z
        .number({
            error: "Please enter a valid weight",
        })
        .positive("Weight must be greater than 0")
        .optional(),
});

export type BookAttributesType = z.infer<
    typeof BookAttributesValidator
>;

export const BookAuthorValidator = z.object({
    name: z
        .string({ error: "Please enter the author's name" })
        .trim()
        .min(1, "Please enter the author's name"),

    description: z
        .string({ error: "Please enter an author description" })
        .trim()
        .min(1, "Please enter an author description"),

    profilePicture: z
        .string({ error: "Please upload the author's profile picture" })
        .min(1, "Please upload the author's profile picture"),
});

export type BookAuthorType = z.infer<typeof BookAuthorValidator>;