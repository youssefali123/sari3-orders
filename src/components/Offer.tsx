import { Swiper, SwiperSlide } from "swiper/react";
import { ShoppingCart } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import { toast } from "react-hot-toast";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface OfferItem {
  id: number;
  title: string;
  description: string;
  discount: string;
  price: number;
  icon: "flame" | "percent" | "gift";
  bgGradient: string;
  image: string;
  date: string;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

const OfferCard = ({ item }: { item: OfferItem }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(new Date(item.date)));
  const { addToCart } = useCart();

  const now = new Date().getTime();
  const target = new Date(item.date).getTime();

  useEffect(() => {
    if (now > target) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  }, [now, target])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(new Date(item.date)));
    }, 1000);

    return () => clearInterval(timer);
  }, [item.date]);

  const handleAddToCart = () => {
    addToCart({
      name: item.title,
      price: item.price,
      // description: item.description
    }, "عروض خاصة");
    toast.success("تمت الإضافة للسلة");
  };

  const timeUnits = [
    { label: "يوم", value: timeLeft.days },
    { label: "ساعة", value: timeLeft.hours },
    { label: "دقيقة", value: timeLeft.minutes },
    { label: "ثانية", value: timeLeft.seconds },
  ];

  return (
    //mx-auto
    <div  className="flex flex-col items-center justify-center bg-black/50 text-white p-2 md:p-4 rounded-lg md:rounded-xl backdrop-blur-sm shadow-lg max-w-[250px] md:max-w-xs swiper-no-swiping">
      <button 
        onClick={handleAddToCart}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-xs md:text-sm"
      >
        <ShoppingCart size={16} />
        <span>أضف للسلة - {item.price} ج.م</span>
      </button>
      <h2 className="text-sm md:text-lg font-bold mb-1">عرض خاص</h2>
      <p className="mb-2 md:mb-3 text-[10px] md:text-xs opacity-90 text-center">متبقي على انتهاء العرض اطلبه بسرعة</p>
      <div className="flex gap-1 md:gap-2 mb-3">
        {timeUnits.map((unit, index) => (
          <div key={index} className="flex flex-col items-center bg-white/10 p-1 md:p-2 rounded-md md:rounded-lg min-w-[35px] md:min-w-[45px] border border-white/10">
            <span className="text-sm md:text-lg font-bold">{String(unit.value).padStart(2, '0')}</span>
            <span className="text-[8px] md:text-[10px] opacity-80">{unit.label}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default function Offer({ data }: { data: OfferItem[] }) {
  return (
    <Swiper

      style={{
        boxShadow: "1px 1px 8px #02071494",
        borderRadius: "10px",
        height: "400px", // Fixed height for better visibility
      }}
      spaceBetween={30}
      centeredSlides={true}
      loop={true}
      autoplay={{
        delay: 3500, 
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      // navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper offer-slider"
      noSwiping={true}
      noSwipingClass="swiper-no-swiping"
    >
      {data.map((item) => (
        <SwiperSlide key={item.id} className="w-full h-full">
          <div
            className="w-full h-full flex items-center justify-center bg-cover bg-center rounded-lg overflow-hidden relative"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Content */}
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }} className="p-1  relative z-10 ">
              <OfferCard item={item} />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}


