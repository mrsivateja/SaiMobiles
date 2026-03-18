import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { useProductStore } from "@/lib/productStore";
import { useTheme } from "@/lib/themeStore";
import { branches, Product } from "@/lib/data";
import ProductDetailModal from "@/components/ProductDetailModal";
import heroBg from "@/assets/hero-bg.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Star, ChevronRight, Zap, Shield, Smartphone, History, Eye } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { products, carouselItems, offerItems, recentlyViewed } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const carouselProducts = products.filter((p) => carouselItems.includes(p.id));
  const newPhones = products.filter((p) => p.category === "new");
  const usedPhones = products.filter((p) => p.category === "used");
  const accessories = products.filter((p) => p.category === "accessory");
  const offers = products.filter((p) => offerItems.includes(p.id));
  
  const viewedProducts = recentlyViewed
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Amazon Hero Carousel with Glass Overlay */}
      <section className="relative overflow-hidden">
        <Carousel opts={{ align: "center", loop: true }} plugins={[Autoplay({ delay: 4000 })]} className="w-full">
           <CarouselContent className="-ml-0">
              {carouselProducts.length > 0 ? (
                carouselProducts.map((product) => (
                  <CarouselItem key={product.id} className="pl-0">
                     <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden flex items-center justify-center bg-muted/20 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                        <img src={product.image} alt={product.name} className="w-[80%] md:w-[60%] h-[80%] object-contain" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
                        {theme === 'dark' && <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none" />}
                        <div className="absolute bottom-10 md:bottom-16 w-full flex flex-col items-center justify-center text-center z-20 px-4">
                          <span className="bg-primary text-white text-[10px] md:text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(var(--primary),0.5)]">Featured Deal</span>
                          <h3 className="text-2xl md:text-5xl font-black text-foreground drop-shadow-2xl">{product.name}</h3>
                        </div>
                     </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="pl-0">
                   <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden">
                      <img src={heroBg} alt="Premium Mobiles" className="w-full h-full object-cover scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
                      {theme === 'dark' && <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none" />}
                   </div>
                </CarouselItem>
              )}
           </CarouselContent>
        </Carousel>

        {/* Special Offers Section - Moved here to be "on top" of other content, but below hero */}
        <div className="relative z-30 section-padding mb-8">
           <div className="glass-card-amazon p-6 md:p-10 rounded-[2.5rem] border-border shadow-2xl backdrop-blur-xl bg-background/80 md:bg-background/60">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-destructive flex items-center justify-center shadow-lg shadow-destructive/30">
                       <Zap size={22} className="text-white" fill="currentColor" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight">{t("specialOffers")}</h2>
                 </div>
                 <Link to="/products" className="link-amazon-glass text-xs font-black uppercase tracking-widest underline underline-offset-8 decoration-primary/30">{t("viewAll")}</Link>
              </div>
              <div className="relative">
                <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 3000 })]} className="w-full">
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {offers.map((p) => (
                      <CarouselItem key={p.id} className="pl-6 basis-[70%] sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                         <div className="flex flex-col cursor-pointer group" onClick={() => setSelectedProduct(p)}>
                            <div className="aspect-square bg-muted/50 dark:bg-white/5 rounded-[2rem] p-6 flex items-center justify-center mb-4 border border-border group-hover:bg-primary/5 transition-all relative overflow-hidden shadow-sm">
                               <img src={p.image} alt={p.name} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                               <span className="bg-destructive text-white text-[9px] font-black px-2 py-0.5 rounded-lg shadow-md">Limited</span>
                            </div>
                            <p className="text-sm font-black text-foreground uppercase truncate tracking-tight">{p.name}</p>
                            <p className="text-xs font-bold text-primary">₹{p.price.toLocaleString()}</p>
                          </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex -left-4 bg-background border-border text-foreground hover:bg-primary hover:text-white" />
                  <CarouselNext className="hidden md:flex -right-4 bg-background border-border text-foreground hover:bg-primary hover:text-white" />
                </Carousel>
              </div>
           </div>
        </div>

        {/* Floating Category Grid - Glass Style */}
        <div className="relative z-20 section-padding grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {/* Card 1: New Arrivals */}
           <div className="glass-card-amazon p-6 rounded-[2rem] flex flex-col hover:bg-muted/5 transition-all">
              <h2 className="text-xl font-black mb-4 text-foreground uppercase tracking-tight">{t("newSmartphones")}</h2>
              <div className="grid grid-cols-2 gap-3 mb-4 flex-1">
                 {newPhones.slice(0, 4).map(p => (
                    <div key={p.id} className="cursor-pointer group flex flex-col" onClick={() => setSelectedProduct(p)}>
                       <div className="aspect-square bg-muted/50 dark:bg-white/5 rounded-2xl flex items-center justify-center p-3 border border-border group-hover:bg-primary/10 transition-all shadow-sm">
                         <img src={p.image} alt={p.name} className="max-h-full object-contain group-hover:scale-110 transition-transform" />
                       </div>
                       <span className="text-[10px] truncate text-muted-foreground font-bold uppercase block mt-2 text-center">{p.name}</span>
                    </div>
                 ))}
              </div>
              <Link to="/products?category=new" className="link-amazon-glass text-xs font-black uppercase tracking-widest flex items-center gap-1 group mt-auto pt-2">
                {t("exploreProducts")} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>

           {/* Card 2: Refurbished */}
           <div className="glass-card-amazon p-6 rounded-[2rem] flex flex-col hover:bg-muted/5 transition-all">
              <h2 className="text-xl font-black mb-4 text-foreground uppercase tracking-tight leading-tight">{t("usedPhonesSection")}</h2>
              <div className="grid grid-cols-2 gap-3 mb-4 flex-1">
                 {usedPhones.slice(0, 4).map(p => (
                    <div key={p.id} className="cursor-pointer group flex flex-col" onClick={() => setSelectedProduct(p)}>
                       <div className="aspect-square bg-muted/50 dark:bg-white/5 rounded-2xl flex items-center justify-center p-3 border border-border group-hover:bg-primary/10 transition-all shadow-sm">
                         <img src={p.image} alt={p.name} className="max-h-full object-contain group-hover:scale-110 transition-transform" />
                       </div>
                       <span className="text-[10px] truncate text-muted-foreground font-bold uppercase block mt-2 text-center">{p.name}</span>
                    </div>
                 ))}
              </div>
              <Link to="/products?category=used" className="link-amazon-glass text-xs font-black uppercase tracking-widest flex items-center gap-1 group mt-auto pt-2">
                {t("viewAll")} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>

           {/* Card 3: Deal Spotlight */}
           <div className="glass-card-amazon p-6 rounded-[2rem] flex flex-col hover:bg-muted/5 transition-all">
              <h2 className="text-xl font-black mb-4 text-foreground uppercase tracking-tight">{t("specialOffers")}</h2>
              {offers[0] && (
                 <div className="flex flex-col flex-1 h-full">
                    <div className="flex-1 flex items-center justify-center bg-muted/50 dark:bg-white/5 rounded-3xl p-6 border border-border relative group cursor-pointer shadow-sm" onClick={() => setSelectedProduct(offers[0])}>
                       <img src={offers[0].image} alt={offers[0].name} className="max-h-[200px] object-contain group-hover:scale-105 transition-transform duration-500" />
                       <div className="absolute top-4 left-4 bg-destructive text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                          {t("limitedOffer")}
                       </div>
                    </div>
                    <div className="mt-4">
                       <p className="text-foreground font-black text-sm uppercase truncate mb-1">{offers[0].name}</p>
                       <div className="flex items-center justify-between">
                          <p className="text-primary font-black text-xl">₹{offers[0].price.toLocaleString()}</p>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedProduct(offers[0]); }}
                            className="bg-primary/10 p-2 rounded-xl text-primary hover:bg-primary hover:text-white transition-all"
                          >
                             <Eye size={16} />
                          </button>
                       </div>
                    </div>
                 </div>
              )}
              <Link to="/products" className="link-amazon-glass text-xs font-black uppercase tracking-widest mt-4">{t("viewAll")}</Link>
           </div>

           {/* Card 4: Services */}
           <div className="flex flex-col gap-4">
              <div className="glass-card-amazon p-6 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent border-primary/20 hover:bg-primary/5 transition-all">
                 <h2 className="text-lg font-black text-foreground mb-3 uppercase tracking-tight">{t("mobileRepair")}</h2>
                 <p className="text-[11px] text-muted-foreground mb-4 font-medium italic leading-tight">{t("repairDesc")}</p>
                 <Link to="/repairs" className="amazon-button-glass w-full block text-center py-3">{t("submitRequest")}</Link>
              </div>
              <div className="glass-card-amazon p-6 rounded-[2rem] flex-1 hover:bg-muted/5 transition-all">
                 <h2 className="text-lg font-black text-foreground mb-4 uppercase tracking-tight">{t("mobileAccessories")}</h2>
                 <div className="grid grid-cols-2 gap-2 mb-4">
                    {accessories.slice(0, 4).map(p => (
                       <div key={p.id} className="aspect-square bg-muted/50 dark:bg-white/5 rounded-xl flex items-center justify-center p-2 border border-border cursor-pointer hover:bg-primary/10 transition-all" onClick={() => setSelectedProduct(p)}>
                          <img src={p.image} alt={p.name} className="max-h-full object-contain" />
                       </div>
                    ))}
                 </div>
                 <Link to="/products?category=accessory" className="link-amazon-glass text-[10px] font-black uppercase tracking-[0.2em] block">{t("viewAll")}</Link>
              </div>
           </div>
        </div>
      </section>

      {/* RECENTLY VIEWED - Functional Addition */}
      {viewedProducts.length > 0 && (
         <section className="section-padding mt-16">
            <div className="glass-card-amazon p-8 md:p-12 rounded-[3rem] border-border shadow-2xl overflow-hidden relative">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
               <div className="flex items-center gap-4 mb-10 border-b border-border pb-6">
                  <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center text-muted-foreground">
                     <History size={24} />
                  </div>
                  <div>
                     <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Return to Registry</h2>
                     <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mt-1">Products you've interacted with</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {viewedProducts.map(p => (
                     <div key={p.id} className="flex flex-col group cursor-pointer" onClick={() => setSelectedProduct(p)}>
                        <div className="aspect-square bg-muted rounded-2xl p-4 flex items-center justify-center border border-border group-hover:bg-primary/10 transition-all mb-3 shadow-inner">
                           <img src={p.image} alt={p.name} className="max-h-full object-contain group-hover:scale-105 transition-transform" />
                        </div>
                        <h4 className="text-[11px] font-black uppercase text-foreground truncate group-hover:text-primary transition-colors leading-tight">{p.name}</h4>
                        <p className="text-[10px] font-bold text-muted-foreground mt-1 tracking-tight">₹{p.price.toLocaleString()}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      )}

      {/* Trust Badges */}
      <section className="section-padding my-16 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
         {[
            { icon: <Shield />, title: "Legit Quality", desc: "Genuine parts" },
            { icon: <Zap />, title: "Fast Service", desc: "Same day fix" },
            { icon: <Smartphone />, title: "Certified Used", desc: "50+ Quality checks" },
            { icon: <Star />, title: "Elite Support", desc: "Expert guidance" }
         ].map((item, idx) => (
            <div key={idx} className="glass-card-amazon p-6 rounded-[2rem] flex flex-col items-center text-center gap-4 group hover:bg-muted/5 transition-all">
               <div className="w-14 h-14 rounded-2xl bg-muted dark:bg-white/5 flex items-center justify-center text-primary border border-border group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl group-hover:scale-110">
                  {item.icon}
               </div>
               <div>
                  <h3 className="font-black text-xs md:text-sm text-foreground uppercase tracking-tight">{item.title}</h3>
                  <p className="text-[10px] text-muted-foreground font-medium mt-1 uppercase tracking-tighter">{item.desc}</p>
               </div>
            </div>
         ))}
      </section>

      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};

export default Index;
