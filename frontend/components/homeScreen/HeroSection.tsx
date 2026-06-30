
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative h-150 overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/heroImage.png')",
                }}
            />

            <div className="absolute inset-0 bg-linear-to-t from-background/90 to-transparent" />

            <div className="commerce-container relative z-10 pt-12">
                <div className="max-w-md rounded-lg border bg-card/95 p-8 backdrop-blur">
                    <h1 className="text-4xl font-bold text-primary">
                        Elevate Your Space
                    </h1>

                    <p className="mt-4 text-muted-foreground">
                        Discover curated collections for every corner of your home.
                    </p>

                    <Button className="search-button mt-6">
                        Shop Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}