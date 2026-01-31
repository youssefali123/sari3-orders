// import { Truck, Clock, MapPin } from "lucide-react";
// import Marquee from "react-fast-marquee";
const Hero = () => {
  // const features = [
  //   {
  //     icon: <Truck className="w-6 h-6 text-primary-foreground" />,
  //     title: "توصيل سريع",
  //     description: "نوصّلك في أسرع وقت",
  //   },
  //   {
  //     icon: <Clock className="w-6 h-6 text-primary-foreground" />,
  //     title: "طلب سهل",
  //     description: "اختار واطلب في ثواني",
  //   },
  //   {
  //     icon: <MapPin className="w-6 h-6 text-primary-foreground" />,
  //     title: "لحد الباب",
  //     description: "نوصّل لأي مكان",
  //   },
  // ];

  const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="bg-card rounded-2xl p-4 shadow-card hover:shadow-elevated transition-shadow duration-300 mx-3 sm:mx-0 w-[280px] sm:w-auto h-full">
      <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3">
        {icon}
      </div>
      <h3 className="font-bold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );

  return (
    <section className="gradient-hero py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div style={{ overflow: "hidden", width: "100%" }} className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 animate-fade-in">
            اطلب أكلك <span className="text-gradient">بسرعة</span>
          </h1>
          <p
            className="text-lg sm:text-xl text-muted-foreground mb-8 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            نوصّل لحد باب بيتك أشهى الأكلات. اختار اللي نفسك فيه واحنا هنوصّله لك
          </p>

          {/* Features */}
          {/* <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="block sm:hidden">
              <Marquee gradient={false} speed={40} className="py-4">
                {features.map((feature, index) => (
                  <FeatureCard key={`mobile-${index}`} {...feature} />
                ))}
              </Marquee>
            </div>

            
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={`desktop-${index}`} {...feature} />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
