import { Product, WHATSAPP_NUMBER } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { Link } from "react-router-dom";
import { useProductStore } from "@/lib/productStore";
import { 
  Dialog, 
  DialogContent, 
} from "@/components/ui/dialog";
import { 
  Phone, 
  MessageCircle, 
  Heart, 
  Share2, 
  Star, 
  CheckCircle2, 
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Zap,
  X,
  CreditCard,
  Cpu,
  Palette,
  FileBadge2,
  Box,
  BatteryCharging
} from "lucide-react";
import { toast } from "sonner";
import { Separator } from "./ui/separator";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  const { t } = useLanguage();
  const { wishlistItems, toggleWishlist } = useProductStore();
  
  if (!product) return null;

  const isInWishlist = wishlistItems.includes(product.id);
  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in ${product.name} (₹${product.price.toLocaleString()}). Is it available?`);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at Sai Mobiles!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!");
    }
  };

  const ratingStars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full md:max-w-6xl p-0 overflow-hidden border-border bg-background/95 backdrop-blur-3xl rounded-none md:rounded-[3rem] shadow-2xl text-foreground !outline-none">
        
        {/* Mobile Close Button */}
        <button 
           onClick={onClose}
           className="md:hidden absolute top-4 right-4 z-[100] w-10 h-10 rounded-full bg-background/80 flex items-center justify-center border border-border"
        >
           <X size={20} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[100vh] md:max-h-[90vh] overflow-y-auto no-scrollbar">
          
          {/* Left: Media Gallery */}
          <div className="lg:col-span-5 p-4 md:p-12 flex flex-col gap-6">
             <div className="relative aspect-square flex items-center justify-center bg-muted dark:bg-white/5 rounded-[2rem] md:rounded-[2.5rem] border border-border p-6 md:p-10 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
                />
                <div className="absolute top-6 right-6 flex flex-col gap-3">
                   <button 
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-3 rounded-2xl border transition-all ${isInWishlist ? 'bg-destructive border-destructive text-white' : 'bg-background/80 border-border text-muted-foreground hover:text-foreground'}`}
                   >
                      <Heart size={20} className={isInWishlist ? "fill-white" : ""} />
                   </button>
                   <button 
                      onClick={handleShare}
                      className="p-3 rounded-2xl bg-background/80 border border-border text-muted-foreground hover:text-foreground transition-all"
                   >
                      <Share2 size={20} />
                   </button>
                </div>
             </div>
             <p className="hidden md:block text-[10px] text-center text-muted-foreground font-black uppercase tracking-[0.2em]">Interative High-Res Showcase</p>
          </div>

          {/* Center: Info Hub */}
          <div className="lg:col-span-4 p-6 md:p-12 space-y-8 border-x border-border">
             <div>
                <Link to="/products" className="text-primary hover:text-muted-foreground text-xs font-black uppercase tracking-widest inline-flex items-center gap-1">
                  Official {product.brand} Store <Sparkles size={12} />
                </Link>
                <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight mt-2 uppercase tracking-tight">
                   {product.name} <span className="text-muted-foreground">Specs Intensive</span>
                </h2>
                                <div className="flex flex-wrap gap-4 mt-6">
                    {product.processor && (
                       <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-xl border border-border">
                          <Cpu size={14} className="text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-widest">{product.processor}</span>
                       </div>
                    )}
                    {product.color && (
                       <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-xl border border-border">
                          <Palette size={14} className="text-[#00a8c6]" />
                          <span className="text-[10px] font-black uppercase tracking-widest">{product.color}</span>
                       </div>
                    )}
                 </div>
                
                <div className="flex items-center gap-3 mt-4">
                   <div className="flex text-[#FFA41C]">
                      {ratingStars.map((s) => (
                        <Star key={s} size={16} fill={s <= (product.rating || 4.5) ? "currentColor" : "none"} className={s <= (product.rating || 4.5) ? "" : "text-muted/40"} />
                      ))}
                   </div>
                   <span className="text-sm font-black text-muted-foreground uppercase tracking-tighter">
                      {product.reviewsCount || 1024}+ Reviews
                   </span>
                </div>
             </div>

             <Separator className="bg-border" />

             <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                   <span className="text-destructive text-3xl font-black italic">-25%</span>
                   <div className="flex items-start gap-1">
                      <span className="text-lg font-bold text-primary mt-1">₹</span>
                      <span className="text-4xl font-black tracking-tighter">{product.price.toLocaleString()}</span>
                   </div>
                </div>
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-tighter">
                   M.R.P.: <span className="line-through">₹{(product.price * 1.33).toLocaleString()}</span>
                </p>
                <div className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest">
                   <Zap size={14} /> Flash Offer Ending Soon
                </div>
             </div>

             <Separator className="bg-border" />

             {/* Service Icon Row */}
             <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: <RotateCcw size={20} />, label: "7 Day Swap" },
                  { icon: <ShieldCheck size={20} />, label: "1Y Warranty" },
                  { icon: <Star size={20} />, label: "Authentic" },
                  { icon: <CheckCircle2 size={20} />, label: "Q-Certified" }
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-2 group cursor-pointer">
                     <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all group-hover:scale-110">
                        {s.icon}
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground group-hover:text-foreground leading-tight">{s.label}</span>
                  </div>
                ))}
             </div>

             <Separator className="bg-border" />

             <div className="space-y-4">
                <h4 className="font-black text-xs uppercase tracking-widest text-primary">Detailed Matrix</h4>
                <ul className="grid grid-cols-1 gap-3">
                   {product.specs.map((spec, i) => (
                      <li key={i} className="text-sm font-bold text-muted-foreground flex items-start gap-3">
                         <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                         {spec}
                      </li>
                   ))}
                </ul>
                 {product.category === "used" && (
                     <div className="mt-8 space-y-4">
                        <h4 className="font-black text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                           <FileBadge2 size={14} /> Certified Quality Report
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                           <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col gap-1">
                              <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Battery Health</span>
                              <div className="flex items-center gap-2">
                                 <BatteryCharging size={16} className="text-primary" />
                                 <span className="text-sm font-black text-foreground">{product.batteryHealth || 95}%</span>
                              </div>
                           </div>
                           <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col gap-1">
                              <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Original Kit</span>
                              <div className="flex items-center gap-2">
                                 <Box size={16} className="text-primary" />
                                 <span className="text-sm font-black text-foreground">{product.boxIncluded ? "Box & Bill" : "Solo Unit"}</span>
                              </div>
                           </div>
                        </div>
                        {product.damages && (
                           <div className="p-4 rounded-2xl bg-destructive/5 border border-destructive/10">
                              <span className="text-[9px] font-black uppercase text-destructive tracking-widest">Known Issues / Damages</span>
                              <p className="text-xs font-bold text-foreground mt-1 leading-relaxed">
                                 {product.damages}
                              </p>
                           </div>
                        )}
                     </div>
                 )}
                {product.description && (
                  <div className="mt-6 p-4 rounded-2xl bg-muted/50 border border-border">
                    <p className="text-xs font-bold text-muted-foreground leading-relaxed italic">
                      "{product.description}"
                    </p>
                  </div>
                )}
              </div>
          </div>

          {/* Right: Premium Buy Box */}
          <div className="lg:col-span-3 p-6 md:p-12 space-y-6 bg-muted/30">
             <div className="glass-card-amazon p-8 rounded-[2rem] md:rounded-[2.5rem] space-y-6 border-border">
                <div className="flex items-baseline gap-1">
                   <span className="text-lg font-bold text-primary">₹</span>
                   <span className="text-3xl font-black">{product.price.toLocaleString()}</span>
                </div>
                
                <div className="space-y-2">
                   <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-black text-sm uppercase tracking-widest">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Immediate Stock
                   </div>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-tighter">
                       Available for <span className="text-foreground">In-Store Pickup</span>
                    </p>
                    {product.warranty && (
                      <div className="mt-2 flex items-center gap-2 text-[10px] font-black uppercase text-primary">
                         <ShieldCheck size={12} /> {product.warranty} Warranty
                      </div>
                    )}
                 </div>

                <div className="space-y-3 pt-6">
                   <button 
                     className="amazon-button-glass w-full h-14 rounded-2xl text-base shadow-primary/20 flex items-center justify-center gap-2"
                     onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`, '_blank')}
                   >
                      <MessageCircle size={20} /> Chat & Buy Now
                   </button>
                   <button 
                     className="amazon-button-secondary-glass w-full h-14 rounded-2xl text-base flex items-center justify-center gap-2"
                     onClick={() => window.location.href=`tel:${WHATSAPP_NUMBER.slice(-10)}`}
                   >
                      <Phone size={20} /> Direct Call Store
                   </button>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-[10px] font-black uppercase tracking-widest pt-4">
                   <ShieldCheck size={14} className="text-primary" /> AES-256 Encrypted
                </div>
             </div>
             
             {/* Dynamic Extra Box */}
             <div className="glass-card-amazon p-6 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent text-[11px] font-bold border-border">
                <p className="text-primary uppercase tracking-widest mb-3">Protection Package</p>
                <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                   <div className="w-5 h-5 rounded-md border border-border flex items-center justify-center bg-background">
                      <div className="w-2 h-2 rounded-sm bg-primary" />
                   </div>
                   <span>Add 2Y Screen Guard + Shockproof Case (₹1,499)</span>
                </div>
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
