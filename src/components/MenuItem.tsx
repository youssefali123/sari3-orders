import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { MenuItem as MenuItemType } from "@/types/menu";
import { useEffect, useRef } from "react";

interface MenuItemProps {
  item: MenuItemType;
  onAdd: () => void;
}

//observer

const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      // console.log(entry.target)
    }else{
      entry.target.classList.remove("show");
    }
  })
})

const MenuItem = ({ item, onAdd }: MenuItemProps) => {
  const itemRef = useRef(null);
  // observer.observe(itemRef.current);
  const handleAdd = () => {
    onAdd();
    // itemRef.current.style.scale = "1.1";
    itemRef.current.classList.add("click")
    setTimeout(() => {
      itemRef.current.classList.remove("click")
    }, 200);
    // itemRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(()=>{
    observer.observe(itemRef.current);
  },[])
  return (
    <div ref={itemRef}  className="menu-item bg-card rounded-xl p-4 shadow-soft hover:shadow-card transition-all duration-300 group">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {item.name}
          </h4>
         {item.description && <h2 className="text-sm text-muted-foreground truncate group-hover:text-primary transition-colors">
            {item.description}
          </h2>}
          <p className="text-lg font-bold text-primary mt-1">
            {item.price} جنيه
          </p>
        </div>
        <Button
          variant="default"
          size="icon"
          onClick={handleAdd}
          className="shrink-0 hover:scale-110 transition-transform"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default MenuItem;
