// components/home/BestSellerBooks.tsx

import { BookCard } from "../card/BookCard";

const books = [
    {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 12.99,
        rating: 4.5,
        reviews: 45123,
        image: "/books/book-1.jpg",
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        price: 15.2,
        rating: 5,
        reviews: 98204,
        image: "/books/book-2.jpg",
    },
];

export function BestSellerBooks() {
    return (
        <section className="commerce-section">
            <div className="rounded-lg border bg-card p-5">
                <h2 className="mb-6 text-2xl font-bold">
                    Best Sellers in Books
                </h2>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {books.map((book) => (
                        <BookCard
                            key={book.id}
                            {...book}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}