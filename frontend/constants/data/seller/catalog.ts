import {
    BookOpen,
    Gamepad2,
    House,
    MonitorSmartphone,
    Shirt,
    Smartphone,
    Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";


export type CategoryAvailable = {
    name: string;
    description: string;
    icon: LucideIcon;
};

export const categories = [
    { name: "Books", description: "Physical, eBooks, and Audiobooks", icon: BookOpen },
    { name: "Phones", description: "Mobile, Smart, and Tablets", icon: Smartphone },
    { name: "Electronics", description: "TV, Computing, and Gear", icon: MonitorSmartphone },
    { name: "Home & Kitchen", description: "Decor, Cooking, and Furniture", icon: House },
    { name: "Clothing", description: "Fashion, Footwear, and Style", icon: Shirt },
    { name: "Beauty", description: "Skincare, Cosmetics, and Care", icon: Sparkles },
    { name: "Toys", description: "Games, Puzzles, and Play", icon: Gamepad2 },
];