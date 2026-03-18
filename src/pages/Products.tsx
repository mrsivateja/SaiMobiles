import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { useProductStore } from "@/lib/productStore";
import { brands, Product } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import { Star, ChevronRight, Filter, Search, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const Products = () => {
  const { t } = useLanguage();
  const { products } = useProductStore();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const categoryParam = searchParams.get("category") || "";

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query);
      const matchesCategory = categoryParam ? p.category === categoryParam : true;
      const matchesBrand = selectedBrands.length > 0 ? selectedBrands.includes(p.brand) : true;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesRating = (p.rating || 4) >= minRating;
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating;
    }).sort((a, b) => {
      if (sortBy === "priceHigh") return b.price - a.price;
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0; // featured
    });
  }, [products, query, categoryParam, selectedBrands, priceRange, minRating, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const FilterSidebar = () => (
    <div className="space-y-8">
      <div>
         <h3 className="font-black text-xs uppercase tracking-widest text-[#FF9900] mb-4">Brands Matrix</h3>
         <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
            {brands.map(brandName => (
              <div key={brandName} className="flex items-center gap-3 group">
                 <Checkbox 
                   id={`brand-${brandName}`} 
                   checked={selectedBrands.includes(brandName)}
                   onCheckedChange={() => toggleBrand(brandName)}
                   className="rounded-lg border-border data-[state=checked]:bg-[#FF9900] data-[state=checked]:border-[#FF9900]"
                 />
                 <label htmlFor={`brand-${brandName}`} className="text-sm font-bold text-muted-foreground cursor-pointer group-hover:text-foreground transition-colors">{brandName}</label>
              </div>
            ))}
         </div>
      </div>

      <div>
         <h3 className="font-black text-xs uppercase tracking-widest text-[#FF9900] mb-4">Customer Review</h3>
         <div className="space-y-2">
            {[4, 3, 2, 1].map(r => (
              <button 
                key={r} 
                onClick={() => setMinRating(r)}
                className={`flex items-center gap-2 group w-full text-left transition-all ${minRating === r ? 'scale-105' : 'opacity-60 hover:opacity-100'}`}
              >
                 <div className="flex text-[#FFA41C]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill={i < r ? "currentColor" : "none"} className={i < r ? "" : "text-muted/40"} />
                    ))}
                 </div>
                 <span className="text-xs font-black text-foreground">& Up</span>
              </button>
            ))}
            <button onClick={() => setMinRating(0)} className="text-[10px] font-black uppercase text-muted-foreground hover:text-[#FF9900] tracking-widest">Clear rating</button>
         </div>
      </div>

      <div>
         <h3 className="font-black text-xs uppercase tracking-widest text-[#FF9900] mb-4">Price Focus</h3>
         <div className="space-y-2">
            {[
               { label: "Budget (Under 10k)", range: [0, 10000] },
               { label: "Mid-Range (10k-25k)", range: [10000, 25000] },
               { label: "Flagship (Over 50k)", range: [50000, 200000] }
            ].map((p, i) => (
               <button 
                 key={i}
                 onClick={() => setPriceRange(p.range as [number, number])}
                 className="block text-sm font-bold text-muted-foreground hover:text-[#FF9900] transition-colors"
               >
                  {p.label}
               </button>
            ))}
         </div>
      </div>

      <div>
         <h3 className="font-black text-xs uppercase tracking-widest text-[#FF9900] mb-4">Category Matrix</h3>
         <div className="space-y-2 text-sm font-bold uppercase tracking-tighter">
            <Link to="/products?category=new" className={`block ${categoryParam === 'new' ? 'text-[#FF9900]' : 'text-muted-foreground hover:text-[#FF9900]'}`}>New Premium</Link>
            <Link to="/products?category=used" className={`block ${categoryParam === 'used' ? 'text-[#FF9900]' : 'text-muted-foreground hover:text-[#FF9900]'}`}>Certified Renewed</Link>
            <Link to="/products?category=tablet" className={`block ${categoryParam === 'tablet' ? 'text-[#FF9900]' : 'text-muted-foreground hover:text-[#FF9900]'}`}>Global Tablets</Link>
            <Link to="/products?category=laptop" className={`block ${categoryParam === 'laptop' ? 'text-[#FF9900]' : 'text-muted-foreground hover:text-[#FF9900]'}`}>Global Laptops</Link>
            <Link to="/products?category=smartwatch" className={`block ${categoryParam === 'smartwatch' ? 'text-[#FF9900]' : 'text-muted-foreground hover:text-[#FF9900]'}`}>Prime Watches</Link>
            <Link to="/products?category=accessory" className={`block ${categoryParam === 'accessory' ? 'text-[#FF9900]' : 'text-muted-foreground hover:text-[#FF9900]'}`}>High-End Accessories</Link>
            <Link to="/products" className={`block pt-2 text-[10px] font-black tracking-widest ${!categoryParam ? 'text-[#FF9900]' : 'text-muted-foreground'}`}>Reset All Categories</Link>
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Search Metadata - Glassy */}
      <div className="backdrop-blur-md bg-muted/20 border-b border-border py-4 px-4 md:px-8">
         <div className="section-padding flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
               <button 
                 onClick={() => setMobileFilterOpen(true)}
                 className="lg:hidden p-2.5 rounded-xl bg-muted border border-border text-foreground"
               >
                  <Filter size={20} />
               </button>
               <p className="text-sm font-bold text-muted-foreground uppercase tracking-tighter">
                  Showing {filteredProducts.length} results for 
                  <span className="text-foreground ml-2 italic">"{query || categoryParam || "All Catalog"}"</span>
               </p>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-[11px] font-black text-[#FF9900] uppercase tracking-widest">Sort:</span>
               <select 
                 value={sortBy} 
                 onChange={(e) => setSortBy(e.target.value)}
                 className="bg-background border border-border rounded-xl text-xs font-bold text-foreground px-4 py-2 outline-none focus:ring-1 focus:ring-primary transition-all cursor-pointer"
               >
                  <option value="featured">Featured</option>
                  <option value="priceLow">Price: Low-High</option>
                  <option value="priceHigh">Price: High-Low</option>
                  <option value="rating">Top Rated</option>
               </select>
            </div>
         </div>
      </div>

      <div className="section-padding flex flex-col lg:flex-row gap-10 py-10">
         {/* Desktop Sidebar (Filter) - Glassy */}
         <aside className="hidden lg:block w-70 shrink-0 glass-card-amazon p-8 rounded-[2.5rem] self-start sticky top-32">
            <FilterSidebar />
         </aside>

         {/* Main Content (Product List) */}
         <div className="flex-1">
            {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                  {filteredProducts.map((p) => (
                    <ProductCard 
                      key={p.id} 
                      product={p} 
                      onOpenDetail={(prod) => setSelectedProduct(prod)} 
                    />
                  ))}
               </div>
            ) : (
               <div className="glass-card-amazon p-12 md:p-20 rounded-[3rem] text-center border-dashed border-border">
                  <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-6">
                     <Search size={40} className="text-[#FF9900] opacity-50" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-2 uppercase">Zero Matches</h3>
                  <p className="text-muted-foreground font-bold mb-8 uppercase tracking-tighter">Adjust your filters or try a different term</p>
                  <button 
                    onClick={() => { setSelectedBrands([]); setMinRating(0); setPriceRange([0, 200000]); }} 
                    className="amazon-button-glass px-10"
                  >
                    Reset All Filters
                  </button>
               </div>
            )}
         </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileFilterOpen && (
         <div className="fixed inset-0 z-[100] bg-background lg:hidden p-8 animate-in fade-in slide-in-from-bottom-5 flex flex-col overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center mb-10">
               <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Filter Hub</h2>
               <button onClick={() => setMobileFilterOpen(false)} className="p-3 rounded-full bg-muted border border-border text-foreground">
                  <X size={24} />
               </button>
            </div>
            <div className="flex-1">
               <FilterSidebar />
            </div>
            <button 
               onClick={() => setMobileFilterOpen(false)}
               className="amazon-button-glass w-full mt-10 h-14 rounded-2xl"
            >
               Apply Configuration
            </button>
         </div>
      )}

      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};

export default Products;
