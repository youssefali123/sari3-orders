import { MenuData } from "./menu";

export type RestaurantCategory = "مشويات" | "أسماك" | "سندوتشات" | "مأكولات شرقية" | "حلويات";

export interface Restaurant {
    id: string;
    name: string;
    description: string;
    category: RestaurantCategory;
    rating: number;
    deliveryTime: string;
    image: string;
    menu: MenuData;
    open: string;
}

export const categoryIcons: Record<RestaurantCategory, string> = {
    "مشويات": "🍖",
    "أسماك": "🐟",
    "سندوتشات": "🥪",
    "مأكولات شرقية": "🍲",
    "حلويات": "🍰",
};
