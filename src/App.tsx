import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/i18n";
import { ProductStoreProvider } from "@/lib/productStore";
import { ThemeProvider } from "@/lib/themeStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import Repairs from "./pages/Repairs";
import SellPhone from "./pages/SellPhone";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Compare from "./pages/Compare";
import NotFound from "./pages/NotFound";
import CompareBar from "@/components/CompareBar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <ProductStoreProvider>
          <TooltipProvider>
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Header />
              <main className="min-h-screen">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/repairs" element={<Repairs />} />
                  <Route path="/sell-phone" element={<SellPhone />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <CompareBar />
              <WhatsAppFab />
            </BrowserRouter>
          </TooltipProvider>
        </ProductStoreProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
