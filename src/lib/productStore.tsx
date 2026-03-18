import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, products as defaultProducts } from "./data";
import { toast } from "sonner";
import { db } from "./firebase";
import { 
  collection, 
  onSnapshot, 
  setDoc, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy
} from "firebase/firestore";

interface ProductStoreContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleCarousel: (id: string) => void;
  toggleOffer: (id: string, offerLabel?: string) => void;
  toggleWishlist: (id: string) => void;
  toggleCompare: (id: string) => void;
  addToRecentlyViewed: (id: string) => void;
  carouselItems: string[];
  offerItems: string[];
  wishlistItems: string[];
  compareItems: string[];
  recentlyViewed: string[];
  loading: boolean;
}

const ProductStoreContext = createContext<ProductStoreContextType | undefined>(undefined);

const WISHLIST_KEY = "sai_wishlist";
const COMPARE_KEY = "sai_compare";
const RECENTLY_VIEWED_KEY = "sai_viewed";

export const ProductStoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [wishlistItems, setWishlistItems] = useState<string[]>(() => {
    const saved = localStorage.getItem(WISHLIST_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [compareItems, setCompareItems] = useState<string[]>(() => {
    const saved = localStorage.getItem(COMPARE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Real-time Firebase Sync
  useEffect(() => {
    // If Firebase is not configured, fall back to default products
    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
      console.warn("Firebase API Key is missing. Operating in Local Mode.");
      setProducts(defaultProducts);
      setLoading(false);
      return;
    }

    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productList: Product[] = [];
      snapshot.forEach((doc) => {
        productList.push(doc.data() as Product);
      });
      
      // If DB is empty, use default data (Seeds the database for the first time)
      if (productList.length === 0 && loading) {
        setProducts(defaultProducts);
        // Automatically seed Firestore with default data if empty
        defaultProducts.forEach(async (p) => {
          try {
            await setDoc(doc(db, "products", p.id), p);
          } catch (e) {
            console.error("Failed to seed product:", p.id, e);
          }
        });
      } else {
        setProducts(productList);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firestore listener error:", error);
      // Fallback to defaults on error
      if (products.length === 0) setProducts(defaultProducts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [loading]);

  useEffect(() => localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistItems)), [wishlistItems]);
  useEffect(() => localStorage.setItem(COMPARE_KEY, JSON.stringify(compareItems)), [compareItems]);
  useEffect(() => localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed)), [recentlyViewed]);

  const addProduct = async (product: Product) => {
    if (!db) {
      setProducts(prev => [...prev, product]);
      toast.success("Added to Local Registry");
      return;
    }
    try {
      await setDoc(doc(db, "products", product.id), product);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Cloud Matrix Sync Failed");
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    if (!db) {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
      return;
    }
    try {
      const { id: _, ...dataWithoutId } = updates as any;
      await updateDoc(doc(db, "products", id), dataWithoutId);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Cloud Matrix Update Failed");
    }
  };

  const deleteProduct = async (id: string) => {
    if (!db) {
      setProducts(prev => prev.filter(p => p.id !== id));
      setWishlistItems((prev) => prev.filter((i) => i !== id));
      setCompareItems((prev) => prev.filter((i) => i !== id));
      setRecentlyViewed((prev) => prev.filter((i) => i !== id));
      return;
    }
    try {
      await deleteDoc(doc(db, "products", id));
      setWishlistItems((prev) => prev.filter((i) => i !== id));
      setCompareItems((prev) => prev.filter((i) => i !== id));
      setRecentlyViewed((prev) => prev.filter((i) => i !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Cloud Matrix Deletion Failed");
    }
  };

  const carouselItems = products.filter(p => p.isCarousel).map(p => p.id);
  const offerItems = products.filter(p => p.isOffer).map(p => p.id);

  const toggleCarousel = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      updateProduct(id, { isCarousel: !product.isCarousel });
    }
  };

  const toggleOffer = (id: string, offerLabel?: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      updateProduct(id, { 
        isOffer: !product.isOffer, 
        offerLabel: offerLabel || (product.isOffer ? "" : "Special Offer") 
      });
    }
  };

  const toggleWishlist = (id: string) =>
    setWishlistItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  const toggleCompare = (id: string) => {
    setCompareItems((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 4) {
        toast.error("Maximum comparison capacity reached");
        return prev;
      }
      return [...prev, id];
    });
  };

  const addToRecentlyViewed = (id: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((i) => i !== id);
      return [id, ...filtered].slice(0, 10);
    });
  };

  return (
    <ProductStoreContext.Provider
      value={{ 
        products, 
        addProduct, 
        updateProduct, 
        deleteProduct, 
        toggleCarousel, 
        toggleOffer, 
        toggleWishlist, 
        toggleCompare,
        addToRecentlyViewed,
        carouselItems, 
        offerItems, 
        wishlistItems,
        compareItems,
        recentlyViewed,
        loading
      }}
    >
      {children}
    </ProductStoreContext.Provider>
  );
};

export const useProductStore = () => {
  const ctx = useContext(ProductStoreContext);
  if (!ctx) throw new Error("useProductStore must be used within ProductStoreProvider");
  return ctx;
};
