import { useLanguage } from "@/lib/i18n";
import { branches } from "@/lib/data";
import { Mail, Phone, MessageCircle, MapPin, Globe, Clock, Sparkles } from "lucide-react";

const Contact = () => {
  const { t, lang } = useLanguage();
  return (
    <div className="pt-24 pb-20 bg-background">
      <div className="section-padding">
        {/* Amazon-style Contact Header */}
        <div className="flex flex-col md:flex-row gap-10 items-start mb-20">
           <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter mb-4 flex items-center gap-4">
                 Global Support <Sparkles className="text-[#FF9900]" />
              </h1>
              <p className="text-lg text-muted-foreground font-bold uppercase tracking-widest max-w-2xl leading-relaxed">
                 Connect with our technical matrix across <span className="text-foreground">Andhra Pradesh</span> for instant consultation.
              </p>
           </div>
           
           <div className="glass-card-amazon p-8 rounded-[2rem] md:rounded-[2.5rem] border-border hidden md:block">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Clock size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Operational Sync</p>
                    <p className="text-sm font-bold text-foreground">10:00 AM - 09:30 PM</p>
                 </div>
              </div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-tighter">Availability: Monday to Sunday</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Left: Branch Matrix */}
           <div className="lg:col-span-8 flex flex-col gap-6">
              {branches.map((b) => (
                <div key={b.id} className="glass-card-amazon p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-border group hover:bg-primary/5 transition-all flex flex-col md:flex-row gap-10 relative overflow-hidden">
                   <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 blur-[60px] pointer-events-none" />
                   
                   <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-14 h-14 rounded-3xl bg-muted border border-border flex items-center justify-center text-[#FF9900] group-hover:bg-[#FF9900] group-hover:text-white transition-all shadow-lg">
                            <MapPin size={24} />
                         </div>
                         <div>
                            <h2 className="text-2xl font-black text-foreground uppercase tracking-tight leading-none mb-1">
                               {lang === 'en' ? b.name : b.nameTe} <span className="text-[#FF9900] text-xs">Hub</span>
                            </h2>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none pt-1">
                               {lang === 'en' ? b.address : b.addressTe}
                            </p>
                         </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                         {b.phones.map((p, i) => (
                            <a key={i} href={`tel:${p}`} className="h-14 rounded-2xl bg-muted border border-border flex items-center px-6 gap-4 hover:border-primary/50 transition-all group/link shadow-sm">
                               <Phone size={18} className="text-primary group-hover/link:animate-pulse" />
                               <span className="text-sm font-black text-foreground tracking-widest">{p}</span>
                            </a>
                         ))}
                      </div>
                   </div>

                   <div className="flex flex-col gap-3 justify-center w-full md:w-56 shrink-0">
                      <a 
                        href={`https://wa.me/${b.phones[0]}`} 
                        className="amazon-button-glass w-full h-14 flex items-center justify-center gap-2"
                        target="_blank"
                      >
                         <MessageCircle size={20} /> Matrix Chat
                      </a>
                      <a 
                        href={b.mapUrl} 
                        className="amazon-button-secondary-glass w-full h-14 flex items-center justify-center gap-2"
                        target="_blank"
                      >
                         <MapPin size={20} /> Sync Location
                      </a>
                   </div>
                </div>
              ))}
           </div>

           {/* Right: Global Connect Hub */}
           <div className="lg:col-span-4 space-y-6">
              <div className="glass-card-amazon p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border-border bg-gradient-to-br from-primary/5 to-transparent shadow-xl">
                 <h3 className="text-xl font-black text-foreground uppercase tracking-tight mb-8">Corporate Channels</h3>
                 <div className="space-y-8">
                    <div className="flex items-center gap-5 group cursor-pointer">
                       <div className="w-12 h-12 rounded-[1.5rem] bg-muted border border-border flex items-center justify-center text-muted-foreground group-hover:text-[#FF9900] transition-all shadow-md">
                          <Mail size={22} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Protocol Email</p>
                          <p className="text-sm font-bold text-foreground lowercase">support@sai.in</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-5 group cursor-pointer">
                       <div className="w-12 h-12 rounded-[1.5rem] bg-muted border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-all shadow-md">
                          <Globe size={22} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Digital HQ</p>
                          <p className="text-sm font-bold text-foreground">www.sai-mobiles.in</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="glass-card-amazon p-10 rounded-[3rem] border-border bg-muted/20">
                 <h3 className="text-xl font-black text-foreground uppercase tracking-tight mb-4">Request Callback</h3>
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed mb-6">
                    Our technical support specialist will call you within <span className="text-[#FF9900]">15 minutes</span>.
                 </p>
                 <div className="space-y-3">
                    <input 
                      type="tel" 
                      placeholder="Protocol Number" 
                      className="w-full h-12 bg-background border border-border rounded-xl px-5 text-sm font-bold text-foreground outline-none focus:border-[#FF9900] transition-all shadow-inner"
                    />
                    <button className="amazon-button-glass w-full h-12 text-[10px] uppercase font-black tracking-widest">
                       Connect Specialist
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
