import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { useProductStore } from "@/lib/productStore";
import { useTheme } from "@/lib/themeStore";
import { Menu, Search, Heart, MapPin, ChevronDown, Sun, Moon, X, ShoppingBag, Sparkles } from "lucide-react";

const Header = () => {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { wishlistItems, products } = useProductStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navLinks = [
    { name: t("home"), path: "/" },
    { name: t("newSmartphones"), path: "/products?category=new" },
    { name: t("usedPhonesSection"), path: "/products?category=used" },
    { name: t("accessoryCategory"), path: "/products?category=accessory" },
    { name: t("repairs"), path: "/repairs" },
    { name: t("sellPhone"), path: "/sell-phone" },
    { name: t("contact"), path: "/contact" },
  ];

  // Live Suggestions logic
  const suggestions = searchQuery.trim()
    ? products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex flex-col bg-background">
      {/* Top Main Nav */}
      <div className="glass-amazon-header px-4 sm:px-6 py-2 flex items-center gap-3 md:gap-6 h-[60px] md:h-[70px]">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-all"
        >
          <Menu size={24} className="text-foreground" />
        </button>

        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-3 px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-all shrink-0 group">
          <div className="h-10 md:h-12 overflow-hidden flex items-center">
            <img src="/logo.png" alt="Sai Mobiles Logo" className="h-full w-auto object-contain group-hover:scale-105 transition-transform" />
          </div>
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 relative" ref={searchRef}>
          <form onSubmit={handleSearch} className="amazon-search-container-glass flex-1 mx-2">
            <div className="hidden lg:flex items-center px-4 border-r border-border text-xs text-muted-foreground font-bold cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
              All <ChevronDown size={14} className="ml-1 opacity-60" />
            </div>
            <input
              type="text"
              placeholder="Search for premium mobiles..."
              className="amazon-search-input-glass"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
            />
            <button type="submit" className="amazon-search-button-glass w-14 group">
              <Search size={22} className="group-hover:scale-110 transition-transform" strokeWidth={3} />
            </button>
          </form>

          {/* Suggestions Matrix */}
          {isSearchFocused && suggestions.length > 0 && (
            <div className="absolute top-[calc(100%+8px)] left-2 right-2 glass-card-amazon bg-background/95 backdrop-blur-3xl rounded-[2rem] border-border shadow-2xl overflow-hidden p-4 animate-in fade-in zoom-in-95 duration-200">
              <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-4 ml-4">Trending Suggestions</p>
              <div className="grid grid-cols-1 gap-2">
                {suggestions.map(p => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-muted cursor-pointer group transition-all"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchFocused(false);
                      navigate(`/products?q=${encodeURIComponent(p.name)}`);
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center p-1">
                      <img src={p.image} alt={p.name} className="max-h-full object-contain" />
                    </div>
                    <div className="flex justify-between items-center flex-1">
                      <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{p.name}</span>
                      <span className="text-[10px] font-black text-muted-foreground uppercase">{p.brand}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-center">
                <button onClick={handleSearch} className="text-xs font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-2">
                  <Sparkles size={14} /> Full Spec Matrix for "{searchQuery}"
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 md:gap-3 ml-auto md:ml-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-border bg-background hover:bg-muted transition-all"
            title="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} className="text-[#FF9900]" /> : <Moon size={18} className="text-[#007185]" />}
          </button>

          {/* Lang Toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "te" : "en")}
            className="hidden sm:flex glass-nav-item items-center gap-1 group"
          >
            <span className="font-black text-sm uppercase text-foreground">{lang === 'en' ? 'EN' : 'తె'}</span>
            <ChevronDown size={12} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="hidden md:flex glass-nav-item items-center px-2 py-2 group relative">
            <Heart size={24} className="text-foreground group-hover:text-[#CC0C39] transition-colors" />
            {wishlistItems.length > 0 && (
              <span className="absolute top-1 right-1 bg-[#CC0C39] text-white font-black text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                {wishlistItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar (Only on small screens) */}
      <div className="md:hidden px-4 py-2 border-b border-border bg-background">
        <form onSubmit={handleSearch} className="amazon-search-container-glass w-full">
          <input
            type="text"
            placeholder="Search products..."
            className="amazon-search-input-glass h-10 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="amazon-search-button-glass w-12">
            <Search size={18} strokeWidth={3} />
          </button>
        </form>
      </div>

      {/* Sub Nav (Desktop) */}
      <div className="hidden md:flex glass-amazon-subnav items-center gap-4 px-4 py-2 text-[13px] overflow-x-auto no-scrollbar whitespace-nowrap">
        <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl font-black text-foreground transition-all uppercase tracking-widest text-[11px]">
          <Menu size={18} /> {t('allCategories')}
        </button>
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path} className="px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl text-foreground font-bold transition-all">
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute top-0 left-0 bottom-0 w-[300px] glass-card-amazon bg-background shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 flex items-center justify-between border-b border-border bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="h-8 overflow-hidden">
                   <img src="/logo.png" alt="Logo" className="h-full w-auto object-contain" />
                </div>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-4 rounded-[1.5rem] hover:bg-primary/10 font-bold text-foreground transition-all flex items-center justify-between group"
                >
                  {link.name}
                  <ChevronDown className="-rotate-90 text-muted-foreground group-hover:text-primary transition-all" size={16} />
                </Link>
              ))}
            </div>
            <div className="p-6 border-t border-border mt-auto">
              <button
                onClick={() => setLang(lang === "en" ? "te" : "en")}
                className="w-full h-12 rounded-2xl bg-muted flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest mb-3"
              >
                {lang === 'en' ? 'Switch to Telugu' : 'Switch to English'}
              </button>
              <button
                onClick={toggleTheme}
                className="w-full h-12 rounded-2xl bg-secondary flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />} {theme === "dark" ? "Light Matrix" : "Dark Matrix"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
