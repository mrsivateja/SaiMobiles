import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { branches } from "@/lib/data";
import { Globe, ArrowUp, Instagram, Facebook, Twitter, MessageCircle } from "lucide-react";

const Footer = () => {
  const { t, lang, setLang } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-20 flex flex-col border-t border-border bg-background">
      {/* Back to Top */}
      <button 
        onClick={scrollToTop}
        className="backdrop-blur-xl bg-muted/30 hover:bg-muted/50 text-muted-foreground hover:text-foreground py-4 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 group border-b border-border"
      >
        <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
        Return to top
      </button>

      {/* Main Footer Links */}
      <div className="bg-background/80 text-foreground">
        <div className="section-padding py-12 md:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 border-b border-border">
          <div className="space-y-6">
            <h4 className="font-black text-sm uppercase tracking-widest text-primary">Corporate</h4>
            <ul className="space-y-3 text-sm font-bold text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground hover:translate-x-1 transition-all inline-block">About Sai Mobiles</Link></li>
              <li><Link to="/contact" className="hover:text-foreground hover:translate-x-1 transition-all inline-block">Sustainability</Link></li>
              <li><Link to="/repairs" className="hover:text-foreground hover:translate-x-1 transition-all inline-block">Service Excellence</Link></li>
              <li><Link to="/about" className="hover:text-foreground hover:translate-x-1 transition-all inline-block">Investor Relations</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-black text-sm uppercase tracking-widest text-primary">Social Reach</h4>
            <div className="flex gap-4">
               {[
                 { icon: <Facebook size={20} />, label: "FB" },
                 { icon: <Twitter size={20} />, label: "TW" },
                 { icon: <Instagram size={20} />, label: "IG" },
                 { icon: <MessageCircle size={20} />, label: "WA" }
               ].map((s, i) => (
                 <a key={i} href="#" className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110">
                   {s.icon}
                 </a>
               ))}
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-black text-sm uppercase tracking-widest text-primary">Showroom Hub</h4>
            <ul className="space-y-3 text-sm font-bold text-muted-foreground">
              {branches.slice(0, 3).map(b => (
                 <li key={b.id} className="hover:text-foreground transition-colors cursor-pointer flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {lang === 'en' ? b.name : b.nameTe}
                 </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-black text-sm uppercase tracking-widest text-primary">Elite Support</h4>
            <ul className="space-y-3 text-sm font-bold text-muted-foreground">
              <li><Link to="/repairs" className="hover:text-foreground">Track Repair Status</Link></li>
              <li><Link to="/sell-phone" className="hover:text-foreground">Get Resale Quote</Link></li>
              <li><Link to="/wishlist" className="hover:text-foreground">Your Premium Wishlist</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Branch Locator</Link></li>
            </ul>
          </div>
        </div>

        {/* Branding Cluster */}
        <div className="py-12 flex flex-col items-center justify-center gap-10">
            <Link to="/" className="flex flex-col items-center group">
              <img src="/logo.png" alt="Sai Mobiles Logo" className="h-16 w-auto object-contain group-hover:scale-105 transition-transform" />
            </Link>
           <div className="flex flex-wrap items-center justify-center gap-4 px-4">
              <button 
                onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
                className="flex items-center gap-3 border border-border rounded-2xl px-6 py-2.5 text-xs font-black uppercase tracking-widest text-muted-foreground hover:bg-muted hover:text-foreground transition-all backdrop-blur-md"
              >
                <Globe size={16} className="text-primary" /> {lang === 'en' ? 'English (Global)' : 'Telugu (Regional)'}
              </button>
              <div className="flex items-center gap-3 border border-border rounded-2xl px-6 py-2.5 text-xs font-black uppercase tracking-widest text-muted-foreground backdrop-blur-md">
                 ₹ INR - Indian Rupee
              </div>
           </div>
        </div>
      </div>

      {/* Legal Bar */}
      <div className="bg-muted/50 text-muted-foreground py-12 border-t border-border">
         <div className="section-padding flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-[10px] font-black uppercase tracking-[0.2em]">
               <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-foreground transition-colors">Terms of Trade</a>
               <a href="#" className="hover:text-foreground transition-colors">Digital Ethics</a>
            </div>
            <p className="text-center text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">
              © {new Date().getFullYear()}, Sai Mobiles. <br/> 
              <span className="opacity-40 mt-1 block">Your Trusted Mobile partner</span>
            </p>
         </div>
      </div>
    </footer>
  );
};

export default Footer;
