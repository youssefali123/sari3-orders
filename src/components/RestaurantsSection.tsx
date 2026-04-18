import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Restaurant, RestaurantCategory, categoryIcons } from "@/types/restaurant";
import RestaurantCard from "./RestaurantCard";
import { useAppSelector } from "../hooks/useRedux";
import Loader from "./Loader";

interface RestaurantsSectionProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

const RestaurantsSection = ({ onSelectRestaurant }: RestaurantsSectionProps) => {
  const [activeCategory, _setActiveCategory] = useState<RestaurantCategory | "الكل">(() => {
    if (typeof sessionStorage !== "undefined") {
      const saved = sessionStorage.getItem("activeCategory");
      return (saved as RestaurantCategory | "الكل") || "الكل";
    }
    return "الكل";
  });
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.replace(/\/$/, '');
  const mainType = path === '/market' ? 'market' : path === '/restaurant' ? 'restaurant' : null;

  const setMainType = (type: "restaurant" | "market" | null) => {
    if (type === "market") {
      navigate("/market");
    } else if (type === "restaurant") {
      navigate("/restaurant");
    } else {
      navigate("/");
    }
  };

  const setActiveCategory = (category: RestaurantCategory | "الكل") => {
    _setActiveCategory(category);
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("activeCategory", category);
    }
  };
  const { menu, loading, error } = useAppSelector((state) => state.menu);
  const { categories: categoriesAPI } = useAppSelector((state) => state.menu);
  
  const restaurantCategories = categoriesAPI.filter(c => c !== "market");
  const categories: (RestaurantCategory | "الكل")[] = [
    "الكل",
    ...restaurantCategories,
  ];

  if (loading) return <Loader />;
  if (error) return <div className="py-20 text-center text-red-500">{error}</div>;

  if (mainType === null) {
    return (
      <section className="py-20 min-h-[80vh] flex flex-col items-center justify-center bg-background">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <Badge variant="secondary" className="mb-6 text-lg px-6 py-2">
            مرحباً بك
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
            عايز تطلب ايه النهارده؟
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
            <div 
              onClick={() => { setMainType("restaurant"); setActiveCategory("الكل"); }}
              className="flex flex-col items-center justify-center p-12 bg-card rounded-3xl border-2 border-border hover:border-primary cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-2 group"
            >
              <div className="text-8xl mb-6 group-hover:scale-110 transition-transform">🍽️</div>
              <h3 className="text-3xl font-bold mb-3">المطاعم</h3>
              <p className="text-muted-foreground text-center text-lg">اطلب من أفضل المطاعم حولك</p>
            </div>
            
            <div 
              onClick={() => { setMainType("market"); setActiveCategory("الكل"); }}
              className="flex flex-col items-center justify-center p-12 bg-card rounded-3xl border-2 border-border hover:border-primary cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-2 group"
            >
              <div className="text-8xl mb-6 group-hover:scale-110 transition-transform">🛒</div>
              <h3 className="text-3xl font-bold mb-3">ماركت</h3>
              <p className="text-muted-foreground text-center text-lg">تسوق مقاضي البيت والمزيد</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const filteredRestaurants = menu.filter((r) => {
    if (mainType === "market") {
      return r.category === "market";
    } else {
      if (r.category === "market") return false;
      if (activeCategory === "الكل") return true;
      return r.category === activeCategory;
    }
  });

  return (
    <section className="py-10 sm:py-14 animate-in fade-in duration-500">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-6 border-b">
          <Button variant="ghost" onClick={() => setMainType(null)} className="gap-2 self-start sm:self-center mb-4 sm:mb-0">
            <span className="text-xl">&rarr;</span> رجوع
          </Button>
          
          <div className="text-center flex-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-3">
              {mainType === "restaurant" ? (
                <><span>🍽️</span> المطاعم</>
              ) : (
                <><span>🛒</span> ماركت</>
              )}
            </h2>
            <p className="text-muted-foreground">
              {mainType === "restaurant" ? "اختار من أفضل المطاعم" : "اختار من أفضل المتاجر لدينا"}
            </p>
          </div>
          
          <div className="w-24 hidden sm:block"></div> {/* Spacer for balancing centered text */}
        </div>

        {/* Category Filter */}
        {mainType === "restaurant" && (
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
        )}

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onClick={() => onSelectRestaurant(restaurant)}
              />
            ))
          ) : (
             <div className="col-span-full py-20 text-center text-muted-foreground">
                لا يوجد نتائج هنا حالياً
             </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RestaurantsSection;