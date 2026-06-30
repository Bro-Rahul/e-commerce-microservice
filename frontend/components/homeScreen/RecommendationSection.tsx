// components/home/RecommendationSection.tsx

import { ProductCard } from "../card/ProductCard";

const products = [
    {
        id: 1,
        title:
            "Sonic Electric Toothbrush with Travel Case",
        price: 49.99,
        image: "/products/toothbrush.jpg",
        delivery: "Get it Tomorrow",
    },
    {
        id: 2,
        title:
            "Performance Running Shoes",
        price: 75,
        image: "/products/shoes.jpg",
        delivery: "Prime One-Day Shipping",
    },
    {
        id: 3,
        title:
            "Automatic Espresso Machine",
        price: 599.99,
        image: "/products/coffee-machine.jpg",
        delivery: "Ships Free",
    },
    {
        id: 4,
        title:
            "Titanium Smart Ring",
        price: 299,
        image: "/products/ring.jpg",
        delivery: "New Arrival",
    },
    {
        id: 5,
        title:
            "Professional Knife Set",
        price: 129.99,
        image: "/products/knife-set.jpg",
        delivery: "Free Two-Day Shipping",
    },
];

export function RecommendationSection() {
    return (
        <section className="commerce-section">
            <div className="rounded-lg border bg-card p-5">
                <div className="mb-6 flex items-center gap-2">
                    <h2 className="text-2xl font-bold">
                        Inspired by your browsing history
                    </h2>

                    <span className="text-sm text-muted-foreground">
                        Recommended for you
                    </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            {...product}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}