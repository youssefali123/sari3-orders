import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import {
  ShieldCheck,
  Lock,
  MapPin,
  User,
  Trash2,
  FileText,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Smartphone,
  Share2,
  EyeOff,
  Building,
} from "lucide-react";

export default function PrivacyPolicy() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"privacy" | "terms" | "deletion">(() => {
    if (location.pathname.includes("terms")) return "terms";
    if (location.pathname.includes("delete")) return "deletion";
    return "privacy";
  });
  const { totalItems } = useCart();

  useEffect(() => {
    if (location.pathname.includes("terms")) setActiveTab("terms");
    else if (location.pathname.includes("delete")) setActiveTab("deletion");
    else setActiveTab("privacy");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground font-sans" dir="rtl">
      <Navbar cartItemsCount={totalItems} onCartClick={() => {}} />

      <main className="flex-1 pb-16">
        {/* Hero Section */}
        <section className="bg-card border-b border-border py-12 px-4 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-4">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>معايير أمان معتمدة ومطابقة لمتطلبات Google Play و Apple App Store</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              سياسة الخصوصية وشروط الاستخدام
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              منصة وتطبيق <span className="font-bold text-foreground">"سـريـع" (Sari3)</span> تلتزم بحماية خصوصية بياناتك ومعلوماتك الشخصية وفق أعلى المعايير القانونية والأمنية العالمية.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
              <Clock className="w-3.5 h-3.5" />
              <span>آخر تحديث: 10 نوفمبر 2026 · الإصدار 1.0</span>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="sticky top-[60px] z-40 bg-background/95 backdrop-blur-md border-b border-border py-3 px-4">
          <div className="container mx-auto max-w-4xl flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab("privacy")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "privacy"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>سياسة الخصوصية (Privacy Policy)</span>
            </button>

            <button
              onClick={() => setActiveTab("terms")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "terms"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>شروط الخدمة (Terms of Use)</span>
            </button>

            <button
              onClick={() => setActiveTab("deletion")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "deletion"
                  ? "bg-destructive text-destructive-foreground shadow-sm"
                  : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              <Trash2 className="w-4 h-4" />
              <span>طلب حذف الحساب والبيانات (Data Deletion)</span>
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto max-w-4xl px-4 mt-8">
          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === "privacy" && (
            <div className="space-y-8 leading-relaxed">
              {/* Introduction Card */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <ShieldCheck className="w-6 h-6" />
                  <h2 className="text-xl sm:text-2xl font-bold">1. مقدمة ونطاق التطبيق</h2>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  توضح سياسة الخصوصية هذه الكيفية التي تقوم بها منصة وتطبيق <span className="font-bold text-foreground">"سريع" (Sari3)</span> بجمع، واستخدام، وحماية بيانات المستخدمين (عملاء وسائقين ومتاجر). تنطبق هذه السياسة على تطبيق الهاتف الذكي (iOS & Android)، وموقع الويب، وكافة الخدمات اللوجستية المرتبطة به.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  باستخدامك لتطبيق "سريع"، فإنك توافق على ممارسات جمع البيانات واستخدامها الموضحة في هذا المستند. نحن ملتزمون التزاماً كاملاً بلوائح حماية البيانات العالمية، وسياسات متجر Google Play، وإرشادات مراجعة متجر Apple App Store (البند 5.1).
                </p>
              </div>

              {/* Data Collected */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <User className="w-6 h-6" />
                  <h2 className="text-xl sm:text-2xl font-bold">2. البيانات والمعلومات التي نجمعها</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Location Data */}
                  <div className="p-4 rounded-xl bg-background border border-border space-y-2">
                    <div className="flex items-center gap-2 text-primary font-bold text-base">
                      <MapPin className="w-5 h-5 text-primary" />
                      <h3>الموقع الجغرافي (Location Data)</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      نقوم بجمع بيانات الموقع الجغرافي الدقيق والتقريبي (GPS) أثناء فتح التطبيق واستخدامه، وذلك من أجل:
                    </p>
                    <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                      <li>تحديد نطاق التوصيل والمنطقة التابع لها العميل بدقة.</li>
                      <li>عرض المطاعم والمتاجر المتاحة في النطاق الجغرافي الفعلي.</li>
                      <li>حساب رسوم التوصيل الصحيحة وعرض وقت الوصول المتوقع.</li>
                      <li>مساعدة كابتن التوصيل في الوصول إلى عنوان التسليم دون تأخير.</li>
                    </ul>
                  </div>

                  {/* Account Information */}
                  <div className="p-4 rounded-xl bg-background border border-border space-y-2">
                    <div className="flex items-center gap-2 text-primary font-bold text-base">
                      <Smartphone className="w-5 h-5 text-primary" />
                      <h3>بيانات الحساب الشخصي (Personal Info)</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      عند تسجيل الدخول أو إنشاء الحساب، نطلب المعلومات الأساسية التالية:
                    </p>
                    <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                      <li>الاسم الكامل أو اسم العميل للتواصل.</li>
                      <li>رقم الهاتف المحمول (لتأكيد الطلبات وإرسال إشعارات التوصيل).</li>
                      <li>البريد الإلكتروني (لتوثيق الحساب وإشعارات المعاملات).</li>
                      <li>الدور المعتمد (عميل أو سائق معتمد).</li>
                    </ul>
                  </div>

                  {/* Delivery Addresses */}
                  <div className="p-4 rounded-xl bg-background border border-border space-y-2">
                    <div className="flex items-center gap-2 text-primary font-bold text-base">
                      <Building className="w-5 h-5 text-primary" />
                      <h3>عناوين التوصيل المحفوظة (Addresses)</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      تفاصيل الشارع، رقم المبنى، الدور، الشقة، وأي علامات مميزة يضيفها العميل لتسهيل عملية التوصيل المتكررة وحفظها لحسابه بأمان.
                    </p>
                  </div>

                  {/* Orders & Logs */}
                  <div className="p-4 rounded-xl bg-background border border-border space-y-2">
                    <div className="flex items-center gap-2 text-primary font-bold text-base">
                      <FileText className="w-5 h-5 text-primary" />
                      <h3>سجل الطلبات والمعاملات (Orders History)</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      تفاصيل الأصناف والخيارات المطلوبة، التكلفة الإجمالية، طريقة الدفع المختارة (كاش عند الاستلام أو رصيد المحفظة)، وحالة تنفيذ وتسليم الطلب.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Sharing & Third Parties */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Share2 className="w-6 h-6" />
                  <h2 className="text-xl sm:text-2xl font-bold">3. مشاركة البيانات مع أطراف ثالثة</h2>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold">
                    نحن لا نبيع، ولا نؤجر، ولا نتاجر ببياناتك الشخصية لأي جهات تسويقية أو شركات إعلانية على الإطلاق.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  تتم مشاركة البيانات الضرورية فقط وفقط للغرض المباشر من تنفيذ الخدمة اللوجستية، مع الجهات الآتية:
                </p>
                <div className="space-y-3">
                  <div className="border border-border rounded-xl p-3 bg-background">
                    <h4 className="font-bold text-sm text-foreground mb-1">أ. كباتن ومناديب التوصيل (Drivers):</h4>
                    <p className="text-xs text-muted-foreground">
                      يتم تزويد كابتن التوصيل المعين لطلبك بالاسم، ورقم الهاتف، وعنوان التسليم وتفاصيله لتوصيل الطلب ومحادثتك إذا تعذر الوصول. بعد اكتمال التوصيل، تنتهي صلاحية تتبع الموقع النشط.
                    </p>
                  </div>
                  <div className="border border-border rounded-xl p-3 bg-background">
                    <h4 className="font-bold text-sm text-foreground mb-1">ب. المطاعم والمتاجر الشريكة (Merchants):</h4>
                    <p className="text-xs text-muted-foreground">
                      تتلقى المتاجر قائمة الأصناف المطلوبة والخيارات والملاحظات الخاصة بتحضير الطعام فقط، دون مشاركة معلومات حسابك الخاصة.
                    </p>
                  </div>
                  <div className="border border-border rounded-xl p-3 bg-background">
                    <h4 className="font-bold text-sm text-foreground mb-1">ج. مزودو الخدمات السحابية والأمنية:</h4>
                    <p className="text-xs text-muted-foreground">
                      خوادم Supabase المعتمدة والمشفرة لحفظ قواعد البيانات، ومنظومة Expo Notifications لإرسال إشعارات حالة الطلب لهاتفك بأمان تام.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Lock className="w-6 h-6" />
                  <h2 className="text-xl sm:text-2xl font-bold">4. حماية وتشفير البيانات (Data Security)</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  نطبق تدابير تقنية وأمنية مشددة لحماية بياناتك من الوصول غير المصرح به أو الفقدان أو التعديل:
                </p>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1.5">
                  <li>تشفير كامل لكافة الاتصالات والبيانات المتداولة بين هاتفك والخوادم بتقنية (SSL/TLS 256-bit).</li>
                  <li>عزل بيانات العملاء بنظام سياسات الأمان على مستوى الصفوف (Row Level Security - RLS)، بحيث لا يستطيع أي عميل قراءة أو تعديل بيانات عميل آخر.</li>
                  <li>حفظ كلمات المرور مشفرة بأقوى خوارزميات التجزئة (One-way cryptographic hashing).</li>
                </ul>
              </div>

              {/* User Rights & Account Deletion */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-destructive">
                  <Trash2 className="w-6 h-6" />
                  <h2 className="text-xl sm:text-2xl font-bold">5. حقوقك وحذف الحساب (Your Rights & Account Deletion)</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  وفقاً لسياسات Google Play و Apple App Store وحقوق الخصوصية:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-background border border-border">
                    <h4 className="font-bold text-sm mb-1 text-foreground">الحذف المباشر من التطبيق:</h4>
                    <p className="text-xs text-muted-foreground">
                      يمكنك حذف حسابك فوراً من داخل تطبيق الهاتف: افتح شاشة <span className="font-bold">حسابي</span> ← انزل لأسفل واضغط <span className="font-bold text-destructive">حذف الحساب نهائياً</span>. سيتم مسح بياناتك فوراً دون شروط.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-background border border-border">
                    <h4 className="font-bold text-sm mb-1 text-foreground">طلب الحذف عبر الويب أو الدعم:</h4>
                    <p className="text-xs text-muted-foreground">
                      يمكنك طلب حذف حسابك وكافة البيانات المرتبطة به عبر مراسلتنا بالبريد أو الواتساب، أو عبر تبويب <span className="font-bold text-destructive">"طلب حذف الحساب"</span> في هذه الصفحة.
                    </p>
                  </div>
                </div>
              </div>

              {/* Children Privacy */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-3 text-primary">
                  <EyeOff className="w-6 h-6" />
                  <h2 className="text-xl sm:text-2xl font-bold">6. خصوصية الأطفال</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  خدمات منصة "سريع" غير موجهة للأطفال دون سن 13 عاماً، ونحن لا نجمع عمداً أي بيانات شخصية تخص الأطفال. إذا علمنا بأننا قمنا بجمع بيانات طفل دون موافقة ولي الأمر، فسنقوم بحذف تلك البيانات فوراً من خوادمنا.
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-foreground">معلومات التواصل ومسؤول حماية البيانات</h3>
                <p className="text-sm text-muted-foreground">
                  إذا كان لديك أي سؤال أو استفسار أو طلب يتعلق بسياسة الخصوصية هذه أو ببياناتك الشخصية، يسعدنا تواصلك المباشر:
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm font-semibold pt-1">
                  <a
                    href="https://wa.me/201096150381"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <Phone className="w-4 h-4" />
                    <span>واتساب خدمة العملاء: +201096150381</span>
                  </a>
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    منصة وتطبيق سريع للتوصيل · جمهورية مصر العربية
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TERMS OF SERVICE */}
          {activeTab === "terms" && (
            <div className="space-y-8 leading-relaxed">
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <FileText className="w-6 h-6" />
                  <h2 className="text-xl sm:text-2xl font-bold">1. شروط الاستخدام العامة</h2>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  أهلاً بك في منصة وتطبيق <span className="font-bold text-foreground">"سريع"</span>. باستخدامك لتطبيقاتنا أو موقعنا، فإنك تقر بأنك قرأت وفهمت ووافقت على الالتزام بكافة الشروط والأحكام المنصوص عليها هنا. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام المنصة.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <User className="w-6 h-6" />
                  <h2 className="text-xl sm:text-2xl font-bold">2. حساب المستخدم والأمان</h2>
                </div>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-2">
                  <li>يتحمل المستخدم مسؤولية الحفاظ على سرية بيانات حسابه ورقم الهاتف المسجل به.</li>
                  <li>يتعهد المستخدم بأن جميع البيانات والمعلومات المدخلة (الاسم، رقم الهاتف، العنوان) صحيحة ودقيقة ومحدثة.</li>
                  <li>يحظر استخدام التطبيق لأي أغراض غير قانونية أو الاحتيال أو إرسال طلبات وهمية.</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Building className="w-6 h-6" />
                  <h2 className="text-xl sm:text-2xl font-bold">3. آلية الطلب والتوصيل والأسعار</h2>
                </div>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-2">
                  <li>تُحدد أسعار الوجبات والمنتجات بناءً على قوائم المتاجر والمطاعم المشاركة.</li>
                  <li>تُحسب رسوم التوصيل تلقائياً وفقاً للمنطقة الجغرافية ونطاق التوصيل المحدد للعنوان.</li>
                  <li>يبذل فريق "سريع" وكباتن التوصيل أقصى جهد لتسليم الطلب في الوقت المتوقع، مع مراعاة ظروف حركة السير والطقس.</li>
                  <li>الدفع الأساسي المعتمد هو الدفع نقداً عند الاستلام (Cash on Delivery) أو من خلال رصيد المحفظة إن وجد.</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-destructive">
                  <AlertTriangle className="w-6 h-6" />
                  <h2 className="text-xl sm:text-2xl font-bold">4. سياسة الإلغاء والاسترجاع</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  - يحق للعميل إلغاء الطلب من داخل التطبيق طالما أن الطلب في حالة معلق (Pending) ولم يبدأ المطعم في تحضيره.<br />
                  - في حال كان هناك خطأ في الأصناف المستلمة أو تلف واضح، يحق للعميل التواصل فوراً مع الدعم الفني لتعويضه أو إعادة إرسال الصنف الصحيح بعد التحقق.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Clock className="w-6 h-6" />
                  <h2 className="text-xl sm:text-2xl font-bold">5. التعديلات على الشروط والخدمة</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  تحتفظ إدارة منصة "سريع" بحق تعديل أو تحديث هذه الشروط في أي وقت. سيتم إشعار المستخدمين بأي تغييرات جوهرية عبر التطبيق أو عبر تحديث تاريخ الصفحة.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: DATA DELETION REQUEST */}
          {activeTab === "deletion" && (
            <div className="space-y-8 leading-relaxed">
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-destructive">
                  <Trash2 className="w-6 h-6" />
                  <h2 className="text-xl sm:text-2xl font-bold">طلب حذف الحساب ومسح البيانات نهائياً</h2>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  تطبيقاً لمتطلبات الشفافية وحماية خصوصية المستخدمين لدى <span className="font-bold text-foreground">Google Play Store</span> و <span className="font-bold text-foreground">Apple App Store</span>، يتيح تطبيق "سريع" لكافة المستخدمين حذف حساباتهم وجميع بياناتهم الشخصية نهائياً.
                </p>
              </div>

              {/* Deletion Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                    1
                  </div>
                  <h3 className="font-bold text-base text-foreground">الحذف الفوري من داخل التطبيق</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    أسهل وأسرع طريقة لحذف حسابك:
                  </p>
                  <ol className="text-xs sm:text-sm text-muted-foreground list-decimal list-inside space-y-1.5 font-medium">
                    <li>افتح تطبيق "سريع" على هاتفك.</li>
                    <li>انتقل إلى شاشة <span className="text-foreground font-bold">"حسابي"</span> من التاب بار السفلي.</li>
                    <li>انزل لأسفل الشاشة واضغط على <span className="text-destructive font-bold">"حذف الحساب نهائياً"</span>.</li>
                    <li>قم بتأكيد رغبتك بالحذف في رسالة التأكيد.</li>
                  </ol>
                  <div className="pt-2">
                    <span className="inline-block text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-lg">
                      يتم مسح الحساب وجلسات الدخول والعناوين فوراً.
                    </span>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive font-bold">
                    2
                  </div>
                  <h3 className="font-bold text-base text-foreground">طلب الحذف عبر خدمة العملاء</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    إذا قمت بحذف التطبيق مسبقاً أو تعذر الوصول لهاتفك، يمكنك إرسال طلب حذف مباشر وسنقوم بحذف بياناتك خلال 48 ساعة كحد أقصى:
                  </p>
                  <div className="space-y-2 pt-2">
                    <a
                      href="https://wa.me/201096150381?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AD%D8%B0%D9%81%20%D8%AD%D8%B3%D8%A7%D8%A8%D9%8A%20%D9%88%D8%AC%D9%85%D9%8A%D8%B9%20%D8%A8%D9%8A%D8%A7%D9%86%D8%A7%D8%AA%D9%8A%20%D9%85%D9%86%20%D8%AA%D8%B7%D8%A8%D9%8A%D9%82%20%D8%B3%D8%B1%D9%8A%D8%B9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity"
                    >
                      <Phone className="w-4 h-4" />
                      <span>إرسال طلب حذف عبر واتساب (+201096150381)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* What is deleted */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-3">
                <h3 className="font-bold text-base sm:text-lg text-foreground">ما البيانات التي يتم حذفها نهائياً؟</h3>
                <ul className="text-xs sm:text-sm text-muted-foreground list-disc list-inside space-y-1.5">
                  <li>معلومات الهوية والاسم ورقم الهاتف والبريد الإلكتروني المسجل.</li>
                  <li>جميع العناوين المحفوظة وإحداثيات الأماكن المفضلة.</li>
                  <li>جلسات تسجيل الدخول والرموز المميزة (Auth Tokens).</li>
                  <li>أي رصيد نقاط أو مكافآت مسجل بالحساب.</li>
                </ul>
                <p className="text-xs text-muted-foreground/80 pt-2 border-t border-border">
                  ملاحظة: نحتفظ فقط بسجلات المعاملات المالية المكتملة السابقة التي يفرض القانون واللوائح الضريبية المحلية الاحتفاظ بها لأغراض المحاسبة القانونية لفترة محددة دون استخدامها لأي أغراض أخرى.
                </p>
              </div>
            </div>
          )}

          {/* Quick Back to Home CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-card border border-border text-foreground hover:bg-muted font-bold text-sm transition-all shadow-sm"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة للصفحة الرئيسية لـ سريع</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
