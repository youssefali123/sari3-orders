import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { MenuItem as MenuItemType } from "@/types/menu";
import { useEffect, useRef, useState } from "react";
import sound from "../assets/sound.wav"
// import { set } from "date-fns";

interface MenuItemProps {
  item: MenuItemType;
  onAdd: (item?: MenuItemType) => void;
}

//observer

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      // console.log(entry.target)
    } else {
      entry.target.classList.remove("show");
    }
  })
})

const MenuItem = ({ item, onAdd }: MenuItemProps) => {
  const itemRef = useRef(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  useEffect(() => {
    if (typeof item.price === "object") {
      const firstKey = Object.keys(item.price)[0];
      setSelectedVariant(firstKey);
      setCurrentPrice(item.price[firstKey]);
    } else {
      setCurrentPrice(item.price);
    }
  }, [item.price]);

  const handleVariantChange = (key: string) => {
    if (typeof item.price === "object") {
      setSelectedVariant(key);
      setCurrentPrice(item.price[key]);
    }
  };

  const handleAdd = () => {
    let itemToAdd = item;

    if (typeof item.price === "object" && selectedVariant) {
      itemToAdd = {
        ...item,
        name: `${item.name} ${selectedVariant} `,
        price: item.price[selectedVariant]
      };
    }

    onAdd(itemToAdd);
    const audio = new Audio(sound);
    audio.play();
    navigator.vibrate(100);
    itemRef.current.classList.add("click")
    setTimeout(() => {
      itemRef.current.classList.remove("click")
    }, 200);
  };

  useEffect(() => {
    observer.observe(itemRef.current);
  }, [])

  return (
    <div ref={itemRef} className="menu-item bg-card rounded-xl p-4 shadow-soft hover:shadow-card transition-all duration-300 group">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {item.name}
          </h4>
          {item.description && <p className="text-sm text-muted-foreground line-clamp-2 break-words group-hover:text-primary transition-colors">
            {item.description}
          </p>}
          <div className="mt-1">
            <p className="text-lg font-bold text-primary">
              {currentPrice} جنيه
            </p>
            {typeof item.price === "object" && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {Object.keys(item.price).map((key) => (
                  <Button
                    key={key}
                    variant={selectedVariant === key ? "default" : "outline"}
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => handleVariantChange(key)}
                  >
                    {key}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
        <Button
          variant="default"
          size="icon"
          onClick={handleAdd}
          className="shrink-0 hover:scale-110 transition-transform self-start mt-1"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default MenuItem;
