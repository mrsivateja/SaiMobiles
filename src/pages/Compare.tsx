import { useProductStore } from "@/lib/productStore";
import { useLanguage } from "@/lib/i18n";
import { X, ArrowLeft, MessageCircle, ArrowRightLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WHATSAPP_NUMBER } from "@/lib/data";

const Compare = () => {
  const { products, compareItems, toggleCompare } = useProductStore();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const comparedProducts = products.filter(p => compareItems.includes(p.id));

  const specRows = [
    { label: "Price Matrix", key: "price", format: (v: number) => `₹${v.toLocaleString()}` },
    { label: "Brand Origin", key: "brand" },
    { label: "RAM Capacity", key: "ram" },
    { label: "Storage Capacity", key: "storage" },
    { label: "Elite Features", key: "specs", type: "list" },
  ];

  if (comparedProducts.length === 0) {
    return (
      <div className="pt-40 pb-20 section-padding text-center bg-background">
        <div className="glass-card-amazon p-12 md:p-20 rounded-[2.5rem] md:rounded-[3rem] inline-block max-w-xl border-border">
           <div className="w-20 h-20 rounded-[1.5rem] bg-muted flex items-center justify-center mx-auto mb-8 shadow-inner">
              <ArrowRightLeft size={40} className="text-muted-foreground" />
           </div>
           <h2 className="text-2xl md:text-3xl font-black mb-4 uppercase tracking-tight text-foreground">Registry Empty</h2>
           <p className="text-muted-foreground font-bold mb-10 uppercase tracking-tighter">Select products from the catalog to initiate comparison</p>
           <button onClick={() => navigate("/products")} className="amazon-button-glass px-10 h-14 rounded-2xl">Return to Catalog</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="section-padding">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
           <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center transition-all text-foreground hover:bg-primary/10 hover:border-primary/50">
                <ArrowLeft size={24} />
              </button>
              <div>
                 <h1 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
                    Product Matrix <Sparkles className="text-[#FF9900]" />
                 </h1>
                 <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mt-1">Deep analysis of selected models</p>
              </div>
           </div>
           
           <button 
             onClick={() => compareItems.forEach(id => toggleCompare(id))}
             className="text-[10px] font-black uppercase text-red-500 hover:text-red-400 tracking-[0.2em] underline underline-offset-8 decoration-red-500/30"
           >
              Reset Matrix
           </button>
        </div>

        <div className="glass-card-amazon rounded-[2rem] md:rounded-[3rem] overflow-hidden border-border bg-background/40 backdrop-blur-3xl shadow-2xl">
          <div className="overflow-x-auto no-scrollbar">
            <div 
              className="grid min-w-[800px]" 
              style={{ gridTemplateColumns: `220px repeat(${comparedProducts.length}, 1fr)` }}
            >
              {/* Header Row with Images */}
              <div className="bg-muted/50 border-b border-border flex items-end p-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF9900] mb-2">Metrics</p>
              </div>
              {comparedProducts.map((p) => (
                <div key={p.id} className="p-8 text-center border-b border-border relative group bg-muted/20">
                  <button 
                      className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all md:opacity-0 group-hover:opacity-100 z-20"
                      onClick={() => toggleCompare(p.id)}
                  >
                    <X size={18} />
                  </button>
                  <div className="aspect-square bg-muted rounded-[2rem] p-6 mb-6 flex items-center justify-center group-hover:bg-primary/5 transition-all border border-border shadow-inner">
                    <img src={p.image} alt={p.name} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl" />
                  </div>
                  <h3 className="font-black text-sm uppercase tracking-tight mb-4 text-foreground line-clamp-1">{p.name}</h3>
                  <button 
                    className="amazon-button-glass w-full h-11"
                    onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I'm interested in comparing ${p.name}`, '_blank')}
                  >
                    <MessageCircle size={16} className="inline mr-2" /> Buy Model
                  </button>
                </div>
              ))}

              {/* Spec Rows */}
              {specRows.map((row, idx) => (
                <div key={idx} className="contents group">
                  <div className={`p-8 flex items-center font-black uppercase tracking-[0.1em] text-[11px] text-muted-foreground border-b border-border transition-colors ${idx % 2 === 0 ? 'bg-muted/30' : 'bg-transparent'}`}>
                    {row.label}
                  </div>
                  {comparedProducts.map((p) => (
                    <div key={p.id} className={`p-8 border-b border-border flex items-center justify-center text-sm font-bold text-muted-foreground tracking-tight transition-colors ${idx % 2 === 0 ? 'bg-muted/10' : 'bg-transparent'} group-hover:bg-primary/5 group-hover:text-foreground`}>
                      {row.type === "list" ? (
                        <ul className="text-center space-y-2">
                          {(p as any)[row.key].map((s: string, i: number) => (
                            <li key={i} className="text-[11px] font-medium leading-tight text-muted-foreground/80 group-hover:text-foreground transition-colors">• {s}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className={row.key === 'price' ? 'text-[#FF9900] dark:text-[#FF9900] font-black text-lg' : ''}>
                          {row.format ? row.format((p as any)[row.key]) : (p as any)[row.key] || "—"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
