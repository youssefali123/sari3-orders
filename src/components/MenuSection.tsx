import { menuData } from "@/data/menu";
import { MenuItem } from "@/types/menu";
import MenuCategory from "./MenuCategory";

interface MenuSectionProps {
  onAddItem: (item: MenuItem, category: string) => void;
}

const MenuSection = ({ onAddItem }: MenuSectionProps) => {
  return (
    <section className="py-10 sm:py-14">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            المنيو
          </h2>
          <p className="text-muted-foreground">اختار من أشهى الأصناف</p>
        </div>

        <div className="grid gap-8 sm:gap-10 max-w-2xl mx-auto">
          {Object.entries(menuData).map(([category, items]) => (
            <MenuCategory
              key={category}
              category={category}
              items={items}
              onAddItem={onAddItem}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
