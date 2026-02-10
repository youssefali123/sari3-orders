import {  useState, useEffect, useCallback } from "react";
import { X, User, Phone, MapPin, Send, Loader, NotebookIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CartItem, OrderForm } from "@/types/menu";
// import { toast } from "sonner";
import {  toast } from "react-hot-toast";
import Swal from "sweetalert2";
import sendMessage from "@/services/send_message";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  totalPrice: number;
  onOrderComplete: () => void;
}

const CheckoutModal = ({
  isOpen,
  onClose,
  cart,
  totalPrice,
  onOrderComplete,
}: CheckoutModalProps) => {
  const [form, setForm] = useState<OrderForm>({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const send_message = useCallback( async(phone: string, message: string)=>{
    setLoading(true);
    await sendMessage(phone, message)
    Swal.fire({
      icon: 'success',
      title: "طلبك وصل يا جميل هنكلمك حالا😋",
      showConfirmButton: true,
      confirmButtonText: " تمام" ,
      timer: 2500,
      
    })
    onOrderComplete();
    onClose();
    setLoading(false);
  }, [onOrderComplete, onClose])

  useEffect(()=>{
    if(window.localStorage.userInfo){
      const userInfo = JSON.parse(window.localStorage.userInfo);
      setForm({
        name: userInfo.name,
        phone: userInfo.phone,
        address: userInfo.address,
        notes: "",
      });
    }
  }, [])

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!form.name.trim()) {
      toast.error("من فضلك اكتب اسمك");
      return;
    }
    if (!form.phone.trim() || form.phone.trim().length < 10) {
      toast.error("من فضلك اكتب رقم تليفون صحيح");
      return;
    }
    if (!form.address.trim()) {
      toast.error("من فضلك اكتب عنوانك");
      return;
    }

    setIsSubmitting(true);
    window.localStorage.userInfo = JSON.stringify(form);
    // Build WhatsApp message
    //•
    const orderDetails = cart
      .map(
        (item) =>
          `⏪ ${item.name}  ${item.description ? "[" + item.description + "]" : ""} (${item.restaurantName ? `${item.restaurantName} ` : ""}) × ${item.quantity} = ${
            item.price * item.quantity
          } جنيه \n`
      )
      .join("\n");

    const message = `🍽️ *طلب جديد من سريع*

👤 *الاسم:* ${form.name.trim()}
📱 *التليفون:* ${form.phone.trim()}
📍 *العنوان:* ${form.address.trim()}

📋 *تفاصيل الطلب:*
${orderDetails}
${form.notes.trim().length > 2  ? `📝 *ملاحظات:* ${form.notes.trim()}` : ""}

💰 *الإجمالي:* ${totalPrice} جنيه`;

    // Open WhatsApp with the message
    const whatsappNumber = "201096150381"; // phone number to sent
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // window.open(whatsappUrl, "_blank");
    send_message("201096150381", message);
    // toast.success("تم إرسال الطلب بنجاح!");
    // onOrderComplete();
    // onClose();
    // setForm({ name: "", phone: "", address: "" });
    // setIsSubmitting(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl shadow-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-card rounded-t-2xl">
            <h2 className="text-xl font-bold text-foreground">تأكيد الطلب</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-4 space-y-6">
            {/* Order Summary */}
            <div className="bg-background rounded-xl p-4">
              <h3 className="font-semibold text-foreground mb-3">
                ملخص الطلب
              </h3>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div
                    key={`${item.restaurantName}-${item.category}-${item.name}`}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="text-muted-foreground">
                      <span>{item.name} × {item.quantity}</span>
                      {item.restaurantName && (
                        <span className="text-xs block text-muted-foreground/70">{item.restaurantName}</span>
                      )}
                    </div>
                    <span className="font-medium text-foreground">
                      {item.price * item.quantity} جنيه
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-3 pt-3 flex items-center justify-between">
                <span className="font-bold text-foreground">الإجمالي</span>
                <span className="text-xl font-bold text-primary">
                  {totalPrice} جنيه
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  الاسم
                </label>
                <Input
                  type="text"
                  placeholder="اكتب اسمك"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-12"
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  رقم التليفون
                </label>
                <Input
                  type="tel"
                  placeholder="01xxxxxxxxx"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="h-12"
                  maxLength={15}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  العنوان
                </label>
                <Input
                  type="text"
                  placeholder="اكتب عنوانك بالتفصيل"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="h-12"
                  maxLength={200}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <NotebookIcon className="w-4 h-4 text-primary" />
                  ملاحظات
                </label>
                <Input
                  type="text"
                  placeholder="اكتب ملاحظاتك"
                  value={form.notes}
                  onChange={(e) =>
                    setForm({ ...form, notes: e.target.value })
                  }
                  className="h-12"
                  maxLength={200}
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full flex items-center gap-2 justify-center"
                disabled={loading}
              >
                <span>
                  ابعت الطلب

                </span>  
                <Send className="w-5 h-5" />
                {/* اطلبني بسرعه يلا🍴 */}

                {loading && <Loader className="w-5 h-5 animate-spin" />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;