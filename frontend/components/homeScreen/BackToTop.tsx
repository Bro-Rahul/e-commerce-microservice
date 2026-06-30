// components/home/BackToTop.tsx

"use client";

export function BackToTop() {
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={handleClick}
            className="mt-8 w-full bg-primary py-4 text-primary-foreground font-semibold hover:opacity-90"
        >
            Back to top
        </button>
    );
}