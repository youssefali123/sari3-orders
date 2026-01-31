import { MenuItem as MenuItemType } from "@/types/menu";
import MenuItem from "./MenuItem";
import { categoryIcons } from "@/data/menu";

interface MenuCategoryProps {
  category: string;
  items: MenuItemType[];
  onAddItem: (item: MenuItemType, category: string) => void;
}

const MenuCategory = ({ category, items, onAddItem }: MenuCategoryProps) => {
  const icon = categoryIcons[category] || "🍽️";

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <h3 className="text-xl font-bold text-foreground">{category}</h3>
        <div className="flex-1 h-px bg-border"></div>
      </div>
      <div className="grid gap-3">
        {items.map((item) => (
          <MenuItem
            key={item.name}
            item={item}
            onAdd={() => onAddItem(item, category)}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
