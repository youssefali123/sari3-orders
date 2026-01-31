import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
import { Flame, Percent, Gift } from "lucide-react";
import Offer from "./Offer";
import { useCallback, useEffect, useState } from "react";


interface Offer {
  id: number;
  title: string;
  description: string;
  discount: string;
  icon: "flame" | "percent" | "gift";
  bgGradient: string;
  image: string;
  date: string;
}


// const iconMap = {
//   flame: Flame,
//   percent: Percent,
//   gift: Gift,
// };

const OffersSection = () => {
  const [offer, setOffer] = useState([]);
  const [loading, setLoading] = useState(false);
  const getOffer = useCallback( async()=>{
    const link = "https://6972d2a732c6bacb12c7c45a.mockapi.io/offer";
    try{
      setLoading(true);
      const response = await fetch(link);
      if(!response.ok) throw new Error("error fetch offers");
      const data = await response.json();
      setOffer(data);
      setLoading(false);
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false);
    }
  }, []);
  useEffect(()=>{
    getOffer();
  }, [getOffer]);
  useEffect(()=>{
    const now = new Date().getTime();
    if(!loading){
      offer.forEach((item)=>{
        if(now > new Date(item.date).getTime()){
          setOffer((prev)=>prev.filter((item2)=>item2.id !== item.id))
        }
      })
    }
  }, [offer, loading])
  return (
    <section className="py-10 sm:py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-3 text-sm px-4 py-1">
            🎉 عروض حصرية
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            العروض والخصومات
          </h2>
          <p className="text-muted-foreground">استفد من أفضل العروض المتاحة</p>
        </div>
            <div>
              {loading ? <p>loading...</p> : <Offer data={offer}/>}
            </div>
      </div>
    </section>
  );
};

export default OffersSection;
