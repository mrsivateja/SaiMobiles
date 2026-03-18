import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { branches, problemTypes, WHATSAPP_NUMBER } from "@/lib/data";
import { 
  Wrench, 
  MessageCircle, 
  MapPin, 
  Smartphone, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  ChevronDown,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

const Repairs = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    brand: "",
    model: "",
    problem: "screen",
    description: "",
    branch: "peddapuram"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMsg = encodeURIComponent(
      `*New Repair Request*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Device:* ${formData.brand} ${formData.model}\n` +
      `*Issue:* ${formData.problem}\n` +
      `*Details:* ${formData.description}\n` +
      `*Branch:* ${formData.branch}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`, "_blank");
    toast.success("Request sent via WhatsApp!");
  };

  return (
    <div className="pt-24 pb-20 bg-background text-foreground">
      <div className="section-padding">
        {/* Amazon-style Service Header */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
           <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter mb-4 flex items-center gap-4">
                 Expert Repairs <Sparkles className="text-[#FF9900]" />
              </h1>
              <p className="text-lg text-muted-foreground font-bold uppercase tracking-widest max-w-2xl leading-relaxed">
                 Professional mobile restoration with <span className="text-foreground">Gen-Parts</span> & warranty certification. 
              </p>
           </div>
           
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
              {[
                { icon: <ShieldCheck />, label: "A-Grade Parts" },
                { icon: <Clock />, label: "Same Day Fix" },
                { icon: <CheckCircle2 />, label: "90 Day Warranty" },
                { icon: <CheckCircle2 />, label: "Free Diagnostic" }
              ].map((item, i) => (
                <div key={i} className="glass-card-amazon py-4 px-3 rounded-2xl flex flex-col items-center text-center gap-2 group hover:bg-[#FF9900]/10 transition-all border-border">
                   <div className="text-[#FF9900] group-hover:scale-110 transition-transform">{item.icon}</div>
                   <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground group-hover:text-foreground">{item.label}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Repair Form - Glassy */}
          <div className="lg:col-span-7">
            <div className="glass-card-amazon p-8 md:p-12 rounded-[3rem] border-border relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9900]/5 blur-[100px] pointer-events-none" />
               
               <h2 className="text-2xl font-black text-foreground uppercase tracking-tight mb-8">Request Matrix</h2>
               
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-[#FF9900] ml-1">{t("customerName")}</label>
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
                     <label className="text-[10px] font-black uppercase tracking-widest text-[#FF9900] ml-1">{t("deviceBrand")}</label>
                     <input
                       type="text"
                       required
                       className="w-full h-14 bg-muted border border-border rounded-2xl px-6 font-bold text-foreground focus:bg-background focus:border-[#FF9900] outline-none transition-all"
                       placeholder="e.g. Samsung"
                       value={formData.brand}
                       onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-[#FF9900] ml-1">{t("deviceModel")}</label>
                     <input
                       type="text"
                       required
                       className="w-full h-14 bg-muted border border-border rounded-2xl px-6 font-bold text-foreground focus:bg-background focus:border-[#FF9900] outline-none transition-all"
                       placeholder="e.g. S24 Ultra"
                       value={formData.model}
                       onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                     />
                   </div>
                 </div>

                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-[#FF9900] ml-1">{t("problemType")}</label>
                   <div className="relative group">
                     <select
                       className="w-full h-14 bg-muted border border-border rounded-2xl px-6 font-bold text-foreground focus:bg-background focus:border-[#FF9900] outline-none transition-all appearance-none cursor-pointer"
                       value={formData.problem}
                       onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                     >
                       {problemTypes.map((type) => (
                         <option key={type.value} value={type.value} className="bg-background text-foreground">
                            {t(type.value as any) || type.en}
                         </option>
                       ))}
                     </select>
                     <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-focus-within:rotate-180 transition-transform" />
                   </div>
                 </div>

                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-[#FF9900] ml-1">{t("problemDesc")}</label>
                   <textarea
                     rows={4}
                     className="w-full bg-muted border border-border rounded-[2rem] p-6 font-bold text-foreground focus:bg-background focus:border-[#FF9900] outline-none transition-all resize-none"
                     placeholder="Elaborate on the issue..."
                     value={formData.description}
                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                   />
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
                         {b.name}
                       </button>
                     ))}
                   </div>
                 </div>

                 <button type="submit" className="amazon-button-glass w-full h-14 text-base mt-6">
                    <MessageCircle className="inline mr-2" /> {t("submitRequest")}
                 </button>
               </form>
            </div>
          </div>

          {/* Right: Info & Contact Hub */}
          <div className="lg:col-span-5 space-y-6">
             <div className="glass-card-amazon p-8 rounded-[2.5rem] bg-gradient-to-br from-[#FF9900]/10 to-transparent border-border">
                <h3 className="text-xl font-black text-foreground uppercase tracking-tight mb-4 flex items-center gap-2">
                   <Clock className="text-[#FF9900]" /> High-Velocity Fix
                </h3>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-tighter leading-relaxed mb-6">
                   Our labs are equipped with the latest precision tools to ensure your device returns to factory standards within <span className="text-foreground">4-6 business hours</span>.
                </p>
                <div className="space-y-4">
                   {[
                     "Certified Technicians",
                     "Dust-Free Repair Zone",
                     "ESD Protected Lab",
                     "Post-Repair Testing"
                   ].map((t, i) => (
                     <div key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                        <CheckCircle2 size={16} className="text-[#00a8c6]" /> {t}
                     </div>
                   ))}
                </div>
             </div>

             <div className="glass-card-amazon p-8 rounded-[2.5rem] border-border">
                <h3 className="text-xl font-black text-foreground uppercase tracking-tight mb-6">Branch Matrix</h3>
                <div className="space-y-6">
                   {branches.map(b => (
                     <div key={b.id} className="flex gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center text-[#FF9900] shrink-0">
                           <MapPin size={22} />
                        </div>
                        <div>
                           <h4 className="font-black text-sm uppercase tracking-widest text-foreground">{b.name}</h4>
                           <p className="text-xs font-medium text-muted-foreground mt-1 leading-tight">{b.address}</p>
                           <a href={`tel:${b.phones[0]}`} className="text-[#00a8c6] text-[10px] font-black uppercase tracking-widest mt-2 inline-block hover:text-[#FF9900] transition-colors">
                              Contact Specialist →
                           </a>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repairs;
