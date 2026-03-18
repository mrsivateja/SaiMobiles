import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useNavigate } from "react-router-dom";
import { branches, WHATSAPP_NUMBER } from "@/lib/data";
import { 
  Zap, 
  MessageCircle, 
  Smartphone, 
  ArrowRightLeft, 
  ShieldCheck, 
  Sparkles,
  ChevronDown,
  ImagePlus,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

const SellPhone = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    brand: "",
    model: "",
    condition: "",
    expectedPrice: "",
    branch: "peddapuram"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMsg = encodeURIComponent(
      `*New Sell Request*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Device:* ${formData.brand} ${formData.model}\n` +
      `*Condition:* ${formData.condition}\n` +
      `*Expected:* ₹${formData.expectedPrice}\n` +
      `*Branch:* ${formData.branch}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`, "_blank");
    toast.success("Evaluation request sent!");
  };

  return (
    <div className="pt-24 pb-20 bg-background text-foreground">
      <div className="section-padding">
        {/* Amazon-style Exchange Header */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
           <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter mb-4 flex items-center gap-4">
                 Sell Your Device <Sparkles className="text-[#FF9900]" />
              </h1>
              <p className="text-lg text-muted-foreground font-bold uppercase tracking-widest max-w-2xl leading-relaxed">
                 Instant market valuation and <span className="text-foreground">Same-Day Payout</span> for your pre-owned smartphone.
              </p>
           </div>
           
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
              {[
                { icon: <Zap />, label: "Instant Cash" },
                { icon: <Smartphone />, label: "Fair Quotes" },
                { icon: <ShieldCheck />, label: "Secure Reset" },
                { icon: <ArrowRightLeft />, label: "Easy Swap" }
              ].map((item, i) => (
                <div key={i} className="glass-card-amazon py-4 px-3 rounded-2xl flex flex-col items-center text-center gap-2 group hover:bg-[#FF9900]/10 transition-all border-border">
                   <div className="text-[#FF9900] group-hover:scale-110 transition-transform">{item.icon}</div>
                   <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground group-hover:text-foreground">{item.label}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Sell Form - Glassy */}
          <div className="lg:col-span-7">
            <div className="glass-card-amazon p-8 md:p-12 rounded-[3rem] border-border relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9900]/5 blur-[100px] pointer-events-none" />
               
               <h2 className="text-2xl font-black text-foreground uppercase tracking-tight mb-8">Asset Valuation Matrix</h2>
               
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-[#FF9900] ml-1">{t("name")}</label>
                     <input
                       type="text"
                       required
                       className="w-full h-14 bg-muted border border-border rounded-2xl px-6 font-bold text-foreground focus:bg-background focus:border-[#FF9900] outline-none transition-all"
                       placeholder="Enter Name"
                       value={formData.name}
                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-[#FF9900] ml-1">{t("phoneNumber")}</label>
                     <input
                       type="tel"
                       required
                       className="w-full h-14 bg-muted border border-border rounded-2xl px-6 font-bold text-foreground focus:bg-background focus:border-[#FF9900] outline-none transition-all"
                       placeholder="Enter Number"
                       value={formData.phone}
                       onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                     />
                   </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-[#FF9900] ml-1">{t("phoneBrand")}</label>
                     <input
                       type="text"
                       required
                       className="w-full h-14 bg-muted border border-border rounded-2xl px-6 font-bold text-foreground focus:bg-background focus:border-[#FF9900] outline-none transition-all"
                       placeholder="e.g. Apple"
                       value={formData.brand}
                       onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-[#FF9900] ml-1">{t("model")}</label>
                     <input
                       type="text"
                       required
                       className="w-full h-14 bg-muted border border-border rounded-2xl px-6 font-bold text-foreground focus:bg-background focus:border-[#FF9900] outline-none transition-all"
                       placeholder="e.g. iPhone 15 Pro"
                       value={formData.model}
                       onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                     />
                   </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[#FF9900] ml-1">{t("phoneCondition")}</label>
                       <div className="relative group">
                          <select
                             className="w-full h-14 bg-muted border border-border rounded-2xl px-6 font-bold text-foreground focus:bg-background focus:border-[#FF9900] outline-none appearance-none cursor-pointer transition-all"
                             value={formData.condition}
                             onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                             required
                          >
                             <option value="" className="bg-background">{t("phoneCondition")}</option>
                             <option value="good" className="bg-background">{t("good")}</option>
                             <option value="average" className="bg-background">{t("average")}</option>
                             <option value="damaged" className="bg-background">{t("damaged")}</option>
                          </select>
                          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-focus-within:rotate-180 transition-transform" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[#FF9900] ml-1">{t("expectedPrice")}</label>
                       <input
                          type="number"
                          className="w-full h-14 bg-muted border border-border rounded-2xl px-6 font-bold text-foreground focus:bg-background focus:border-[#FF9900] outline-none transition-all"
                          placeholder="₹ Amount"
                          value={formData.expectedPrice}
                          onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                       />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#FF9900] ml-1">{t("uploadPhotos")}</label>
                    <div className="relative group">
                       <input 
                          type="file" 
                          accept="image/*" 
                          multiple 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                       />
                       <div className="w-full py-10 bg-muted border-2 border-dashed border-border rounded-[2rem] flex flex-col items-center justify-center gap-3 group-hover:bg-background group-hover:border-[#FF9900] transition-all">
                          <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center text-muted-foreground group-hover:text-[#FF9900] transition-all">
                             <ImagePlus size={24} />
                          </div>
                          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Drop Device Images Here</span>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-[#FF9900] ml-1">{t("preferredBranch")}</label>
                   <div className="flex flex-wrap gap-3">
                     {branches.map((b) => (
                       <button
                         key={b.id}
                         type="button"
                         onClick={() => setFormData({ ...formData, branch: b.id })}
                         className={`px-6 h-12 rounded-2xl font-black text-xs uppercase tracking-widest border transition-all ${formData.branch === b.id ? 'bg-[#FF9900] border-[#FF9900] text-black shadow-lg shadow-[#FF9900]/20' : 'bg-muted border-border text-muted-foreground hover:text-foreground hover:bg-background'}`}
                       >
                         {lang === 'en' ? b.name : (b as any).nameTe || b.name}
                       </button>
                     ))}
                   </div>
                 </div>

                 <button type="submit" className="amazon-button-glass w-full h-14 text-base mt-6">
                    <MessageCircle className="inline mr-2" /> Start Evaluation
                 </button>
               </form>
            </div>
          </div>

          {/* Right: Info Hub */}
          <div className="lg:col-span-5 space-y-6">
             <div className="glass-card-amazon p-8 rounded-[2.5rem] bg-gradient-to-br from-[#FF9900]/10 to-transparent border-border">
                <h3 className="text-xl font-black text-foreground uppercase tracking-tight mb-4 flex items-center gap-2">
                   <Zap className="text-[#FF9900]" /> Precision Appraisal
                </h3>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-tighter leading-relaxed mb-6">
                   Our automated matrix analyzes the latest market trends to ensure your model gets the <span className="text-foreground">highest cash value</span> in Andhra Pradesh.
                </p>
                <div className="space-y-4">
                   {[
                     "On-Spot Payment Verification",
                     "Scientific Condition Grading",
                     "Market Dynamic Pricing",
                     "Secure Data Erasure Support"
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                        <CheckCircle2 size={16} className="text-[#00a8c6]" /> {item}
                     </div>
                   ))}
                </div>
             </div>

             <div className="glass-card-amazon p-8 rounded-[2.5rem] border-border">
                <h3 className="text-xl font-black text-foreground uppercase tracking-tight mb-4">Direct Exchange</h3>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
                   Prefer to upgrade? Trade in your old device for any flagship from our new arrivals catalog and get an additional <span className="text-[#FF9900]">₹1,000 Exchange Bonus</span>.
                </p>
                <button 
                   onClick={() => navigate("/products")}
                   className="amazon-button-secondary-glass w-full mt-6 h-12 rounded-2xl text-[10px] uppercase font-black tracking-[0.2em]"
                >
                   Browse New Catalog
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPhone;
