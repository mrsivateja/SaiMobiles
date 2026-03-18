import { Product } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { useProductStore } from "@/lib/productStore";
import { Star, Heart, ArrowRightLeft, Share2, Eye } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onOpenDetail?: (product: Product) => void;
}

const ProductCard = ({ product, onOpenDetail }: ProductCardProps) => {
  const { wishlistItems, toggleWishlist, compareItems, toggleCompare, addToRecentlyViewed } = useProductStore();
  const { t } = useLanguage();
  const isInWishlist = wishlistItems.includes(product.id);
  const isInCompare = compareItems.includes(product.id);

  const ratingStars = Array.from({ length: 5 }, (_, i) => i + 1);

  const handleOpenDetail = () => {
    addToRecentlyViewed(product.id);
    onOpenDetail?.(product);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  return (
    <div 
      className="glass-card-amazon p-3 md:p-4 rounded-3xl md:rounded-[2.5rem] h-full flex flex-col cursor-pointer group relative overflow-hidden"
      onClick={handleOpenDetail}
    >
      {/* Visual background glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-[50px] rounded-full group-hover:bg-primary/20 transition-all" />

      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isBestSeller && (
          <span className="bg-[#E47911] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg border border-white/10">Best Seller</span>
        )}
        {product.isNewArrival && (
          <span className="bg-[#00a8c6] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg border border-white/10">Premium New</span>
        )}
      </div>

      {/* Action Icons */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 md:translate-x-12 md:opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className={`p-2 md:p-2.5 rounded-lg md:rounded-xl border border-border backdrop-blur-md transition-all hover:scale-110 ${isInWishlist ? 'bg-[#CC0C39] text-white border-[#CC0C39]' : 'bg-background/20 text-muted-foreground hover:text-foreground'}`}
        >
          <Heart className={`w-3 h-3 md:w-4 md:h-4 ${isInWishlist ? "fill-white" : ""}`} />
        </button>
        <button 
          onClick={handleShare}
          className="p-2.5 rounded-xl bg-background/20 border border-border backdrop-blur-md text-muted-foreground hover:text-foreground transition-all hover:scale-110"
        >
          <Share2 size={16} />
        </button>
      </div>

      {/* Image Container */}
      <div className="bg-muted aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden mb-3 md:mb-6 relative flex items-center justify-center p-3 md:p-6 border border-border transition-all group-hover:bg-muted/80">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-60 pointer-events-none" />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 px-1 md:px-2">
        <p className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">{product.brand}</p>
        <h3 className="text-xs md:text-base font-black text-foreground leading-tight mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-2 md:line-clamp-none">
          {product.name} <span className="text-muted-foreground font-medium text-[10px] md:text-xs">({product.ram}, {product.storage})</span>
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
           <div className="flex text-[#FFA41C]">
              {ratingStars.map((s) => (
                <Star 
                  key={s} 
                  className={`w-2 h-2 md:w-3 md:h-3 ${s <= (product.rating || 4.5) ? "" : "text-muted/40"}`}
                  fill={s <= (product.rating || 4.5) ? "currentColor" : "none"} 
                />
              ))}
           </div>
           <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
              {product.reviewsCount || 852} Verified
           </span>
        </div>

        {/* Pricing */}
        <div className="flex items-start gap-1 mb-2 md:mb-4">
           <span className="text-[10px] md:text-sm font-bold text-primary mt-1">₹</span>
           <span className="text-lg md:text-2xl font-black text-foreground tracking-tighter">
              {product.price.toLocaleString()}
           </span>
           {product.originalPrice && (
              <span className="text-[9px] md:text-xs text-muted-foreground line-through mt-2 ml-1 md:ml-2">
                 ₹{product.originalPrice.toLocaleString()}
              </span>
           )}
        </div>

        {/* Amazon-style Labels but Glassy */}
        <div className="space-y-1 mb-6 flex-1 text-[11px] font-bold text-muted-foreground uppercase tracking-tighter">
           <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span>{t('inStock')}</span>
           </div>
            <p>Ships from Sai Mobiles</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-1 md:gap-2">
           <button 
             onClick={handleOpenDetail}
             className="amazon-button-glass w-full h-8 md:h-11 flex items-center justify-center gap-1 md:gap-2 text-[10px] md:text-xs"
           >
             <Eye className="w-3 h-3 md:w-4 md:h-4" /> View Matrix
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); toggleCompare(product.id); }}
             className={`h-8 md:h-11 rounded-lg md:rounded-xl border border-border text-[8px] md:text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1 md:gap-2 transition-all ${isInCompare ? 'bg-primary/20 border-primary text-[#FF9900]' : 'hover:bg-muted text-muted-foreground'}`}
           >
             <ArrowRightLeft className="w-3 h-3 md:w-4 md:h-4" /> Compare Model
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
