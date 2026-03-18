import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center section-padding py-20 bg-background overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#FF9900]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] flex items-center justify-center pointer-events-none opacity-[0.03] text-[20vw] font-black italic select-none">
        404
      </div>

      <div className="text-center relative z-10 max-w-2xl px-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-muted/30 border border-border shadow-2xl mb-8 group transition-transform hover:scale-105 duration-500">
          <AlertCircle size={48} className="text-[#FF9900] group-hover:rotate-12 transition-transform duration-500" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground mb-4">
          Matrix <span className="text-[#FF9900]">Interrupted</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground font-bold uppercase tracking-tighter mb-10 max-w-md mx-auto leading-tight">
          The requested coordinate <span className="text-foreground italic">"{location.pathname}"</span> does not exist in our catalog.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              <Home size={18} /> Return to Hub
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline" className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest gap-2 bg-background/50 backdrop-blur-md border hover:bg-muted transition-all hover:scale-105 active:scale-95">
               <Search size={18} /> Browse Matrix
            </Button>
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">
            Error Signature: PATH_NOT_RESOLVED_404
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
