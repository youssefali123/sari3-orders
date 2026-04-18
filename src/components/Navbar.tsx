import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

import logo from "../assets/logo.png"
import  useIsScrollDown  from "../hooks/useIsScroolDown";
import  Switch2  from "./ui/switch2";
import NavbarSearch from "./NavbarSearch";

interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

const Navbar = ({ cartItemsCount, onCartClick }: NavbarProps) => {
    const [isScrollDown, scrollY, scrollDelta] = useIsScrollDown();
    const [progress, setProgress] = useState(0);
    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        setProgress(scrollPercent);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    /*
     className={`
    sticky top-0 z-50
    bg-card/95 backdrop-blur-md
    border-b border-border
    transition-all duration-300 ease-in-out
    ${ (isScrollDown && scrollY && 0 > 200)
  ? "-translate-y-full opacity-0 duration-200"
  : "translate-y-0 opacity-100 duration-400"}
  `}
     */
  return (
    <nav
      
      className={`
        sticky top-0 z-50
        bg-card/95 backdrop-blur-md
        border-b border-border
        transition-all duration-300 ease-in-out
      `}
    >
      <div className="progress" style={{width: `${progress}%`}}></div>
    {/* <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft"> */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-1 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 animate-logo-slide shrink-0">
            <div style={{overflow: "hidden"}} className="w-8 h-8 sm:w-10 sm:h-10 gradient-primary rounded-xl flex items-center justify-center shadow-soft">
              <img className="w-8 h-8 sm:w-10 sm:h-10" src={logo} alt="logo" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gradient hidden sm:inline">سريع</span>
          </div>

          <NavbarSearch />

          {/* Right section: Switch & Cart Button */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Switch2 />
            <Button
              variant="cart"
              size="default"
            onClick={onCartClick}
            className="relative"
          >

            <ShoppingCart className="w-5 h-5" />
            <span style={{userSelect: "none"}} className="hidden sm:inline">السلة</span>
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -left-2 w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center animate-bounce-soft">
                {cartItemsCount}
              </span>
            )}
          </Button>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
