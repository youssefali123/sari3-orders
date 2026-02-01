import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";
import { Restaurant, categoryIcons } from "@/types/restaurant";
import image from "../assets/menu/image.png";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

const RestaurantCard = ({ restaurant, onClick }: RestaurantCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card"
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div style={{backgroundImage: `url(${restaurant.image})`, backgroundSize: "cover", backgroundPosition: "center"}} className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-4xl shrink-0">
            {/* {restaurant.image} */}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-lg font-bold text-foreground truncate">
                {restaurant.name}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {categoryIcons[restaurant.category]} {restaurant.category}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-1">
              {restaurant.description}
            </p>
            <div className="flex items-center gap-4 text-sm">
              {restaurant.rating &&( <div className="flex items-center gap-1 text-primary">
                <Star className="w-4 h-4 fill-primary" />
                <span className="font-semibold">{restaurant.rating}</span>
              </div>)}
              {restaurant.open && <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{restaurant.open ? "يفتح من:" + restaurant.open : ""}</span>
              </div>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;