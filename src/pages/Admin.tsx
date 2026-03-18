import React, { useState, useRef } from "react";
import { useProductStore } from "@/lib/productStore";
import { Product, ProductCategory, brands } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Edit, Package, Image as ImageIcon, Tag, Smartphone, Laptop, Watch, Headphones, Lock, ShieldCheck, ArrowRight, Upload, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  brand: "Samsung",
  price: 0,
  image: "",
  ram: "",
  storage: "",
  specs: [],
  inStock: true,
  category: "new",
  description: "",
  warranty: "",
  isCarousel: false,
};

const ProductForm = ({ product, setProduct, isNew, handleAddProduct, handleUpdateProduct, brands, specsInput, setSpecsInput }: any) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ variant: "destructive", title: "File too large", description: "Image must be less than 5MB" });
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setProduct({ ...product, image: url });
      toast({ title: "Image Uploaded", description: "Product image successfully cached in cloud." });
    } catch (error) {
      console.error("Upload error:", error);
      toast({ variant: "destructive", title: "Upload Failed", description: "Could not sync image to matrix." });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid gap-5 py-4 max-h-[70vh] overflow-y-auto pr-2 no-scrollbar">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Product Name</Label>
          <Input value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} className="rounded-xl h-11 bg-muted/20 border-border/50" placeholder="e.g. iPhone 15 Pro Max" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Brand Hub</Label>
          <Select value={product.brand} onValueChange={(v) => setProduct({ ...product, brand: v })}>
            <SelectTrigger className="rounded-xl h-11 bg-muted/20 border-border/50 font-bold"><SelectValue /></SelectTrigger>
            <SelectContent className="rounded-xl">
              {brands.map((b: string) => <SelectItem key={b} value={b} className="font-bold">{b}</SelectItem>)}
              <SelectItem value="Generic" className="font-bold">Generic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Live Price (₹)</Label>
          <Input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} className="rounded-xl h-11 bg-muted/20 border-border/50 font-black" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground">M.R.P. (₹)</Label>
          <Input type="number" value={product.originalPrice || ""} onChange={(e) => setProduct({ ...product, originalPrice: Number(e.target.value) || undefined })} className="rounded-xl h-11 bg-muted/20 border-border/50 font-bold text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-4 border border-dashed border-border/50 p-4 rounded-2xl bg-muted/10">
        <Label className="text-sm font-black uppercase tracking-widest text-primary">Visual Matrix (Image)</Label>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="w-24 h-24 rounded-2xl bg-muted border border-border flex items-center justify-center overflow-hidden shrink-0">
            {product.image ? (
              <img src={product.image} alt="Preview" className="w-full h-full object-contain p-2" />
            ) : (
              <ImageIcon className="text-muted-foreground/30" size={32} />
            )}
          </div>
          <div className="flex-1 space-y-3 w-full">
            <div className="flex gap-2">
              <Input value={product.image} onChange={(e) => setProduct({ ...product, image: e.target.value })} className="rounded-xl h-10 bg-muted/20 border-border/50 text-[10px]" placeholder="Paste Image URL or Upload..." />
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
              <Button 
                type="button" 
                variant="outline" 
                disabled={uploading} 
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl h-10 px-4 shrink-0 font-black uppercase tracking-widest text-[10px] gap-2"
              >
                {uploading ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />} 
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Support: JPG, PNG, WEBP (Max 5MB)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Sector</Label>
          <Select value={product.category} onValueChange={(v) => setProduct({ ...product, category: v as ProductCategory })}>
            <SelectTrigger className="rounded-xl h-11 bg-muted/20 border-border/50 font-bold"><SelectValue /></SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="new" className="font-bold">New Phone</SelectItem>
              <SelectItem value="used" className="font-bold">Used Phone</SelectItem>
              <SelectItem value="tablet" className="font-bold">Tablet</SelectItem>
              <SelectItem value="smartwatch" className="font-bold">Smartwatch</SelectItem>
              <SelectItem value="laptop" className="font-bold">Laptop</SelectItem>
              <SelectItem value="accessory" className="font-bold">Accessory</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Memory</Label>
          <Input value={product.ram} onChange={(e) => setProduct({ ...product, ram: e.target.value })} className="rounded-xl h-11 bg-muted/20 border-border/50" placeholder="e.g. 12GB" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Drive</Label>
          <Input value={product.storage} onChange={(e) => setProduct({ ...product, storage: e.target.value })} className="rounded-xl h-11 bg-muted/20 border-border/50" placeholder="e.g. 256GB" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-black uppercase tracking-widest text-primary">Product Brief (Description)</Label>
        <Textarea 
          value={product.description || ""} 
          onChange={(e) => setProduct({ ...product, description: e.target.value })} 
          className="rounded-xl min-h-[100px] bg-muted/20 border-border/50 font-medium text-sm" 
          placeholder="Describe the unit's condition, features, or unique selling points..." 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Color Variant</Label>
          <Input value={product.color || ""} onChange={(e) => setProduct({ ...product, color: e.target.value })} className="rounded-xl h-11 bg-muted/20 border-border/50" placeholder="e.g. Titanium Black" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Processor / Chipset</Label>
          <Input value={product.processor || ""} onChange={(e) => setProduct({ ...product, processor: e.target.value })} className="rounded-xl h-11 bg-muted/20 border-border/50" placeholder="e.g. Snapdragon 8 Gen 3" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Warranty Shield</Label>
          <Input value={product.warranty || ""} onChange={(e) => setProduct({ ...product, warranty: e.target.value })} className="rounded-xl h-11 bg-muted/20 border-border/50" placeholder="e.g. 1 Year Official" />
        </div>
        {product.category === "used" && (
          <div className="space-y-2">
            <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground text-orange-500">Condition State</Label>
            <Select value={product.condition || "Good"} onValueChange={(v) => setProduct({ ...product, condition: v })}>
              <SelectTrigger className="rounded-xl h-11 bg-muted/20 border-border/50 font-bold"><SelectValue /></SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="Excellent" className="font-bold">Excellent (Like New)</SelectItem>
                <SelectItem value="Good" className="font-bold">Good (Minor wear)</SelectItem>
                <SelectItem value="Average" className="font-bold">Average (Signs of use)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {product.category === "used" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground text-orange-500">Battery Health (%)</Label>
              <Input type="number" value={product.batteryHealth || ""} onChange={(e) => setProduct({ ...product, batteryHealth: Number(e.target.value) })} className="rounded-xl h-11 bg-muted/20 border-border/50 font-bold" placeholder="e.g. 98" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground text-orange-500">Original Box & Bill</Label>
              <Select value={product.boxIncluded ? "yes" : "no"} onValueChange={(v) => setProduct({ ...product, boxIncluded: v === "yes" })}>
                <SelectTrigger className="rounded-xl h-11 bg-muted/20 border-border/50 font-bold"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="yes" className="font-bold">Box & Bill Available</SelectItem>
                  <SelectItem value="no" className="font-bold">Only Unit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground text-orange-500">Damages (Optional)</Label>
            <Input value={product.damages || ""} onChange={(e) => setProduct({ ...product, damages: e.target.value })} className="rounded-xl h-11 bg-muted/20 border-border/50 font-bold" placeholder="e.g. Minor scratch on screen" />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Core Specification Matrix (comma-separated)</Label>
        <Input value={specsInput} onChange={(e) => setSpecsInput(e.target.value)} placeholder='6.7" AMOLED, 50MP Camera, 5000mAh' className="rounded-xl h-11 bg-muted/20 border-border/50" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        <div className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-[#007185]/5 border border-[#007185]/10">
          <Switch checked={product.inStock} onCheckedChange={(v) => setProduct({ ...product, inStock: v })} />
          <Label className="cursor-pointer font-black uppercase tracking-widest text-[10px]">Ready for Acquisition (In Stock)</Label>
        </div>
        <div className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <Switch checked={product.isCarousel} onCheckedChange={(v) => setProduct({ ...product, isCarousel: v })} />
          <Label className="cursor-pointer font-black uppercase tracking-widest text-[10px] text-primary">Highlight in Hero Carousel</Label>
        </div>
      </div>

      <Button onClick={isNew ? handleAddProduct : handleUpdateProduct} className="w-full h-14 rounded-2xl text-base font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
        {isNew ? "Initialize Product" : "Commit Specification Update"}
      </Button>
    </div>
  );
};

const Admin = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleCarousel, toggleOffer, carouselItems, offerItems, loading } =
    useProductStore();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>(emptyProduct);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [specsInput, setSpecsInput] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsAuthenticated(true);
      toast({ title: "Access Granted", description: "Welcome to the Secure Hub." });
    } else {
      toast({ variant: "destructive", title: "Access Denied", description: "Incorrect Matrix Key." });
    }
  };

  const filteredProducts = filterCategory === "all" ? products : products.filter((p) => p.category === filterCategory);

  const handleAddProduct = () => {
    const id = `p_${Date.now()}`;
    addProduct({ ...newProduct, id, specs: specsInput.split(",").map((s) => s.trim()).filter(Boolean) });
    setNewProduct(emptyProduct);
    setSpecsInput("");
    setAddDialogOpen(false);
    toast({ title: "Inventory Initialized", description: "Product has been successfully added to the matrix." });
  };

  const handleUpdateProduct = () => {
    if (!editProduct) return;
    updateProduct(editProduct.id, { ...editProduct, specs: specsInput.split(",").map((s) => s.trim()).filter(Boolean) });
    setEditProduct(null);
    setEditDialogOpen(false);
    toast({ title: "Matrix Updated", description: "Product data has been committed and synchronized." });
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast({ title: "Unit Terminated", description: "Product has been removed from the registry." });
  };

  const categories = [
    { id: "all", label: "All", icon: <Package className="h-3.5 w-3.5" /> },
    { id: "new", label: "New", icon: <Smartphone className="h-3.5 w-3.5" /> },
    { id: "used", label: "Used", icon: <Smartphone className="h-3.5 w-3.5" /> },
    { id: "tablet", label: "Tablets", icon: <Laptop className="h-3.5 w-3.5" /> },
    { id: "laptop", label: "Laptops", icon: <Laptop className="h-3.5 w-3.5" /> },
    { id: "smartwatch", label: "Watches", icon: <Watch className="h-3.5 w-3.5" /> },
    { id: "accessory", label: "Accessory", icon: <Headphones className="h-3.5 w-3.5" /> },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center section-padding py-20 bg-background overflow-hidden relative">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        
        <Card className="w-full max-w-md glass-card-amazon p-8 rounded-[2.5rem] border-border/50 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
              <Lock className="text-primary" size={32} />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-foreground">Secure Matrix Access</h1>
            <p className="text-sm text-muted-foreground mt-2 font-medium uppercase tracking-widest text-[10px]">Administrative Clearance Required</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Access Key</Label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="h-14 rounded-2xl bg-muted/30 border-border/50 text-center text-lg font-bold tracking-widest focus:ring-primary/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest gap-2 group transition-all hover:shadow-xl hover:shadow-primary/20">
              Decrypt Access <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-primary" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Authorized Personnel Only</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="section-padding py-24 md:py-32 min-h-screen">
      <div className="glass-card p-5 sm:p-8 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-[10px] uppercase tracking-widest border-primary/30 text-primary">Secure Access</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage products, carousel items, and offers</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => setIsAuthenticated(false)} className="rounded-xl h-12 px-4 italic font-bold">Lock</Button>
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 sm:flex-none h-12 px-6 rounded-xl shadow-lg shadow-primary/20"><Plus className="mr-2 h-4 w-4" />Add Product</Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl w-[95vw] rounded-[2rem] p-6 overflow-hidden">
                <DialogHeader><DialogTitle className="text-xl font-black uppercase tracking-tight">Expand Showroom Matrix</DialogTitle></DialogHeader>
                <ProductForm 
                  product={newProduct} 
                  setProduct={setNewProduct} 
                  isNew 
                  handleAddProduct={handleAddProduct}
                  handleUpdateProduct={handleUpdateProduct}
                  brands={brands}
                  specsInput={specsInput}
                  setSpecsInput={setSpecsInput}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="mb-6 w-full flex overflow-x-auto no-scrollbar justify-start sm:justify-center h-auto p-1 bg-muted/50 rounded-xl">
            <TabsTrigger value="products" className="flex-shrink-0 gap-2 px-6 py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"><Package className="h-4 w-4" />Products ({products.length})</TabsTrigger>
            <TabsTrigger value="carousel" className="flex-shrink-0 gap-2 px-6 py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"><ImageIcon className="h-4 w-4" />Carousel Decks</TabsTrigger>
            <TabsTrigger value="offers" className="flex-shrink-0 gap-2 px-6 py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"><Tag className="h-4 w-4" />Marketing</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="flex flex-wrap gap-2 mb-8 items-center bg-muted/20 p-2 rounded-2xl">
              {categories.map((c) => (
                <Button 
                  key={c.id} 
                  size="sm" 
                  variant={filterCategory === c.id ? "default" : "ghost"} 
                  onClick={() => setFilterCategory(c.id)} 
                  className={`rounded-xl px-4 flex items-center gap-2 h-10 transition-all ${filterCategory === c.id ? "shadow-md shadow-primary/20" : "hover:bg-muted"}`}
                >
                  {c.icon}
                  <span className="text-xs font-bold uppercase tracking-wider">{c.label}</span>
                </Button>
              ))}
            </div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Syncing with Cloud Matrix...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((p) => (
                  <Card key={p.id} className="overflow-hidden border-none glass-card hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img src={p.image} alt={p.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-contain bg-muted/50 p-2 border border-border group-hover:scale-105 transition-transform" />
                          {!p.inStock && (
                            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] rounded-2xl flex items-center justify-center">
                              <span className="text-[8px] font-black uppercase tracking-widest text-destructive">Sold Out</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{p.brand}</span>
                            <Badge variant="secondary" className="text-[9px] px-1.5 py-0 uppercase font-black tracking-tighter">
                              {p.category}
                            </Badge>
                          </div>
                          <h3 className="font-black truncate text-sm sm:text-base leading-tight mb-1">{p.name}</h3>
                          <p className="text-base font-black text-foreground">
                            ₹{p.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <div className="flex gap-1">
                          {carouselItems.includes(p.id) && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" title="In Carousel" />}
                          {offerItems.includes(p.id) && <div className="w-2 h-2 rounded-full bg-destructive" title="Special Offer" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-9 w-9 rounded-xl border border-border hover:bg-primary/10 hover:text-primary transition-all"
                            onClick={() => {
                              setEditProduct(p);
                              setSpecsInput(p.specs.join(", "));
                              setEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-9 w-9 rounded-xl border border-border text-destructive hover:bg-destructive/10 transition-all" 
                            onClick={() => handleDelete(p.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ... other TabsContent remain functional ... */}
          <TabsContent value="carousel">
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 px-1 italic">Visual Matrix: Select premium items to showcase in the site's high-resolution carousel decks.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((p) => (
                <Card key={p.id} className="border-none glass-card">
                  <CardContent className="p-4 flex items-center gap-4">
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-contain bg-white/5 p-1" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold truncate text-sm">{p.name}</h3>
                      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{p.brand} • {p.category}</p>
                    </div>
                    <div className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${carouselItems.includes(p.id) ? "bg-primary/10 text-primary border border-primary/20" : "bg-muted/30 text-muted-foreground"}`}>
                      <Label className="text-[10px] font-black uppercase tracking-wider cursor-pointer">{carouselItems.includes(p.id) ? "Active" : "Static"}</Label>
                      <Switch className="scale-90" checked={carouselItems.includes(p.id)} onCheckedChange={() => toggleCarousel(p.id)} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="offers">
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 px-1 italic">Offer Management: Configure real-time discount labels and promotional states for individual units.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((p) => (
                <Card key={p.id} className="border-none glass-card overflow-hidden">
                  <CardContent className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-contain bg-white/5 p-1" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold truncate text-sm">{p.name}</h3>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">Live: ₹{p.price.toLocaleString()}</p>
                      </div>
                      <div className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${offerItems.includes(p.id) ? "bg-destructive/10 text-destructive border border-destructive/20" : "bg-muted/30 text-muted-foreground"}`}>
                        <Label className="text-[10px] font-black uppercase tracking-wider cursor-pointer">{offerItems.includes(p.id) ? "Live Offer" : "Normal"}</Label>
                        <Switch
                          className="scale-90"
                          checked={offerItems.includes(p.id)}
                          onCheckedChange={() => toggleOffer(p.id, p.offerLabel || "Special Offer")}
                        />
                      </div>
                    </div>
                    
                    {offerItems.includes(p.id) && (
                      <div className="flex items-center gap-2 mt-2 pt-4 border-t border-border/50 animate-in fade-in slide-in-from-top-2">
                        <Tag size={14} className="text-muted-foreground" />
                        <Input
                          className="h-10 text-xs flex-1 rounded-xl bg-muted/20"
                          placeholder="e.g. EXTRA ₹5,000 OFF"
                          value={p.offerLabel || ""}
                          onChange={(e) => updateProduct(p.id, { offerLabel: e.target.value })}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-xl w-[95vw] rounded-[2rem] p-6 overflow-hidden">
            <DialogHeader><DialogTitle className="text-xl font-black uppercase tracking-tight">Refine Specification Matrix</DialogTitle></DialogHeader>
            {editProduct && (
              <ProductForm 
                product={editProduct} 
                setProduct={setEditProduct} 
                isNew={false} 
                handleAddProduct={handleAddProduct}
                handleUpdateProduct={handleUpdateProduct}
                brands={brands}
                specsInput={specsInput}
                setSpecsInput={setSpecsInput}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;
