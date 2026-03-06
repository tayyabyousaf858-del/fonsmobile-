import React, { useState, useMemo } from 'react';
import { 
  Smartphone, Search, Home, Tag, ShoppingCart, Truck, 
  Crown, Sun, Zap, Headphones, Layers, Plug, Speaker, 
  Watch, BatteryFull, PackageOpen, X, Network, User, Phone, Mail, Lock,
  MessageCircle, Info, Star, ChevronRight, CheckCircle2, Copy, Moon, MapPin, Clock, ShieldCheck
} from 'lucide-react';

// ---------- PRODUCT DATA ----------
const products = [
  { id: 1, name: 'RoyalX Turbo Charger', brand: 'royalx', category: 'charger', type: 'accessory', price: 2999, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80', description: '20W fast charger', details: ['20W Power Delivery', '0 to 50% in 30 mins', 'Overheat protection', 'Universal Type-C compatibility', '1 Year Official Warranty'] },
  { id: 2, name: 'RoyalX Braided Cable', brand: 'royalx', category: 'cable', type: 'accessory', price: 1299, image: 'https://images.unsplash.com/photo-1530296653676-02b9ff98a58e?auto=format&fit=crop&w=400&q=80', description: 'USB-C to C, 2m', details: ['2 Meters length', 'Nylon braided for durability', 'Supports 60W fast charging', 'Tangle-free design', 'Data transfer up to 480Mbps'] },
  { id: 3, name: 'RoyalX AirBuds', brand: 'royalx', category: 'earbuds', type: 'accessory', price: 3999, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80', description: 'True wireless earbuds', details: ['5 hours play time on single charge', 'Amazing sound and deep bass', 'Active Noise Canceling (ANC)', 'Touch controls', 'IPX4 Water resistant', 'Bluetooth 5.3'] },
  { id: 4, name: 'RoyalX Mega Speaker', brand: 'royalx', category: 'speaker', type: 'accessory', price: 7999, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=80', description: '20W bluetooth', details: ['20W loud stereo sound', '12 hours battery life', 'Bluetooth 5.0', 'Built-in mic for calls', 'IPX7 Waterproof rating'] },
  { id: 5, name: 'Ronin Pro Headphones', brand: 'ronin', category: 'headphones', type: 'accessory', price: 14999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80', description: 'ANC wireless', details: ['Active Noise Cancellation', '40 hours battery life', 'Hi-Res Audio', 'Comfortable over-ear fit', 'Foldable design for travel'] },
  { id: 6, name: 'Ronin Sport Watch', brand: 'ronin', category: 'watch', type: 'accessory', price: 8999, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80', description: 'fitness tracker', details: ['Heart rate & SpO2 monitor', '1.4" Color display', '10 days battery life', 'IP68 Waterproof', 'Multiple sports modes'] },
  { id: 7, name: 'Ronin Type-C Cable', brand: 'ronin', category: 'cable', type: 'accessory', price: 999, image: 'https://images.unsplash.com/photo-1504610926078-a1611febcad3?auto=format&fit=crop&w=400&q=80', description: 'nylon braided', details: ['1 Meter length', 'Fast data sync up to 480Mbps', 'Durable connectors', '3A Fast charging', 'Reinforced joints'] },
  { id: 8, name: 'Ronin Mini Speaker', brand: 'ronin', category: 'speaker', type: 'accessory', price: 3499, image: 'https://images.unsplash.com/photo-1589003071595-f14481525282?auto=format&fit=crop&w=400&q=80', description: 'waterproof', details: ['Compact & portable', 'IPX7 Waterproof', '8 hours playtime', 'Punchy bass', 'Built-in carrying strap'] },
  { id: 9, name: 'Audionic SoundBar 500', brand: 'audionic', category: 'speaker', type: 'accessory', price: 11999, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80', description: '30W deep bass', details: ['30W Output power', 'Deep bass subwoofer', 'Bluetooth, AUX, USB support', 'Remote control included', 'Wall mountable'] },
  { id: 10, name: 'Audionic Neckband Pro', brand: 'audionic', category: 'handsfree', type: 'accessory', price: 4499, image: 'https://images.unsplash.com/photo-1599669500515-b3e1f668f14f?auto=format&fit=crop&w=400&q=80', description: '24h battery', details: ['24 hours continuous playback', 'Magnetic earbuds', 'Vibration alert for calls', 'Sweat resistant', 'Flexible neckband'] },
  { id: 11, name: 'Audionic Smart Watch Z1', brand: 'audionic', category: 'watch', type: 'accessory', price: 6999, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&q=80', description: '1.8" AMOLED', details: ['1.8" AMOLED Display', 'Bluetooth calling', 'Multiple sports modes', 'Custom watch faces', 'Sleep tracking'] },
  { id: 12, name: 'Audionic Quick Charger', brand: 'audionic', category: 'charger', type: 'accessory', price: 2499, image: 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=400&q=80', description: '18W PD', details: ['18W Power Delivery', 'Compact design', 'Short-circuit protection', 'Compatible with iOS & Android', 'Fireproof material'] },
  { id: 13, name: 'HH Power Bank 10K', brand: 'HH', category: 'powerbank', type: 'accessory', price: 3999, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=400&q=80', description: '10000mAh', details: ['10000mAh Real capacity', 'Dual USB output', '18W Fast charging support', 'LED battery indicator', 'Flight safe'] },
  { id: 14, name: 'HH Wired Earphones', brand: 'HH', category: 'handsfree', type: 'accessory', price: 1499, image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=400&q=80', description: 'mic & remote', details: ['Clear HD sound', 'In-line microphone', 'Volume control buttons', '3.5mm Audio jack', 'Tangle-free wire'] },
  { id: 15, name: 'HH USB 3.0 Cable', brand: 'HH', category: 'cable', type: 'accessory', price: 799, image: 'https://images.unsplash.com/photo-1588600878108-578307a3cc9d?auto=format&fit=crop&w=400&q=80', description: 'fast sync', details: ['USB 3.0 Fast data transfer', '1 Meter length', 'Thick durable wire', 'Universal compatibility', 'High-speed charging'] },
  { id: 16, name: 'HH Fitness Band', brand: 'HH', category: 'watch', type: 'accessory', price: 2999, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?auto=format&fit=crop&w=400&q=80', description: 'heart rate', details: ['Continuous heart rate monitoring', 'Step & calorie counter', 'Sleep tracking', '7 Days battery life', 'OLED display'] },
  
  // Mobiles
  { id: 17, name: 'iPhone 15 Pro Max', brand: 'apple', category: 'mobile', type: 'mobile', price: 450000, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80', description: '256GB, Titanium', details: ['A17 Pro chip', 'Titanium design', '48MP Main camera', 'USB-C', '6.7" Super Retina XDR display', 'Action button'] },
  { id: 18, name: 'iPhone 14', brand: 'apple', category: 'mobile', type: 'mobile', price: 300000, image: 'https://images.unsplash.com/photo-1663465374413-83c1001f0438?auto=format&fit=crop&w=400&q=80', description: '128GB, Midnight', details: ['A15 Bionic chip', '6.1" Super Retina XDR display', 'Advanced dual-camera system', 'All-day battery life', 'Face ID', 'Ceramic Shield front'] },
  { id: 19, name: 'Samsung Galaxy S24 Ultra', brand: 'samsung', category: 'mobile', type: 'mobile', price: 400000, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80', description: '512GB, AI Features', details: ['Snapdragon 8 Gen 3', 'Galaxy AI', '200MP Camera', 'S Pen included', '6.8" Dynamic AMOLED 2X', 'Titanium frame'] },
  { id: 20, name: 'Samsung Galaxy A54', brand: 'samsung', category: 'mobile', type: 'mobile', price: 120000, image: 'https://images.unsplash.com/photo-1609252925148-b0f1bce15696?auto=format&fit=crop&w=400&q=80', description: '256GB, Awesome Graphite', details: ['Exynos 1380', '120Hz Super AMOLED', '50MP OIS Camera', '5000mAh Battery', 'IP67 Water resistant', 'Awesome Nightography'] },
  { id: 21, name: 'Xiaomi 14 Pro', brand: 'xiaomi', category: 'mobile', type: 'mobile', price: 250000, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80', description: '256GB, Leica Optics', details: ['Snapdragon 8 Gen 3', 'Leica Summilux lens', '120W HyperCharge', 'LTPO AMOLED', 'Xiaomi HyperOS', 'IP68 rating'] },
  { id: 22, name: 'Redmi Note 13 Pro', brand: 'xiaomi', category: 'mobile', type: 'mobile', price: 85000, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80', description: '256GB, 200MP Camera', details: ['MediaTek Helio G99-Ultra', '120Hz AMOLED', '200MP Camera', '67W Turbo charging', 'In-display fingerprint sensor', 'Dual speakers'] },
  { id: 23, name: 'Vivo V30 Pro', brand: 'vivo', category: 'mobile', type: 'mobile', price: 160000, image: 'https://images.unsplash.com/photo-1575695345930-49a09d177d4e?auto=format&fit=crop&w=400&q=80', description: '512GB, ZEISS Camera', details: ['MediaTek Dimensity 8200', 'ZEISS Professional Portrait', '80W FlashCharge', '120Hz AMOLED', 'Aura Light Portrait', 'Ultra-slim 3D curved display'] },
  { id: 24, name: 'Oppo Reno 11', brand: 'oppo', category: 'mobile', type: 'mobile', price: 140000, image: 'https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&w=400&q=80', description: '256GB, Telephoto Portrait', details: ['MediaTek Dimensity 7050', '32MP Telephoto Portrait Camera', '67W SUPERVOOC', '120Hz 3D Curved Screen', 'ColorOS 14', 'Ultra Volume Mode'] },
  { id: 25, name: 'Infinix Note 40 Pro', brand: 'infinix', category: 'mobile', type: 'mobile', price: 75000, image: 'https://images.unsplash.com/photo-1621330396167-a414f65bee54?auto=format&fit=crop&w=400&q=80', description: '256GB, 108MP Camera', details: ['MediaTek Helio G99 Ultimate', '120Hz AMOLED Curved Display', '108MP OIS Super-Zoom Cam', '70W All-Round FastCharge 2.0', 'Active Halo Design'] },
  { id: 26, name: 'Tecno Camon 30 Pro', brand: 'tecno', category: 'mobile', type: 'mobile', price: 95000, image: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=400&q=80', description: '512GB, Sony IMX890', details: ['MediaTek Dimensity 8200 Ultimate', '144Hz AMOLED Display', '50MP Sony IMX890 Main Camera', '70W Ultra Charge', 'Classic Camera Design'] },
];

const categories = [
  { id: 'charger', name: 'Charger', icon: '🔌' },
  { id: 'cable', name: 'Cable', icon: '⚡' },
  { id: 'handsfree', name: 'Handsfree', icon: '🎧' },
  { id: 'earbuds', name: 'Earbuds', icon: '🎵' },
  { id: 'speaker', name: 'Speaker', icon: '🔊' },
  { id: 'headphones', name: 'Headphones', icon: '🎧' },
  { id: 'watch', name: 'Watch', icon: '⌚' },
  { id: 'powerbank', name: 'Powerbank', icon: '🔋' },
];

const mobileBrands = [
  { id: 'apple', name: 'Apple', icon: '🍎' },
  { id: 'samsung', name: 'Samsung', icon: '📱' },
  { id: 'xiaomi', name: 'Xiaomi', icon: '🟠' },
  { id: 'vivo', name: 'Vivo', icon: '🔵' },
  { id: 'oppo', name: 'Oppo', icon: '🟢' },
  { id: 'infinix', name: 'Infinix', icon: '⚡' },
  { id: 'tecno', name: 'Tecno', icon: '💠' },
];

const initialReviews = [
  { id: 1, name: 'Ahmed Ali', rating: 5, text: 'Amazing quality! The RoyalX charger works perfectly and charges my phone super fast.' },
  { id: 2, name: 'Sara Khan', rating: 5, text: 'Bought the Ronin headphones. The sound quality is top-notch, highly recommended.' },
  { id: 3, name: 'Usman Tariq', rating: 4, text: 'Best customer service and genuine products. The Audionic smartwatch is exactly as described.' }
];

type CartItem = { product: typeof products[0], quantity: number };
type Order = { id: string, items: CartItem[], total: number, status: string, date: string, method: string };

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeMobileBrand, setActiveMobileBrand] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModal, setActiveModal] = useState<'cart' | 'order' | 'auth' | 'contact' | 'about' | 'product' | 'checkout' | 'review' | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showMobileBrands, setShowMobileBrands] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [reviewForm, setReviewForm] = useState({ rating: 5, text: '' });
  
  // Checkout State
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'easypaisa' | 'jazzcash' | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'method' | 'details' | 'success'>('method');
  const [checkoutDetails, setCheckoutDetails] = useState({ name: '', phone: '', address: '', trxId: '' });
  const [lastOrderTracking, setLastOrderTracking] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  });
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  React.useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // If mobile brands menu is open but no specific brand is selected, show only mobiles
      if (showMobileBrands && !activeMobileBrand && p.type !== 'mobile') return false;
      
      // If accessory categories menu is open but no specific category is selected, show only accessories
      if (showCategories && !activeCategory && p.type !== 'accessory') return false;

      if (activeCategory && p.category !== activeCategory) return false;
      if (activeMobileBrand && p.brand !== activeMobileBrand) return false;
      if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !p.brand.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [activeCategory, activeMobileBrand, searchTerm, showMobileBrands, showCategories]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    alert('Added to cart!');
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleBuyNow = (product: typeof products[0]) => {
    setCheckoutItems([{ product, quantity: 1 }]);
    setPaymentMethod(null);
    setCheckoutStep('method');
    setActiveModal('checkout');
  };

  const handleCheckoutCart = () => {
    if (cart.length === 0) return;
    setCheckoutItems([...cart]);
    setPaymentMethod(null);
    setCheckoutStep('method');
    setActiveModal('checkout');
  };

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const trackingNo = 'FONS-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    const total = checkoutItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: trackingNo,
      items: checkoutItems,
      total,
      status: 'Processing',
      date: new Date().toLocaleDateString(),
      method: paymentMethod || 'cod'
    };

    setOrders([newOrder, ...orders]);
    setLastOrderTracking(trackingNo);
    
    // If checking out from cart, clear cart
    if (checkoutItems.length === cart.length && checkoutItems.every((item, i) => item.product.id === cart[i]?.product.id)) {
      setCart([]);
    }
    
    setCheckoutStep('success');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#1e2b3c] dark:text-gray-100 bg-[#f4f7fb] dark:bg-gray-900 transition-colors duration-300">
      {/* ========== HEADER ========== */}
      <header className="bg-white dark:bg-gray-900 shadow-[0_8px_20px_rgba(0,20,50,0.04)] dark:shadow-none border-b border-transparent dark:border-gray-800 py-3 px-4 md:px-6 flex items-center justify-between flex-wrap gap-3 sticky top-0 z-20 transition-colors duration-300">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveCategory(null); setActiveMobileBrand(null); setSearchTerm(''); setShowCategories(false); setShowMobileBrands(false); }}>
          <Smartphone className="w-7 h-7 md:w-8 md:h-8 text-blue-600 drop-shadow-[0_4px_6px_rgba(0,60,200,0.2)]" />
          <span className="font-poppins font-bold text-xl md:text-[1.6rem] tracking-tight bg-gradient-to-br from-[#1e2b3c] to-blue-600 bg-clip-text text-transparent">
            Fons Mobile
          </span>
        </div>

        <div className="flex-1 max-w-[400px] mx-1 min-w-[150px] order-3 w-full md:order-none md:w-auto mt-2 md:mt-0">
          <div className="flex bg-[#f0f4fa] dark:bg-gray-800 rounded-full py-1.5 pl-3 pr-1.5 items-center border border-[#d9e2ef] dark:border-gray-700 transition-all duration-200 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-600/15 focus-within:bg-white dark:focus-within:bg-gray-900">
            <Search className="w-4 h-4 text-[#7c8ba0] dark:text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="border-none bg-transparent py-1 pl-2 pr-2 w-full text-sm outline-none text-[#1e2b3c] dark:text-white placeholder:text-[#7c8ba0] dark:placeholder:text-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-1.5 md:gap-2 items-center flex-wrap justify-end order-2 md:order-none">
          <button 
            onClick={() => { setActiveCategory(null); setActiveMobileBrand(null); setSearchTerm(''); setShowCategories(false); setShowMobileBrands(false); }}
            className="flex items-center gap-1 text-xs md:text-sm font-medium py-1.5 px-3 rounded-full transition-colors bg-transparent text-[#2c3f5c] dark:text-gray-300 hover:bg-[#e6edf8] dark:hover:bg-gray-800 hover:text-[#1a3b6e] dark:hover:text-white"
          >
            <Home className="w-4 h-4" /> <span className="hidden sm:inline">Home</span>
          </button>
          <button 
            onClick={() => { setShowCategories(!showCategories); setShowMobileBrands(false); }}
            className={`flex items-center gap-1 text-xs md:text-sm font-medium py-1.5 px-3 rounded-full transition-colors ${showCategories ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-transparent text-[#2c3f5c] dark:text-gray-300 hover:bg-[#e6edf8] dark:hover:bg-gray-800 hover:text-[#1a3b6e] dark:hover:text-white'}`}
          >
            <Crown className="w-4 h-4" /> <span className="hidden sm:inline">Brand</span>
          </button>
          <button 
            onClick={() => { setShowMobileBrands(!showMobileBrands); setShowCategories(false); }}
            className={`flex items-center gap-1 text-xs md:text-sm font-medium py-1.5 px-3 rounded-full transition-colors ${showMobileBrands ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-transparent text-[#2c3f5c] dark:text-gray-300 hover:bg-[#e6edf8] dark:hover:bg-gray-800 hover:text-[#1a3b6e] dark:hover:text-white'}`}
          >
            <Smartphone className="w-4 h-4" /> <span className="hidden sm:inline">Mobile</span>
          </button>
          <button 
            onClick={() => setActiveModal('cart')}
            className="flex items-center gap-1 text-xs md:text-sm font-medium py-1.5 px-3 rounded-full transition-colors bg-transparent text-[#2c3f5c] dark:text-gray-300 hover:bg-[#e6edf8] dark:hover:bg-gray-800 hover:text-[#1a3b6e] dark:hover:text-white relative"
          >
            <ShoppingCart className="w-4 h-4" /> 
            <span className="hidden sm:inline">Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveModal('order')}
            className="flex items-center gap-1 text-xs md:text-sm font-medium py-1.5 px-3 rounded-full transition-colors bg-transparent text-[#2c3f5c] dark:text-gray-300 hover:bg-[#e6edf8] dark:hover:bg-gray-800 hover:text-[#1a3b6e] dark:hover:text-white"
          >
            <Truck className="w-4 h-4" /> <span className="hidden sm:inline">Order</span>
          </button>
          <button 
            onClick={() => { setActiveModal('auth'); setAuthMode('signup'); }}
            className="flex items-center gap-1 text-xs md:text-sm font-medium py-1.5 px-3 rounded-full transition-colors bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
          >
            <User className="w-4 h-4" /> <span className="hidden sm:inline">Sign Up</span>
          </button>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center p-1.5 rounded-full transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ========== MAIN LAYOUT ========== */}
      <div className="flex p-4 md:p-8 gap-6 max-w-[1400px] mx-auto w-full flex-1 flex-col">
        
        {/* Professional About Section */}
        <div className="bg-gradient-to-br from-[#1e2b3c] to-[#0a1526] rounded-[24px] md:rounded-[32px] p-6 md:p-12 text-white shadow-2xl relative overflow-hidden flex items-center">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs md:text-sm font-semibold mb-4 md:mb-6 border border-blue-500/30">
              <Crown className="w-3.5 h-3.5" /> Premium Quality
            </div>
            <h1 className="text-2xl md:text-5xl font-poppins font-bold mb-3 md:mb-5 leading-tight">
              Elevate Your Digital Lifestyle
            </h1>
            <p className="text-sm md:text-lg text-blue-100/80 leading-relaxed max-w-2xl">
              Discover our curated collection of professional-grade mobile accessories. 
              From ultra-fast charging solutions to immersive audio gear, every product is 
              designed for uncompromising durability, exceptional performance, and seamless connectivity.
            </p>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 p-10 opacity-10 pointer-events-none hidden md:block">
            <Smartphone className="w-72 h-72 rotate-12" />
          </div>
        </div>

        {/* Categories Strip (Conditional based on "Brand" click) */}
        {showCategories && (
          <div className="bg-white dark:bg-gray-800 rounded-[24px] py-4 px-4 md:px-8 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.06)] dark:shadow-none flex flex-wrap items-center gap-x-3 gap-y-3 animate-in slide-in-from-top-4 fade-in duration-300 border border-blue-100 dark:border-gray-700">
            <span className="font-semibold text-[#5f7d9e] dark:text-gray-400 text-sm md:text-[0.95rem] flex items-center gap-1.5 w-full md:w-auto mb-1 md:mb-0">
              <Layers className="w-4 h-4 md:w-5 md:h-5" /> Categories:
            </span>
            {categories.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <div 
                  key={cat.id}
                  onClick={() => setActiveCategory(isActive ? null : cat.id)}
                  className={`py-1.5 px-3 md:py-2 md:px-5 rounded-full text-xs md:text-[0.95rem] font-medium cursor-pointer transition-colors border ${
                    isActive 
                      ? 'bg-[#1e2b3c] dark:bg-blue-600 text-white border-[#1e2b3c] dark:border-blue-600 shadow-md' 
                      : 'bg-[#f0f5fd] dark:bg-gray-700 text-[#1e2b3c] dark:text-gray-200 border-transparent hover:bg-[#dae6f8] dark:hover:bg-gray-600'
                  }`}
                >
                  {cat.icon} {cat.name}
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile Brands Strip (Conditional based on "Mobile" click) */}
        {showMobileBrands && (
          <div className="bg-white dark:bg-gray-800 rounded-[24px] py-4 px-4 md:px-8 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.06)] dark:shadow-none flex flex-wrap items-center gap-x-3 gap-y-3 animate-in slide-in-from-top-4 fade-in duration-300 border border-blue-100 dark:border-gray-700">
            <span className="font-semibold text-[#5f7d9e] dark:text-gray-400 text-sm md:text-[0.95rem] flex items-center gap-1.5 w-full md:w-auto mb-1 md:mb-0">
              <Smartphone className="w-4 h-4 md:w-5 md:h-5" /> Mobile Brands:
            </span>
            {mobileBrands.map(brand => {
              const isActive = activeMobileBrand === brand.id;
              return (
                <div 
                  key={brand.id}
                  onClick={() => setActiveMobileBrand(isActive ? null : brand.id)}
                  className={`py-1.5 px-3 md:py-2 md:px-5 rounded-full text-xs md:text-[0.95rem] font-medium cursor-pointer transition-colors border ${
                    isActive 
                      ? 'bg-[#1e2b3c] dark:bg-blue-600 text-white border-[#1e2b3c] dark:border-blue-600 shadow-md' 
                      : 'bg-[#f0f5fd] dark:bg-gray-700 text-[#1e2b3c] dark:text-gray-200 border-transparent hover:bg-[#dae6f8] dark:hover:bg-gray-600'
                  }`}
                >
                  {brand.icon} {brand.name}
                </div>
              );
            })}
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 md:gap-6 mt-2">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => {
              return (
                <div 
                  key={product.id} 
                  onClick={() => { setSelectedProduct(product); setActiveModal('product'); }}
                  className="bg-white dark:bg-gray-800 rounded-[20px] p-3 md:p-4 shadow-[0_8px_20px_-10px_rgba(20,40,70,0.08)] dark:shadow-none transition-all duration-300 flex flex-col border border-black/5 dark:border-gray-700 hover:-translate-y-1 hover:shadow-[0_16px_30px_-12px_rgba(36,99,235,0.2)] dark:hover:border-blue-500 group cursor-pointer"
                >
                  <div className="w-full h-[120px] md:h-[160px] bg-[#f0f6ff] dark:bg-gray-700 rounded-[12px] md:rounded-[16px] mb-3 overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 shadow-sm border border-white/20 dark:border-gray-700">
                      {product.brand}
                    </div>
                  </div>
                  <h4 className="font-bold text-sm md:text-base mb-1 leading-tight text-[#1e2b3c] dark:text-white line-clamp-2">
                    {product.name}
                  </h4>
                  <div className="text-[#5f6f88] dark:text-gray-400 text-xs md:text-sm mb-3 line-clamp-1">
                    {product.description}
                  </div>
                  <div className="font-bold text-lg md:text-[1.3rem] text-[#0f1e32] dark:text-white mt-auto flex items-baseline gap-0.5">
                    <span className="text-xs md:text-sm font-medium text-[#6a7e9e] dark:text-gray-400">Rs</span>
                    {product.price.toLocaleString()}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 bg-[#f2f8ff] rounded-[32px] text-[#627b9e] flex flex-col items-center justify-center gap-3 border border-blue-100 border-dashed">
              <PackageOpen className="w-12 h-12 opacity-50 text-blue-400" />
              <p className="text-lg font-medium text-[#1e2b3c]">No products found</p>
              <button 
                onClick={() => { setActiveCategory(null); setSearchTerm(''); }}
                className="mt-2 px-5 py-2 bg-white border border-[#d9e2ef] rounded-full text-blue-600 text-sm font-semibold hover:bg-blue-50 transition-colors shadow-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-12 mb-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#1e2b3c] mb-2">What Our Customers Say</h2>
            <p className="text-[#5f7d9e] text-sm md:text-base">Real reviews from verified buyers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {reviewsList.map(review => (
              <div key={review.id} className="bg-white dark:bg-gray-800 p-6 rounded-[24px] shadow-[0_8px_20px_rgba(0,20,50,0.04)] dark:shadow-none border border-[#d9e2ef] dark:border-gray-700 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="flex gap-1 mb-3 text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-[#5f7d9e] text-sm md:text-base mb-5 italic leading-relaxed flex-1">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm md:text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm md:text-base text-[#1e2b3c]">{review.name}</div>
                    <div className="text-[10px] md:text-xs text-[#8399b6] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Verified Buyer
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ========== FOOTER ========== */}
      <footer className="bg-white dark:bg-gray-900 border-t border-black/5 dark:border-gray-800 pt-8 pb-6 px-6 mt-auto transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-[#1e2b3c] dark:text-white">
            <Smartphone className="w-6 h-6 text-blue-600" />
            <span className="font-poppins font-bold text-lg tracking-tight">Fons Mobile</span>
          </div>
          
          <div className="flex gap-4 md:gap-8">
            <button onClick={() => setActiveModal('about')} className="text-sm font-medium text-[#5f7d9e] hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <Info className="w-4 h-4" /> About Us
            </button>
            <button onClick={() => setActiveModal('contact')} className="text-sm font-medium text-[#5f7d9e] hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" /> Contact Us
            </button>
          </div>
          
          <div className="text-[#8399b6] text-xs md:text-sm">
            © 2026 Fons Mobile. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ========== MODALS ========== */}
      {activeModal && (
        <div className="fixed inset-0 bg-[#001428]/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200 overflow-y-auto">
          
          {/* Product Detail Modal */}
          {activeModal === 'product' && selectedProduct && (
            <div className="bg-white dark:bg-gray-800 max-w-[800px] w-full rounded-[32px] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col md:flex-row my-auto">
              <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-[#8399b6] hover:text-[#1e2b3c] dark:hover:text-white transition-colors bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-2 rounded-full hover:bg-[#e2e8f0] dark:hover:bg-gray-700 z-10 shadow-sm">
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full md:w-1/2 h-[250px] md:h-auto bg-[#f0f6ff] dark:bg-gray-700 relative">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                <div className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-fit mb-3">
                  {selectedProduct.brand}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1e2b3c] dark:text-white mb-2">{selectedProduct.name}</h2>
                <p className="text-[#5f7d9e] dark:text-gray-400 text-base mb-4">{selectedProduct.description}</p>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-[#1e2b3c] dark:text-white mb-2 text-sm uppercase tracking-wider">Product Features</h3>
                  <ul className="space-y-2">
                    {selectedProduct.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[#5f7d9e] dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto">
                  <div className="text-3xl font-bold text-[#0f1e32] dark:text-white mb-6 flex items-baseline gap-1">
                    <span className="text-lg text-[#6a7e9e] dark:text-gray-400 font-medium">Rs</span>
                    {selectedProduct.price.toLocaleString()}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={() => { addToCart(selectedProduct); setActiveModal(null); }}
                      className="flex-1 py-3.5 rounded-2xl bg-blue-50 text-blue-700 font-semibold text-base hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 border border-blue-200"
                    >
                      <ShoppingCart className="w-5 h-5" /> Add to Cart
                    </button>
                    <button 
                      onClick={() => handleBuyNow(selectedProduct)}
                      className="flex-1 py-3.5 rounded-2xl bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Checkout Modal */}
          {activeModal === 'checkout' && (
            <div className="bg-white max-w-[500px] w-full rounded-[32px] p-6 md:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200 my-auto">
              <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-[#8399b6] hover:text-[#1e2b3c] transition-colors bg-[#f0f4fa] p-2 rounded-full hover:bg-[#e2e8f0]">
                <X className="w-5 h-5" />
              </button>

              {checkoutStep === 'method' && (
                <>
                  <h2 className="font-bold text-2xl mb-2 text-[#1e2b3c]">Select Payment Method</h2>
                  <p className="text-[#5f7d9e] text-sm mb-6">Choose how you want to pay for your order.</p>
                  
                  <div className="flex flex-col gap-3">
                    <button onClick={() => setPaymentMethod('cod')} className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50' : 'border-[#d9e2ef] hover:border-blue-300'}`}>
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"><Truck className="w-5 h-5" /></div>
                      <div className="text-left"><div className="font-bold text-[#1e2b3c]">Cash on Delivery</div><div className="text-xs text-[#5f7d9e]">Pay when you receive</div></div>
                    </button>
                    <button onClick={() => setPaymentMethod('easypaisa')} className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${paymentMethod === 'easypaisa' ? 'border-green-600 bg-green-50' : 'border-[#d9e2ef] hover:border-green-300'}`}>
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">EP</div>
                      <div className="text-left"><div className="font-bold text-[#1e2b3c]">Easypaisa</div><div className="text-xs text-[#5f7d9e]">Send payment via Easypaisa</div></div>
                    </button>
                    <button onClick={() => setPaymentMethod('jazzcash')} className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${paymentMethod === 'jazzcash' ? 'border-red-600 bg-red-50' : 'border-[#d9e2ef] hover:border-red-300'}`}>
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">JC</div>
                      <div className="text-left"><div className="font-bold text-[#1e2b3c]">JazzCash</div><div className="text-xs text-[#5f7d9e]">Send payment via JazzCash</div></div>
                    </button>
                  </div>
                  
                  <button 
                    disabled={!paymentMethod}
                    onClick={() => setCheckoutStep('details')}
                    className="w-full py-3.5 mt-6 rounded-2xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </>
              )}

              {checkoutStep === 'details' && (
                <form onSubmit={placeOrder}>
                  <h2 className="font-bold text-2xl mb-2 text-[#1e2b3c]">Shipping Details</h2>
                  
                  {(paymentMethod === 'easypaisa' || paymentMethod === 'jazzcash') && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-5">
                      <p className="text-sm text-yellow-800 font-medium mb-2">Please send Rs {checkoutItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toLocaleString()} to:</p>
                      <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-yellow-100">
                        <div>
                          <div className="font-bold text-[#1e2b3c]">+92 344 5409858</div>
                          <div className="text-xs text-[#5f7d9e]">Title: Muhammad Tayyab</div>
                        </div>
                        <button type="button" onClick={() => copyToClipboard('+923445409858')} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"><Copy className="w-4 h-4" /></button>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-3 mb-6">
                    <input required type="text" placeholder="Full Name" value={checkoutDetails.name} onChange={e => setCheckoutDetails({...checkoutDetails, name: e.target.value})} className="w-full bg-[#f4f7fb] border border-[#d9e2ef] rounded-xl py-3 px-4 outline-none focus:border-blue-600 transition-all text-sm" />
                    <input required type="tel" placeholder="Phone Number" value={checkoutDetails.phone} onChange={e => setCheckoutDetails({...checkoutDetails, phone: e.target.value})} className="w-full bg-[#f4f7fb] border border-[#d9e2ef] rounded-xl py-3 px-4 outline-none focus:border-blue-600 transition-all text-sm" />
                    <textarea required placeholder="Complete Delivery Address" value={checkoutDetails.address} onChange={e => setCheckoutDetails({...checkoutDetails, address: e.target.value})} className="w-full bg-[#f4f7fb] border border-[#d9e2ef] rounded-xl py-3 px-4 outline-none focus:border-blue-600 transition-all text-sm resize-none h-24" />
                    
                    {(paymentMethod === 'easypaisa' || paymentMethod === 'jazzcash') && (
                      <input required type="text" placeholder="Transaction ID (TID) / Sender Number" value={checkoutDetails.trxId} onChange={e => setCheckoutDetails({...checkoutDetails, trxId: e.target.value})} className="w-full bg-[#f4f7fb] border border-[#d9e2ef] rounded-xl py-3 px-4 outline-none focus:border-blue-600 transition-all text-sm" />
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setCheckoutStep('method')} className="py-3.5 px-6 rounded-2xl bg-[#f0f4fa] text-[#5f7d9e] font-semibold hover:bg-[#e2e8f0] transition-colors">Back</button>
                    <button type="submit" className="flex-1 py-3.5 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">Place Order</button>
                  </div>
                </form>
              )}

              {checkoutStep === 'success' && (
                <div className="text-center py-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="font-bold text-2xl mb-2 text-[#1e2b3c]">Order Placed!</h2>
                  <p className="text-[#5f7d9e] text-sm mb-6">Thank you for shopping with Fons Mobile.</p>
                  
                  <div className="bg-[#f4f7fb] rounded-2xl p-4 mb-6 border border-[#d9e2ef]">
                    <div className="text-xs text-[#5f7d9e] uppercase tracking-wider font-bold mb-1">Tracking Number</div>
                    <div className="text-xl font-mono font-bold text-blue-600 flex items-center justify-center gap-2">
                      {lastOrderTracking}
                      <button onClick={() => copyToClipboard(lastOrderTracking)} className="text-[#8399b6] hover:text-blue-600"><Copy className="w-4 h-4" /></button>
                    </div>
                  </div>
                  
                  <button onClick={() => setActiveModal(null)} className="w-full py-3.5 rounded-2xl bg-[#1e2b3c] text-white font-semibold text-lg hover:bg-[#0f1a2c] transition-colors">
                    Done
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Cart Modal */}
          {activeModal === 'cart' && (
            <div className="bg-white max-w-[500px] w-full rounded-[32px] p-6 md:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200 my-auto max-h-[90vh] flex flex-col">
              <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-[#8399b6] hover:text-[#1e2b3c] transition-colors bg-[#f0f4fa] p-2 rounded-full hover:bg-[#e2e8f0] z-10">
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="font-bold text-2xl mb-6 text-[#1e2b3c] flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-blue-600" /> Your Cart
              </h2>
              
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <ShoppingCart className="w-16 h-16 text-[#d9e2ef] mx-auto mb-4" />
                  <p className="text-[#5f7d9e]">Your cart is currently empty.</p>
                  <button onClick={() => setActiveModal(null)} className="mt-6 py-2.5 px-6 rounded-full bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition-colors">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4 mb-6">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center bg-[#f4f7fb] p-3 rounded-2xl border border-[#d9e2ef]">
                        <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-xl object-cover" />
                        <div className="flex-1">
                          <div className="font-bold text-sm text-[#1e2b3c] line-clamp-1">{item.product.name}</div>
                          <div className="text-xs text-[#5f7d9e]">Qty: {item.quantity}</div>
                          <div className="font-bold text-blue-600 text-sm mt-1">Rs {(item.product.price * item.quantity).toLocaleString()}</div>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[#d9e2ef] pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-[#5f7d9e]">Total</span>
                      <span className="font-bold text-2xl text-[#1e2b3c]">Rs {cartTotal.toLocaleString()}</span>
                    </div>
                    <button onClick={handleCheckoutCart} className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Order Tracking Modal */}
          {activeModal === 'order' && (
            <div className="bg-white dark:bg-gray-800 max-w-[500px] w-full rounded-[32px] p-6 md:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200 my-auto max-h-[90vh] flex flex-col">
              <button onClick={() => { setActiveModal(null); setSelectedOrder(null); }} className="absolute top-4 right-4 text-[#8399b6] hover:text-[#1e2b3c] dark:hover:text-white transition-colors bg-[#f0f4fa] dark:bg-gray-700 p-2 rounded-full hover:bg-[#e2e8f0] dark:hover:bg-gray-600 z-10">
                <X className="w-5 h-5" />
              </button>
              
              {selectedOrder ? (
                <>
                  <button onClick={() => setSelectedOrder(null)} className="text-blue-600 text-sm font-semibold mb-4 flex items-center gap-1 hover:underline w-fit">
                    &larr; Back to Orders
                  </button>
                  <h2 className="font-bold text-2xl mb-4 text-[#1e2b3c] dark:text-white flex items-center gap-2">
                    Order Details
                  </h2>
                  <div className="bg-[#f4f7fb] dark:bg-gray-700 p-4 rounded-2xl border border-[#d9e2ef] dark:border-gray-600 mb-4">
                    <h3 className="font-bold text-[#1e2b3c] dark:text-white mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <div className="text-sm font-semibold text-[#1e2b3c] dark:text-white">{item.product.name}</div>
                              <div className="text-xs text-[#5f7d9e] dark:text-gray-400">Qty: {item.quantity}</div>
                            </div>
                          </div>
                          {selectedOrder.status !== 'Cancelled' && (
                            <button 
                              onClick={() => { setActiveModal('review'); setSelectedProduct(item.product); }}
                              className="text-xs bg-white dark:bg-gray-800 border border-[#d9e2ef] dark:border-gray-600 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-gray-900 transition-colors"
                            >
                              Write Review
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#f4f7fb] dark:bg-gray-700 p-4 rounded-2xl border border-[#d9e2ef] dark:border-gray-600 mb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-xs text-[#5f7d9e] dark:text-gray-400 uppercase font-bold">Tracking No</div>
                        <div className="font-mono font-bold text-blue-600 dark:text-blue-400 text-lg">{selectedOrder.id}</div>
                      </div>
                      <div className={`text-xs font-bold px-3 py-1.5 rounded-md ${selectedOrder.status === 'Cancelled' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                        {selectedOrder.status}
                      </div>
                    </div>
                    
                    {selectedOrder.status !== 'Cancelled' && (
                      <div className="space-y-3 border-t border-[#d9e2ef] dark:border-gray-600 pt-4">
                        <div className="flex items-center gap-3 text-sm text-[#1e2b3c] dark:text-gray-200">
                          <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <div>
                            <div className="font-semibold">Current Location</div>
                            <div className="text-[#5f7d9e] dark:text-gray-400">Main Warehouse Hub, Lahore</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-[#1e2b3c] dark:text-gray-200">
                          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <div>
                            <div className="font-semibold">Estimated Delivery</div>
                            <div className="text-[#5f7d9e] dark:text-gray-400">1 - 2 Business Days</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-2xl mb-6 flex items-start gap-3">
                    <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0" />
                    <div>
                      <div className="font-bold text-green-800 dark:text-green-300 text-sm">7-Day Return & Warranty Active</div>
                      <div className="text-xs text-green-700 dark:text-green-400 mt-1">You can return this product within 7 days of delivery if you encounter any issues.</div>
                    </div>
                  </div>

                  {selectedOrder.status === 'Processing' && (
                    <button 
                      onClick={() => {
                        setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status: 'Cancelled' } : o));
                        setSelectedOrder({ ...selectedOrder, status: 'Cancelled' });
                        alert('Order has been cancelled successfully.');
                      }}
                      className="w-full py-3.5 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold text-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors border border-red-200 dark:border-red-800"
                    >
                      Cancel Order
                    </button>
                  )}
                </>
              ) : (
                <>
                  <h2 className="font-bold text-2xl mb-6 text-[#1e2b3c] dark:text-white flex items-center gap-2">
                    <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" /> My Orders
                  </h2>
                  
                  {orders.length === 0 ? (
                    <div className="text-center py-10">
                      <PackageOpen className="w-16 h-16 text-[#d9e2ef] dark:text-gray-600 mx-auto mb-4" />
                      <p className="text-[#5f7d9e] dark:text-gray-400">You haven't placed any orders yet.</p>
                    </div>
                  ) : (
                    <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
                      {orders.map((order, idx) => (
                        <div key={idx} className="bg-[#f4f7fb] dark:bg-gray-700 p-4 rounded-2xl border border-[#d9e2ef] dark:border-gray-600">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="text-xs text-[#5f7d9e] dark:text-gray-400 uppercase font-bold">Tracking No</div>
                              <button onClick={() => setSelectedOrder(order)} className="font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline text-left">
                                {order.id}
                              </button>
                            </div>
                            <div className={`text-xs font-bold px-2 py-1 rounded-md ${order.status === 'Cancelled' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                              {order.status}
                            </div>
                          </div>
                          <div className="text-sm text-[#1e2b3c] dark:text-gray-200 mb-2">
                            {order.items.length} item(s) • <span className="uppercase">{order.method}</span>
                          </div>
                          <div className="flex justify-between items-center pt-3 border-t border-[#d9e2ef] dark:border-gray-600">
                            <span className="text-xs text-[#8399b6] dark:text-gray-400">{order.date}</span>
                            <span className="font-bold text-[#1e2b3c] dark:text-white">Rs {order.total.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Auth Modal */}
          {activeModal === 'auth' && (
            <div className="bg-white max-w-[420px] w-full rounded-[32px] p-8 shadow-2xl relative animate-in zoom-in-95 duration-200 my-auto">
              <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-[#8399b6] hover:text-[#1e2b3c] transition-colors bg-[#f0f4fa] p-2 rounded-full hover:bg-[#e2e8f0]">
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 mx-auto">
                {authMode === 'login' ? <Lock className="w-7 h-7" /> : <User className="w-7 h-7" />}
              </div>

              <h2 className="font-bold text-2xl mb-2 text-center text-[#1e2b3c]">
                {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="text-center text-[#5f7d9e] mb-8 text-sm">
                {authMode === 'login' ? 'Enter your details to access your account.' : 'Sign up to start shopping premium accessories.'}
              </p>
              
              <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert(authMode === 'login' ? 'Logged in successfully!' : 'Account created successfully!'); setActiveModal(null); }}>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8399b6]" />
                  <input type="email" placeholder="Email Address" className="w-full bg-[#f4f7fb] border border-[#d9e2ef] rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all text-[#1e2b3c]" required />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8399b6]" />
                  <input type="password" placeholder="Password" className="w-full bg-[#f4f7fb] border border-[#d9e2ef] rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all text-[#1e2b3c]" required />
                </div>
                <button type="submit" className="w-full py-4 mt-4 rounded-2xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-colors shadow-[0_8px_20px_-6px_rgba(36,99,235,0.5)]">
                  {authMode === 'login' ? 'Sign In' : 'Sign Up'}
                </button>
              </form>

              <div className="mt-8 text-center text-[#5f7d9e] text-sm">
                {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-blue-600 font-semibold hover:underline">
                  {authMode === 'login' ? 'Sign Up' : 'Log In'}
                </button>
              </div>
            </div>
          )}

          {/* Contact Modal */}
          {activeModal === 'contact' && (
            <div className="bg-white max-w-[400px] w-full rounded-[40px] p-8 shadow-2xl relative text-center animate-in zoom-in-95 duration-200 my-auto">
              <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-[#8399b6] hover:text-[#1e2b3c] transition-colors bg-[#f0f4fa] p-2 rounded-full hover:bg-[#e2e8f0]">
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-500 mx-auto">
                <MessageCircle className="w-8 h-8" />
              </div>

              <h2 className="font-bold text-2xl mb-4 text-[#1e2b3c]">
                Contact Us
              </h2>
              
              <p className="my-6 text-base text-[#5f7d9e] leading-relaxed">
                We're here to help! Reach out to us directly on WhatsApp for quick support and inquiries.
              </p>
              
              <a 
                href="https://wa.me/923445409858" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-[#25D366] text-white font-semibold text-lg hover:bg-[#1ebe57] transition-colors shadow-lg shadow-green-500/30"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp +92 344 5409858
              </a>
            </div>
          )}

          {/* About Modal */}
          {activeModal === 'about' && (
            <div className="bg-white max-w-[500px] w-full rounded-[40px] p-8 shadow-2xl relative text-center animate-in zoom-in-95 duration-200 my-auto">
              <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-[#8399b6] hover:text-[#1e2b3c] transition-colors bg-[#f0f4fa] p-2 rounded-full hover:bg-[#e2e8f0]">
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600 mx-auto">
                <Info className="w-8 h-8" />
              </div>

              <h2 className="font-bold text-2xl mb-4 text-[#1e2b3c]">
                About Fons Mobile
              </h2>
              
              <p className="my-6 text-base text-[#5f7d9e] leading-relaxed text-left">
                Fons Mobile is your premium destination for high-quality mobile accessories. We partner with top brands like <strong>RoyalX, Ronin, Audionic, and HH</strong> to bring you the best chargers, cables, earbuds, smartwatches, and more.
                <br/><br/>
                Our mission is to elevate your digital lifestyle with reliable, stylish, and professional-grade tech gear that keeps you connected.
              </p>
              
              <button 
                onClick={() => setActiveModal(null)}
                className="w-full py-3.5 rounded-2xl bg-[#1e2b3c] text-white font-semibold text-lg hover:bg-[#0f1a2c] transition-colors"
              >
                Close
              </button>
            </div>
          )}

          {/* Review Modal */}
          {activeModal === 'review' && selectedProduct && (
            <div className="bg-white dark:bg-gray-800 max-w-[400px] w-full rounded-[32px] p-6 md:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200 my-auto">
              <button onClick={() => setActiveModal('order')} className="absolute top-4 right-4 text-[#8399b6] hover:text-[#1e2b3c] dark:hover:text-white transition-colors bg-[#f0f4fa] dark:bg-gray-700 p-2 rounded-full hover:bg-[#e2e8f0] dark:hover:bg-gray-600 z-10">
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="font-bold text-2xl mb-2 text-[#1e2b3c] dark:text-white">Write a Review</h2>
              <p className="text-sm text-[#5f7d9e] dark:text-gray-400 mb-6">How was your experience with {selectedProduct.name}?</p>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const newReview = {
                  id: Date.now(),
                  name: 'You',
                  rating: reviewForm.rating,
                  text: reviewForm.text
                };
                setReviewsList([newReview, ...reviewsList]);
                setReviewForm({ rating: 5, text: '' });
                setActiveModal('order');
                alert('Thank you for your review!');
              }}>
                <div className="flex gap-2 mb-4 justify-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star} 
                      className={`w-8 h-8 cursor-pointer transition-colors ${star <= reviewForm.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                      onClick={() => setReviewForm({...reviewForm, rating: star})}
                    />
                  ))}
                </div>
                <textarea 
                  required 
                  placeholder="Write your review here..." 
                  value={reviewForm.text} 
                  onChange={e => setReviewForm({...reviewForm, text: e.target.value})} 
                  className="w-full bg-[#f4f7fb] dark:bg-gray-900 border border-[#d9e2ef] dark:border-gray-700 rounded-xl py-3 px-4 outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-all text-sm resize-none h-28 mb-4 text-[#1e2b3c] dark:text-white" 
                />
                <button type="submit" className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                  Submit Review
                </button>
              </form>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
