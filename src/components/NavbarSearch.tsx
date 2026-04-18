import { useState, useMemo, useRef, useEffect } from "react";
import { Search, Plus, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addToCart } from "../store/cartSlice";
import { MenuItem } from "../types/menu";
import { Button } from "./ui/button";
import sound from "../assets/sound.wav";
import toast from "react-hot-toast";

interface SearchResult {
  item: MenuItem;
  category: string;
  restaurantName: string;
}

const NavbarSearch = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const menu = useSelector((state: RootState) => state.menu.menu);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    const found: SearchResult[] = [];
    
    for (const restaurant of menu) {
      if (!restaurant.menu) continue;
      
      for (const [category, categoryData] of Object.entries(restaurant.menu)) {
        if (!categoryData || !categoryData.items) continue;
        
        for (const item of categoryData.items) {
          if (item.name.toLowerCase().includes(lowerQuery)) {
            found.push({
              item,
              category,
              restaurantName: restaurant.name
            });
            if (found.length >= 10) return found; // Limit to 10 results
          }
        }
      }
    }
    return found;
  }, [query, menu]);

  const playSoundAndClose = () => {
    const audio = new Audio(sound);
    audio.play();
    setIsFocused(false);
    setQuery("");
  };

  const handleAdd = (result: SearchResult) => {
    if (typeof result.item.price === "object") return;
    
    dispatch(addToCart({
      item: result.item,
      category: result.category,
      restaurantName: result.restaurantName
    }));
    toast.success(`تم إضافة ${result.item.name} إلى السلة`);
    playSoundAndClose();
  };

  const handleAddVariant = (result: SearchResult, variantName: string, price: number) => {
    dispatch(addToCart({
      item: {
        ...result.item,
        name: `${result.item.name} ${variantName}`,
        price: price
      },
      category: result.category,
      restaurantName: result.restaurantName
    }));
    toast.success(`تم إضافة ${result.item.name} ${variantName} إلى السلة`);
    playSoundAndClose();
  };

  return (
    <div className={`transition-all duration-300 ${
      isFocused
        ? "fixed inset-x-0 top-0 z-[100] p-3 bg-card shadow-md sm:relative sm:inset-auto sm:p-0 sm:bg-transparent sm:shadow-none sm:z-auto sm:flex-1 sm:max-w-sm sm:mx-2"
        : "relative flex-1 max-w-sm mx-2"
    }`} ref={containerRef}>
      <div className="flex items-center gap-2 relative">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="عايز تطلب ايه..."
            className="w-full bg-secondary text-foreground text-sm rounded-full pr-10 pl-4 py-2 border-0 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground"
            dir="rtl"
          />
        </div>
        {isFocused && (
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden shrink-0 h-9 w-9 p-0 hover:bg-secondary"
            onClick={(e) => {
              e.preventDefault();
              setIsFocused(false);
              setQuery("");
            }}
          >
            <X className="w-5 h-5 text-foreground" />
          </Button>
        )}
      </div>

      {isFocused && query.trim() && (
        <div className="absolute left-0 right-0 top-full mt-2 sm:w-full bg-card sm:rounded-xl rounded-b-xl shadow-lg border border-border overflow-hidden z-[60]" dir="rtl">
          {results.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto">
              {results.map((result, index) => (
                <li key={`${result.restaurantName}-${result.item.name}-${index}`} className="flex flex-col p-3 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 pl-2">
                      <p className="font-semibold text-sm text-foreground truncate">{result.item.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{result.restaurantName}</p>
                      {typeof result.item.price === 'number' && (
                        <p className="text-primary font-bold text-sm mt-1">{result.item.price} جنيه</p>
                      )}
                    </div>
                    {typeof result.item.price === 'number' && (
                      <Button
                        variant="default"
                        size="icon"
                        className="h-8 w-8 shrink-0 hover:scale-110 transition-transform"
                        onClick={() => handleAdd(result)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  {typeof result.item.price === 'object' && (
                    <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-border/50">
                      {Object.entries(result.item.price).map(([variantName, price]) => (
                        <div key={variantName} className="flex items-center justify-between pl-2">
                           <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground bg-primary/10 text-primary px-2 py-0.5 rounded-full">{variantName}</span>
                              <span className="text-primary font-bold text-sm">{price} جنيه</span>
                           </div>
                           <Button
                             variant="outline"
                             size="sm"
                             className="h-6 text-xs gap-1 hover:scale-105 transition-transform"
                             onClick={() => handleAddVariant(result, variantName, price)}
                           >
                             <Plus className="w-3 h-3" />
                             إضافة
                           </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
             <div className="p-4 text-center text-sm text-muted-foreground">
               لا يوجد نتائج لـ "{query}"
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarSearch;
