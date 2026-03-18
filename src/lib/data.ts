export type ProductCategory = "new" | "used" | "accessory" | "tablet" | "smartwatch" | "laptop";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  ram: string;
  storage: string;
  specs: string[];
  inStock: boolean;
  isOffer?: boolean;
  offerLabel?: string;
  category: ProductCategory;
  condition?: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  rating?: number;
  reviewsCount?: number;
  description?: string;
  warranty?: string;
  color?: string;
  processor?: string;
  batteryHealth?: number;
  boxIncluded?: boolean;
  isCarousel?: boolean;
}

export interface Branch {
  id: string;
  name: string;
  nameTe: string;
  address: string;
  addressTe: string;
  phones: string[];
  mapUrl: string;
}

export const branches: Branch[] = [
  {
    id: "sai-mobiles",
    name: "Sai Mobiles",
    nameTe: "సాయి మొబైల్స్",
    address: "Sai Mobiles, Main Road", // Generic address as backup
    addressTe: "సాయి మొబైల్స్, మెయిన్ రోడ్",
    phones: ["9553525647"],
    mapUrl: "https://maps.app.goo.gl/R7tfeVtiKDTbWgC59",
  },
];

export const WHATSAPP_NUMBER = "919553525647";

export const products: Product[] = [
  // --- NEW PHONES ---
  {
    id: "1",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 129999,
    originalPrice: 139999,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    ram: "12 GB",
    storage: "256 GB",
    specs: ["6.8\" QHD+ AMOLED", "200MP Camera", "5000mAh Battery", "Snapdragon 8 Gen 3"],
    inStock: true,
    isOffer: true,
    offerLabel: "₹10,000 off",
    category: "new",
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 159900,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    ram: "8 GB",
    storage: "256 GB",
    specs: ["6.7\" Super Retina XDR", "48MP Camera", "A17 Pro Chip", "Titanium Design"],
    inStock: true,
    category: "new",
  },
  {
    id: "3",
    name: "OnePlus 12",
    brand: "OnePlus",
    price: 64999,
    originalPrice: 69999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    ram: "12 GB",
    storage: "256 GB",
    specs: ["6.82\" QHD+ LTPO", "50MP Hasselblad", "5400mAh Battery", "Snapdragon 8 Gen 3"],
    inStock: true,
    isOffer: true,
    offerLabel: "₹5,000 off",
    category: "new",
  },
  {
    id: "4",
    name: "Xiaomi 14",
    brand: "Xiaomi",
    price: 49999,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
    ram: "12 GB",
    storage: "256 GB",
    specs: ["6.36\" LTPO AMOLED", "50MP Leica", "4610mAh Battery", "Snapdragon 8 Gen 3"],
    inStock: true,
    category: "new",
  },
  {
    id: "5",
    name: "Vivo V30 Pro",
    brand: "Vivo",
    price: 39999,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop",
    ram: "8 GB",
    storage: "128 GB",
    specs: ["6.78\" AMOLED", "50MP Camera", "5000mAh Battery", "Dimensity 8200"],
    inStock: true,
    category: "new",
  },
  {
    id: "6",
    name: "Realme GT 5 Pro",
    brand: "Realme",
    price: 34999,
    originalPrice: 37999,
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop",
    ram: "8 GB",
    storage: "128 GB",
    specs: ["6.78\" AMOLED", "50MP Sony IMX890", "5400mAh Battery", "Snapdragon 8 Gen 3"],
    inStock: false,
    isOffer: true,
    offerLabel: "₹3,000 off",
    category: "new",
  },
  {
    id: "7",
    name: "OPPO Reno 11 Pro",
    brand: "OPPO",
    price: 34999,
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop",
    ram: "12 GB",
    storage: "256 GB",
    specs: ["6.7\" AMOLED", "50MP Camera", "4600mAh Battery", "Dimensity 8200"],
    inStock: true,
    category: "new",
  },
  {
    id: "8",
    name: "Samsung Galaxy A55",
    brand: "Samsung",
    price: 27999,
    image: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=400&h=400&fit=crop",
    ram: "8 GB",
    storage: "128 GB",
    specs: ["6.6\" Super AMOLED", "50MP Camera", "5000mAh Battery", "Exynos 1480"],
    inStock: true,
    category: "new",
  },

  // --- USED / REFURBISHED PHONES ---
  {
    id: "u1",
    name: "iPhone 13",
    brand: "Apple",
    price: 34999,
    originalPrice: 49900,
    image: "https://images.unsplash.com/photo-1632633173522-47456de71b68?w=400&h=400&fit=crop",
    ram: "4 GB",
    storage: "128 GB",
    specs: ["6.1\" Super Retina XDR", "12MP Dual Camera", "A15 Bionic", "Face ID"],
    inStock: true,
    category: "used",
    condition: "Excellent",
  },
  {
    id: "u2",
    name: "Samsung Galaxy S22",
    brand: "Samsung",
    price: 24999,
    originalPrice: 72999,
    image: "https://images.unsplash.com/photo-1644501635467-c4940e070529?w=400&h=400&fit=crop",
    ram: "8 GB",
    storage: "128 GB",
    specs: ["6.1\" Dynamic AMOLED", "50MP Camera", "3700mAh Battery", "Snapdragon 8 Gen 1"],
    inStock: true,
    category: "used",
    condition: "Good",
  },
  {
    id: "u3",
    name: "OnePlus 10 Pro",
    brand: "OnePlus",
    price: 22999,
    originalPrice: 66999,
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=400&h=400&fit=crop",
    ram: "8 GB",
    storage: "128 GB",
    specs: ["6.7\" QHD+ LTPO", "48MP Hasselblad", "5000mAh Battery", "Snapdragon 8 Gen 1"],
    inStock: true,
    category: "used",
    condition: "Good",
  },
  {
    id: "u4",
    name: "Xiaomi 12 Pro",
    brand: "Xiaomi",
    price: 19999,
    originalPrice: 62999,
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop",
    ram: "8 GB",
    storage: "256 GB",
    specs: ["6.73\" AMOLED", "50MP Triple Camera", "4600mAh Battery", "Snapdragon 8 Gen 1"],
    inStock: true,
    category: "used",
    condition: "Average",
  },

  // --- ACCESSORIES ---
  {
    id: "a1",
    name: "Premium Tempered Glass",
    brand: "Generic",
    price: 299,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
    ram: "",
    storage: "",
    specs: ["9H Hardness", "Anti-Fingerprint", "Bubble-Free Installation", "Universal Fit"],
    inStock: true,
    category: "accessory",
  },
  {
    id: "a2",
    name: "65W Fast Charger",
    brand: "Generic",
    price: 899,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop",
    ram: "",
    storage: "",
    specs: ["65W Super Fast Charging", "USB-C", "Universal Compatibility", "Compact Design"],
    inStock: true,
    category: "accessory",
    isOffer: true,
    offerLabel: "30% off",
  },
  {
    id: "a3",
    name: "Wireless Earbuds Pro",
    brand: "Generic",
    price: 1499,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop",
    ram: "",
    storage: "",
    specs: ["Active Noise Cancellation", "30hr Battery Life", "IPX5 Water Resistant", "Bluetooth 5.3"],
    inStock: true,
    category: "accessory",
    isOffer: true,
    offerLabel: "40% off",
  },
  {
    id: "a4",
    name: "Silicone Phone Case",
    brand: "Generic",
    price: 199,
    image: "https://images.unsplash.com/photo-1541877590-a1c8d5e38fd4?w=400&h=400&fit=crop",
    ram: "",
    storage: "",
    specs: ["Shockproof Protection", "Slim & Lightweight", "Anti-Slip Grip", "Multiple Colors"],
    inStock: true,
    category: "accessory",
  },
  {
    id: "a5",
    name: "10000mAh Power Bank",
    brand: "Generic",
    price: 999,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    ram: "",
    storage: "",
    specs: ["10000mAh Capacity", "22.5W Fast Charge", "Dual USB Output", "LED Indicator"],
    inStock: true,
    category: "accessory",
  },
];

export const brands = [
  "Samsung", 
  "Apple", 
  "OnePlus", 
  "Google",
  "Xiaomi", 
  "Vivo", 
  "Realme", 
  "OPPO", 
  "Motorola", 
  "Nothing", 
  "ASUS", 
  "IQOO", 
  "POCO", 
  "Infinix", 
  "Tecno", 
  "Lava",
  "Nokia"
];

export const problemTypes = [
  { value: "screen", en: "Screen Replacement", te: "స్క్రీన్ రీప్లేస్‌మెంట్" },
  { value: "battery", en: "Battery Replacement", te: "బ్యాటరీ రీప్లేస్‌మెంట్" },
  { value: "charging", en: "Charging Problem", te: "ఛార్జింగ్ సమస్య" },
  { value: "speaker", en: "Speaker/Microphone Issue", te: "స్పీకర్/మైక్రోఫోన్ సమస్య" },
  { value: "software", en: "Software Problem", te: "సాఫ్ట్‌వేర్ సమస్య" },
  { value: "water", en: "Water Damage", te: "నీటి నష్టం" },
  { value: "other", en: "Other Issue", te: "ఇతర సమస్య" },
];
