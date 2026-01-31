import { ArrowRight, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { menuCategoryIcons } from "@/data/restaurants";
import { Restaurant } from "@/types/restaurant";
import { MenuItem as MenuItemType } from "@/types/menu";
// import menuImage from "../assets/menu/menu1.jpg";
// import menuImage2 from "../assets/menu/menu222.png";
import MenuItem from "./MenuItem";
import { useEffect } from "react";
// import { useCallback, useEffect, useState } from "react";
// import { getMenus } from "@/services/menus";
// import { url } from "inspector";
// import { console } from "inspector";

interface RestaurantMenuProps {
  restaurant: Restaurant;
  onBack: () => void;
  onAddItem: (item: MenuItemType, category: string, restaurantName: string) => void;
}

const RestaurantMenu = ({ restaurant, onBack, onAddItem }: RestaurantMenuProps) => {
  useEffect(()=>{
    window.history.pushState({}, window.location.href);
    const handleBack = ()=>{
      onBack();
    }
    window.addEventListener("popstate", handleBack);
    return ()=>{
      window.removeEventListener("popstate", handleBack);
    }
  },[onBack])
  return (
    <section className="py-10 sm:py-14">
      <div className="container mx-auto px-4">
        {/* <div>{loading ? "laoding.." : `${JSON.stringify(menu[4])}`}</div> */}
        {/* Back Button & Header */}
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 hover:bg-primary/10"
          >
            <ArrowRight className="w-5 h-5 ml-2" />
            العودة للمطاعم
          </Button>

          {/* Restaurant Info */}
          <div className="bg-card border-2 border-border rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center text-5xl shrink-0">
                {restaurant.image}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  {restaurant.name}
                </h2>
                <p className="text-muted-foreground text-sm mb-2">
                  {restaurant.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="secondary">
                    {restaurant.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-primary">
                    <Star className="w-4 h-4 fill-primary" />
                    <span className="font-semibold">{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Categories */}
          <div className="grid gap-8">
            {Object.entries(restaurant.menu).map(([category, items]) => {
              const icon = menuCategoryIcons[category] || "🍽️";
              return (
                <div key={category} className="animate-fade-in">
                  <div style={{ backgroundColor: "transparent", backgroundImage: `url(${items.image})`, backgroundSize: "cover", backgroundPosition: "center", padding: "5rem 1rem" }} className="  rounded-xl flex items-center gap-3 mb-4">
                    <span className="text-3xl">{icon}</span>
                    {/* <span className="text-3xl">
                      <img width={120} src={menuImage2} alt="menuImage2" />
                    </span> */}
                    <h3 className="bg-card rounded-xl p-1 text-xl font-bold text-foreground">{category}</h3>
                    <div className="flex-1 h-px bg-border"></div>
                  </div>
                  <div className="grid gap-3">
                    {items.items.map((item) => (
                      <MenuItem
                        key={item.name}
                        item={item}
                        onAdd={() => onAddItem(item, category, restaurant.name)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantMenu;