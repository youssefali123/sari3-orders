import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OffersSection from "@/components/OffersSection";
import RestaurantsSection from "@/components/RestaurantsSection";
import RestaurantMenu from "@/components/RestaurantMenu";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
// import { toast } from "sonner";
import { toast } from "react-hot-toast";
import { Restaurant } from "@/types/restaurant";
import { MenuItem } from "@/types/menu";
// import Loader from "@/components/Loader";


const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const handleAddItem = (item: MenuItem, category: string, restaurantName: string) => {
    addToCart(item, category, restaurantName);
    toast.success(`تم إضافة ${item.name} للسلة`, {
      duration: 2000,
    });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    clearCart();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar cartItemsCount={totalItems} onCartClick={() => setIsCartOpen(true)} />

      <main className="flex-1">
        <Hero />
        
        <OffersSection />

        {selectedRestaurant ? (
          <RestaurantMenu
            restaurant={selectedRestaurant}
            onBack={() => setSelectedRestaurant(null)}
            onAddItem={handleAddItem}
          />
        ) : (
          <RestaurantsSection onSelectRestaurant={setSelectedRestaurant} />
        )}
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        totalPrice={totalPrice}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totalPrice={totalPrice}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
};

export default Index;