import { useProductStore } from "@/lib/productStore";
import { Button } from "./ui/button";
import { X, ArrowRightLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

const CompareBar = () => {
  const { products, compareItems, toggleCompare } = useProductStore();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const comparedProducts = products.filter(p => compareItems.includes(p.id));

  if (compareItems.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[95vw] max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="glass-card rounded-[2.5rem] p-4 flex items-center gap-4 shadow-2xl border-white/10 shadow-primary/20">
        <div className="flex -space-x-4 overflow-hidden p-1">
          {comparedProducts.map((p) => (
            <div key={p.id} className="relative group">
              <img 
                src={p.image} 
                alt={p.name} 
                className="w-12 h-12 rounded-full border-4 border-background object-cover bg-muted"
              />
              <button 
                onClick={() => toggleCompare(p.id)}
                className="absolute -top-1 -right-1 bg-destructive text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={10} />
              </button>
            </div>
          ))}
          {Array.from({ length: 4 - comparedProducts.length }).map((_, i) => (
            <div key={i} className="w-12 h-12 rounded-full border-4 border-background border-dashed bg-muted/20 flex items-center justify-center text-muted-foreground/30">
              <ArrowRightLeft size={16} />
            </div>
          ))}
        </div>
        
        <div className="flex-1">
          <p className="text-xs font-black uppercase tracking-widest text-[#FF9900]">Product Matrix</p>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
            {comparedProducts.length} of 4 items ready
          </p>
        </div>

        <div className="flex gap-2">
          {comparedProducts.length >= 2 && (
            <button 
                className="amazon-button-glass px-6 font-black uppercase tracking-widest text-[10px] h-10 flex items-center gap-1"
                onClick={() => navigate("/compare")}
            >
              Compare <ArrowRight size={14} />
            </button>
          )}
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all"
            onClick={() => compareItems.forEach(id => toggleCompare(id))}
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
