import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Restaurant, RestaurantCategory, categoryIcons } from "@/types/restaurant";
import RestaurantCard from "./RestaurantCard";
import { useAppSelector } from "../hooks/useRedux";

interface RestaurantsSectionProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
}


const RestaurantsSection = ({ onSelectRestaurant }: RestaurantsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<RestaurantCategory | "الكل">("الكل");
  const { menu, loading, error } = useAppSelector((state) => state.menu);
  const { categories: categoriesAPI } = useAppSelector((state) => state.menu);
  const categories: (RestaurantCategory | "الكل")[] = [
    "الكل",
    ...categoriesAPI,
  ]
  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (error) return <div className="py-20 text-center text-red-500">{error}</div>;

  const filteredRestaurants =
    activeCategory === "الكل"
      ? menu
      : menu.filter((r) => r.category === activeCategory);

  return (
    <section className="py-10 sm:py-14">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-3 text-sm px-4 py-1">
            🍽️ اختر مطعمك
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            المطاعم
          </h2>
          <p className="text-muted-foreground">اختار من أفضل المطاعم</p>
        </div>

        {/* Category Filter */}
        <div style={{ width: "100%" }} className="flex justify-center items-center">
          <div style={{ WebkitOverflowScrolling: "touch", userSelect: "none", overflowX: 'auto', whiteSpace: 'nowrap', scrollbarWidth: 'none', scrollbarColor: 'transparent transparent', maxWidth: '100%' }} className="flex justify-start gap-2 mb-8 items-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category !== "الكل" && (
                  <span className="ml-1">{categoryIcons[category]}</span>
                )}
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => onSelectRestaurant(restaurant)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantsSection;