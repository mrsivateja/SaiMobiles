import { useLanguage } from "@/lib/i18n";
import { Shield, Sparkles, Award, MapPin, Phone } from "lucide-react";
import { branches } from "@/lib/data";

const About = () => {
  const { t, lang } = useLanguage();
  const values = [
    { icon: Shield, title: "Ironclad Trust", desc: "Transparent dealings with verified ownership history for every device we trade." },
    { icon: Sparkles, title: "Service Matrix", desc: "Same-day repair turnarounds with a relentless focus on component precision." },
    { icon: Award, title: "Elite Quality", desc: "100% Genuine spares and certified technicians protecting your mobile investment." },
  ];

  return (
    <div className="pt-24 pb-20 bg-background">
      <div className="section-padding">
        {/* Amazon-style About Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
           <h1 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter mb-6">
              Our Legacy <span className="text-primary">At Sai Mobiles</span>
           </h1>
           <p className="text-lg md:text-xl text-muted-foreground font-bold uppercase tracking-widest leading-relaxed">
              {t("aboutDesc")}
           </p>
        </div>

        {/* Values - Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {values.map((v) => (
            <div key={v.title} className="glass-card-amazon p-10 rounded-[2.5rem] md:rounded-[3rem] text-center group hover:bg-primary/5 transition-all border-border">
              <div className="w-16 h-16 rounded-2xl bg-muted border border-border flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all group-hover:scale-110 shadow-xl">
                <v.icon size={28} />
              </div>
              <h3 className="text-xl font-black text-foreground uppercase tracking-tight mb-4">{v.title}</h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-tighter leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Branches Showcase */}
        <div className="glass-card-amazon p-6 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border-border bg-muted/20">
           <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight">Our Operational Hubs</h2>
              <div className="h-px flex-1 bg-border hidden md:block" />
              <p className="text-xs font-black text-primary uppercase tracking-widest">{branches.length} Prime Location{branches.length > 1 ? 's' : ''}</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {branches.map((b) => (
                <div key={b.id} className="space-y-6 group">
                   <div className="aspect-video rounded-[2rem] bg-muted border border-border overflow-hidden flex items-center justify-center relative shadow-inner">
                      <MapPin size={40} className="text-muted opacity-20 absolute" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-6">
                         <span className="text-2xl font-black text-foreground uppercase tracking-tight">{lang === 'en' ? b.name : b.nameTe}</span>
                      </div>
                   </div>
                   
                   <div className="space-y-4 px-2">
                      <div className="flex gap-3">
                         <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary rotate-3 group-hover:rotate-0 transition-transform">
                            <MapPin size={18} />
                         </div>
                         <p className="text-sm font-bold text-muted-foreground leading-tight uppercase tracking-tighter">
                            {lang === 'en' ? b.address : b.addressTe}
                         </p>
                      </div>
                      
                      <div className="flex gap-2">
                         <a href={`tel:${b.phones[0]}`} className="flex-1 h-11 rounded-xl bg-muted border border-border flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-foreground hover:bg-primary/10 transition-all">
                            Call
                         </a>
                         <a href={b.mapUrl} target="_blank" rel="noopener noreferrer" className="flex-1 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all">
                            Directions
                         </a>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;
