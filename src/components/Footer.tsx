import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer style={{ padding: "2rem 0 0 0" }} className="bg-card border-t border-border flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center overflow-hidden">
              <img src={logo} alt="سريع" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-gradient">سريع</span>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            منصة وتطبيق توصيل الطلبات والوجبات لحد باب بيتك
          </p>

          {/* Legal Links for App Stores & Users */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-muted-foreground pb-4 border-b border-border/50 max-w-md mx-auto">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              سياسة الخصوصية
            </Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-primary transition-colors">
              شروط الاستخدام
            </Link>
            <span>·</span>
            <Link to="/delete-account" className="hover:text-destructive transition-colors">
              طلب حذف الحساب
            </Link>
          </div>
        </div>
      </div>
      <p style={{ backgroundColor: "black" }} className="py-2.5 text-xs sm:text-sm text-muted-foreground flex items-center justify-center gap-1.5 mt-2">
        <span>صنع بواسطة</span>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://wa.me/201096150381"
          style={{ fontWeight: "bold", color: "#fac402", textDecoration: "underline" }}
        >
          يوسف علي
        </a>
        <span>في مصر · جميع الحقوق محفوظة لمنصة سريع © {new Date().getFullYear()}</span>
      </p>
    </footer>
  );
};

export default Footer;
