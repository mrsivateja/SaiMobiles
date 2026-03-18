import { useProductStore } from "@/lib/productStore";
import { useLanguage } from "@/lib/i18n";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import ProductDetailModal from "@/components/ProductDetailModal";
import { useState } from "react";
import { Product } from "@/lib/data";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { products, wishlistItems } = useProductStore();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const wishlistProducts = products.filter((p) => wishlistItems.includes(p.id));

  return (
    <div className="pt-24 pb-16 min-h-[70vh]">
      <div className="section-padding">
        <SectionHeading 
          title="Your Wishlist" 
          subtitle="All your favorite items saved in one place." 
        />

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistProducts.map((p) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onOpenDetail={(prod) => setSelectedProduct(prod)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-[3rem] border-2 border-dashed border-border/50 max-w-2xl mx-auto px-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-primary opacity-50" />
            </div>
            <h3 className="text-2xl font-black mb-3">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-8">
              Explore our latest collection of smartphones and accessories to find your favorites.
            </p>
            <Button 
              size="lg" 
              className="rounded-2xl px-10 h-14 font-bold shadow-xl shadow-primary/20"
              onClick={() => navigate("/products")}
            >
              Start Exploring
            </Button>
          </div>
        )}

        <ProductDetailModal 
          product={selectedProduct} 
          isOpen={!!selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      </div>
    </div>
  );
};

export default Wishlist;
