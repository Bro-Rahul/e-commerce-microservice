// components/home/CategoryGrid.tsx

import { CategoryCard } from "./CategoryCard";

const categories = [
    {
        title: "Electronics",
        image: "/images/productOne.png",
        linkText: "Shop and Save",
    },
    {
        title: "Home Decor",
        image: "/categories/decor.jpg",
        linkText: "Discover More",
    },
    {
        title: "Fitness",
        image: "/categories/fitness.jpg",
        linkText: "Upgrade Your Routine",
    },
    {
        title: "Beauty",
        image: "/categories/beauty.jpg",
        linkText: "Shop All Beauty",
    },
];

export function CategoryGrid() {
    return (
        <section className="-mt-40 relative z-20 bg-white">
            <div className="product-grid">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.title}
                        {...category}
                    />
                ))}
            </div>
        </section>
    );
}