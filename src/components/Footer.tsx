import { Zap, Heart } from "lucide-react";
import Tooltip from "./ui/toolip";

const Footer = () => {
  return (
    <footer style={{padding: "2rem 0 0 0"}} className="bg-card border-t border-border flex flex-col justify-center ">
      <div style={{backgroundColor:""}} className="container mx-auto px-4">
        <div className="text-center">
          {/* <div>
            <Tooltip></Tooltip>
          </div> */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              {/* <Zap className="w-4 h-4 text-primary-foreground" /> */}
              <img src="/src/assets/logo.png" alt="" />
            </div>
            <span className="text-xl font-bold text-gradient">سريع</span>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            خدمة توصيل الطلبات لحد باب بيتك
          </p>
        </div>
      </div>
          <p style={{backgroundColor:"black"}} className="py-1 text-sm text-muted-foreground flex items-center justify-center gap-1">
            صنع بـواسطة 
            {/* <Heart className="w-4 h-4 text-accent fill-accent" /> */}
            <a target="_blank" href="https://wa.me/201096150381" style={{fontWeight: "bold", color: "#fac402", fontSize: "1.16rem"}}>يوسف علي</a>
            في مصر
          </p>
    </footer>
  );
};

export default Footer;
