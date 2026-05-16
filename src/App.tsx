import { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, 
  Laptop, 
  Headphones, 
  Watch, 
  Battery, 
  Gamepad2, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  UserCheck, 
  MessageCircle, 
  MapPin, 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ArrowRight,
  ShoppingCart,
  Star,
  Sun,
  Moon,
  LaptopMinimal,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Product {
  id: string;
  name: string;
  price: string;
  rating: number;
  image: string;
  category: string;
}

// --- Data ---
const PRODUCTS: Product[] = [
  { id: '1', name: 'iPhone 16 Pro Max', price: '₦2,350,000', rating: 5, category: 'Smartphones', image: 'https://applepremiumstore.com.ng/wp-content/uploads/2024/09/iphone-16-pro-finish-select-202409-6-3inch-whitetitanium-scaled.webp' },
  { id: '2', name: 'iPhone 15 Pro', price: '₦1,850,000', rating: 5, category: 'Smartphones', image: 'https://www.phonemart.ng/wp-content/uploads/2024/06/15-promax6.jpeg' },
  { id: '3', name: 'Samsung Galaxy S25 Ultra', price: '₦2,100,000', rating: 5, category: 'Smartphones', image: 'https://dsclng.com/wp-content/uploads/2025/02/sms938_galaxys25ultra_front_titaniumblack_5506351.png' },
  { id: '4', name: 'Samsung Galaxy A56', price: '₦620,000', rating: 4.8, category: 'Smartphones', image: 'https://dsclng.com/wp-content/uploads/2025/04/1-1-2.jpg' },
  { id: '5', name: 'MacBook Pro M4', price: '₦3,450,000', rating: 5, category: 'Laptops', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop' },
  { id: '6', name: 'HP Pavilion Laptop', price: '₦980,000', rating: 4.5, category: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop' },
  { id: '7', name: 'Dell XPS 15', price: '₦2,250,000', rating: 4.9, category: 'Laptops', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop' },
  { id: '8', name: 'AirPods Pro 2', price: '₦420,000', rating: 5, category: 'Accessories', image: 'https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=800&auto=format&fit=crop' },
  { id: '9', name: 'Oraimo Power Bank', price: '₦38,000', rating: 4.7, category: 'Accessories', image: 'https://chomart.com/storage/images/oraimo-30000-mah-power-bank-rxzvm11040.webp' },
  { id: '10', name: 'Logitech Wireless Mouse', price: '₦28,000', rating: 4.6, category: 'Accessories', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop' },
  { id: '11', name: 'Gaming Keyboard RGB', price: '₦45,000', rating: 4.8, category: 'Gaming Gear', image: 'https://cdns3.thecosmicbyte.com/wp-content/uploads/white-bg-1.png.webp' },
];

const CATEGORIES = [
  { name: 'Smartphones', icon: Smartphone, items: '50+ Items' },
  { name: 'Laptops', icon: Laptop, items: '20+ Items' },
  { name: 'Accessories', icon: Headphones, items: '100+ Items' },
  { name: 'Gaming Gear', icon: Gamepad2, items: '15+ Items' },
  { name: 'Chargers & Cables', icon: Battery, items: '40+ Items' },
  { name: 'Smartwatches', icon: Watch, items: '25+ Items' },
];

// --- Components ---

const Navbar = ({ theme, toggleTheme, cartCount, onOpenCart }: { theme: 'light' | 'dark', toggleTheme: () => void, cartCount: number, onOpenCart: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 card-shadow border-b border-current/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20">
            <Smartphone className="text-white w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-display font-bold tracking-tighter leading-none block">MOBILE MART</span>
            <span className="text-[10px] text-brand-blue font-bold uppercase tracking-[0.2em]">Accessories</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Products', 'Categories', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold opacity-70 hover:opacity-100 hover:text-brand-blue transition-all">
              {item}
            </a>
          ))}
          <div className="flex items-center gap-4 border-l border-current/10 pl-6">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-current/5 transition-colors">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button 
              id="navbar-cart-button"
              onClick={onOpenCart}
              className="bg-brand-blue text-white px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-all flex items-center gap-3 relative"
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-brand-blue rounded-full text-[10px] flex items-center justify-center border-2 border-brand-blue">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2">
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button id="navbar-cart-button-mobile" onClick={onOpenCart} className="p-2 relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-brand-blue text-white text-[8px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 glass border-t border-current/5 p-6 flex flex-col gap-4 shadow-2xl"
          >
            {['Features', 'Products', 'Categories', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold py-2">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "iPhone 16 Pro Max",
      subtitle: "Titanium. Strong. Light. Pro.",
      desc: "Experience the pinnacle of mobile technology with the latest iPhone 16 Pro Max.",
      image: "https://applepremiumstore.com.ng/wp-content/uploads/2024/09/iphone-16-pro-finish-select-202409-6-3inch-whitetitanium-scaled.webp",
      color: "brand-blue"
    },
    {
      title: "S25 Ultra",
      subtitle: "The New Epic Standard.",
      desc: "Revolutionary performance and a camera that captures every detail, even in the dark.",
      image: "https://dsclng.com/wp-content/uploads/2025/02/sms938_galaxys25ultra_front_titaniumblack_5506351.png",
      color: "brand-blue"
    },
    {
      title: "MacBook Pro M4",
      subtitle: "Mind-blowing. Eye-opening.",
      desc: "The most advanced chips ever built for a personal computer. Built for Pro workflows.",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
      color: "brand-blue"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-24 overflow-hidden bg-hero-mesh">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center"
          >
            <div className="order-2 lg:order-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                Featured Highlight
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8 tracking-tighter"
              >
                {slides[currentSlide].title.split(' ').map((word, i) => (
                  <span key={i} className={i === slides[currentSlide].title.split(' ').length - 1 ? "text-gradient block" : "block"}>
                    {word}
                  </span>
                ))}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg opacity-60 mb-10 max-w-lg leading-relaxed font-medium"
              >
                {slides[currentSlide].desc}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a href="#products" className="bg-brand-blue text-white px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-brand-blue/20 flex items-center gap-3 group">
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all" />
                </a>
                <a href="#products" className="glass px-10 py-4 rounded-2xl font-bold text-lg hover:bg-current/5 transition-all text-center">
                  All Deals
                </a>
              </motion.div>
            </div>

            <div className="relative order-1 lg:order-2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                className="relative z-10 p-2 md:p-4 rounded-[3rem] glass shadow-2xl border-white/50 dark:border-white/5 aspect-square lg:aspect-auto"
              >
                <img 
                  src={slides[currentSlide].image} 
                  alt={slides[currentSlide].title} 
                  className="rounded-[2.5rem] w-full h-[400px] md:h-[600px] object-contain md:object-cover bg-white/5"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, -15, 0] }} 
                transition={{ duration: 4, repeat: Infinity }} 
                className="absolute -top-6 -right-2 md:-top-10 md:-right-4 glass p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-xl z-20 backdrop-blur-3xl"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Star className="text-yellow-400 fill-yellow-400 w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] md:text-xs opacity-50 font-bold uppercase tracking-widest">Premium Choice</div>
                    <div className="text-base md:text-lg font-bold whitespace-nowrap">Authentic Tech</div>
                  </div>
                </div>
              </motion.div>
              
              {/* Slide Indicators */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {slides.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === i ? 'w-10 bg-brand-blue' : 'w-4 bg-current/20'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

interface FlyingItem {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  image: string;
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const lastAddRef = useRef<number>(0);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const addToCart = (product: Product, e: React.MouseEvent) => {
    const now = Date.now();
    // 300ms cooldown to prevent accidental double-clicks/race conditions
    if (now - lastAddRef.current < 300) return;
    lastAddRef.current = now;

    setCart(prev => [...prev, product]);
    
    // Find dynamic target (Cart button in Navbar)
    const cartButton = document.getElementById('navbar-cart-button') || document.getElementById('navbar-cart-button-mobile');
    const isMobile = window.innerWidth < 768;
    
    // Fallback coordinates
    let targetX = window.innerWidth - (isMobile ? 80 : 100);
    let targetY = isMobile ? 30 : 40;

    if (cartButton) {
      const rect = cartButton.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
    }

    // Create flying animation
    const newItem: FlyingItem = {
      id: Date.now(),
      startX: e.clientX,
      startY: e.clientY,
      targetX: targetX,
      targetY: targetY,
      image: product.image
    };
    
    setFlyingItems(prev => [...prev, newItem]);
    
    // Remove individual flying item after animation completes
    setTimeout(() => {
      setFlyingItems(prev => prev.filter(item => item.id !== newItem.id));
    }, 1300);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((acc, item) => {
    const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''));
    return acc + priceNum;
  }, 0);

  const formatPrice = (price: number) => {
    return '₦' + price.toLocaleString();
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    
    const itemList = cart.map(item => `- ${item.name} (${item.price})`).join('\n');
    const message = encodeURIComponent(
      `Hello Mobile Mart! I would like to place an order from your website:\n\n` +
      `*Items:*\n${itemList}\n\n` +
      `*Total Price:* ${formatPrice(totalPrice)}\n\n` +
      `Please let me know the next steps for delivery and payment. Thank you!`
    );
    window.open(`https://wa.me/2348033055028?text=${message}`, '_blank');
  };

  return (
    <div className="selection:bg-brand-blue/30 overflow-hidden">
      <Navbar theme={theme} toggleTheme={toggleTheme} cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />
      <Hero />

      {/* Flying Items Animation Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        <AnimatePresence>
          {flyingItems.map(item => (
            <motion.img
              key={item.id}
              src={item.image}
              initial={{ 
                x: item.startX - 24, 
                y: item.startY - 24, 
                scale: 1, 
                rotate: 0,
                opacity: 1 
              }}
              animate={{ 
                x: item.targetX - 12, 
                y: item.targetY - 12, 
                scale: 0.1, 
                rotate: 720,
                opacity: 0
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.34, 1.56, 0.64, 1], // Springy path
              }}
              className="fixed w-16 h-16 rounded-full object-cover shadow-2xl border-2 border-brand-blue bg-white"
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Cart Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-full md:max-w-md glass z-[70] p-6 md:p-8 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold">Your Cart</h3>
                <div className="flex items-center gap-2">
                  {cart.length > 0 && (
                    <button 
                      onClick={clearCart}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                      title="Clear Cart"
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">Clear</span>
                    </button>
                  )}
                  <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-current/5 rounded-full"><X /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-30">
                    <ShoppingCart size={64} className="mb-4" />
                    <p className="font-bold uppercase tracking-widest text-xs">Your cart is empty</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-current/[0.03] border border-current/[0.05]">
                      <img src={item.image} className="w-20 h-20 rounded-xl object-cover" alt={item.name} />
                      <div className="flex-1 flex justify-between items-start">
                        <div>
                          <div className="font-bold text-sm">{item.name}</div>
                          <div className="text-brand-blue font-bold">{item.price}</div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(idx)} 
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                          title="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-current/10">
                <div className="flex justify-between items-end mb-6">
                  <div className="text-xs uppercase font-black opacity-40 tracking-widest">Total Amount</div>
                  <div className="text-3xl font-bold">{formatPrice(totalPrice)}</div>
                </div>
                <button 
                  onClick={handleWhatsAppCheckout}
                  disabled={cart.length === 0}
                  className="w-full bg-brand-blue text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-brand-blue/20 hover:scale-[1.02] transition-all disabled:opacity-30 disabled:hover:scale-100 flex items-center justify-center gap-3"
                >
                  <MessageCircle /> Proceed to WhatsApp Order
                </button>
                <button onClick={() => setIsCartOpen(false)} className="w-full mt-4 text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 py-2">Continue Shopping</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Features */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-20">
            <h4 className="text-brand-blue text-xs font-black uppercase tracking-[0.4em] mb-4">Excellence</h4>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">The Mobile Mart Standard</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle2, title: "Original Products", desc: "100% authentic gadgets with full warranty." },
              { icon: Battery, title: "Affordable Prices", desc: "Premium tech at rates that respect your wallet." },
              { icon: Truck, title: "Fast Delivery", desc: "Rapid nationwide shipping to your doorstep." },
              { icon: UserCheck, title: "Trusted Service", desc: "Nigeria's most reliable gadget destination." }
            ].map((f, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="p-10 rounded-[2.5rem] bg-current/[0.02] border border-current/[0.05] flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-8">
                  <f.icon strokeWidth={1.5} size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="opacity-50 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category List */}
      <section id="categories" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-bold">Shop by Department</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <button key={i} className="group p-6 rounded-3xl glass hover:bg-brand-blue hover:text-white transition-all text-center">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 group-hover:bg-white/20 mx-auto flex items-center justify-center mb-4">
                  <cat.icon size={24} />
                </div>
                <div className="font-bold text-sm">{cat.name}</div>
                <div className="text-[10px] opacity-40 uppercase font-black mt-1">{cat.items}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div>
              <h4 className="text-brand-blue text-xs font-black uppercase tracking-[0.4em] mb-4">The Collection</h4>
              <h2 className="text-5xl font-bold tracking-tight">Choice Gadgets</h2>
            </div>
            <div className="flex gap-2 bg-current/[0.03] p-1.5 rounded-2xl glass">
              {['All', 'Smartphones', 'Laptops', 'Accessories'].map(c => (
                <button 
                  key={c} onClick={() => setActiveCategory(c)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeCategory === c ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'opacity-40 hover:opacity-100'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.filter(p => activeCategory === 'All' || p.category === activeCategory).map(p => (
              <motion.div layout key={p.id} className="group p-4 rounded-[2rem] bg-current/[0.02] border border-current/[0.05] hover:bg-current/[0.04] transition-all">
                <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-6 relative bg-current/[0.03]">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="px-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] uppercase font-black text-brand-blue">{p.category}</span>
                    <div className="flex items-center gap-1 text-xs font-bold"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{p.rating}</div>
                  </div>
                  <h3 className="text-lg font-bold mb-4 h-12 overflow-hidden">{p.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">{p.price}</span>
                    <button 
                      onClick={(e) => addToCart(p, e)}
                      className="bg-brand-blue text-white w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-brand-blue/20"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="rounded-[4rem] p-1 glass border-current/[0.05] shadow-2xl overflow-hidden">
             <div className="grid lg:grid-cols-2 gap-1 px-1">
               <div className="p-12 lg:p-20 bg-current/[0.01]">
                 <h2 className="text-5xl font-bold mb-12 tracking-tighter">Locate & <br /><span className="text-brand-blue">Contact Us</span></h2>
                 <div className="space-y-10">
                   <div className="flex gap-6 items-start">
                     <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0"><MapPin /></div>
                     <div><div className="font-black text-[10px] uppercase opacity-30 tracking-widest mb-2">Main Outlet</div><p className="text-lg font-semibold leading-snug">No. 57 IBB Way, Kofar Kaura, Beside Qaramar Asibiti, Katsina, Nigeria</p></div>
                   </div>
                   <div className="flex gap-6 items-start">
                     <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0"><Phone /></div>
                     <div><div className="font-black text-[10px] uppercase opacity-30 tracking-widest mb-2">Phone Line</div><p className="text-xl font-bold">08033055028</p></div>
                   </div>
                   <div className="flex gap-6 items-start">
                     <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0"><Mail /></div>
                     <div><div className="font-black text-[10px] uppercase opacity-30 tracking-widest mb-2">Email</div><p className="text-xl font-bold">ameenund@gmail.com</p></div>
                   </div>
                 </div>
                 <div className="mt-16 flex flex-wrap gap-4">
                    <a href="https://wa.me/2348033055028" className="bg-[#25D366] text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-green-500/20 hover:scale-105 transition-all">
                       <MessageCircle /> WhatsApp Live
                    </a>
                    <button className="glass px-10 py-5 rounded-2xl font-bold hover:bg-current/5 transition-all">Directions</button>
                 </div>
               </div>
               <div className="bg-brand-blue p-12 lg:p-20 text-white flex flex-col justify-center relative overflow-hidden group">
                 <div className="absolute -top-1/4 -right-1/4 w-full h-full bg-white/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000" />
                 <h3 className="text-4xl font-bold mb-8 relative z-10 tracking-tight">Join the Tech Circle.</h3>
                 <p className="text-white/70 mb-12 relative z-10 font-medium text-lg">Get notified about flash sales, new iPhones, and exclusive laptop deals in Nigeria.</p>
                 <div className="space-y-4 relative z-10">
                   <input type="tel" placeholder="Phone Number" className="w-full h-18 rounded-2xl px-8 bg-black/10 border border-white/20 outline-hidden placeholder:text-white/40 focus:border-white/50 transition-all font-bold" />
                   <button className="w-full h-18 bg-white text-brand-blue rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all">Subscribe Now</button>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-8 lowercase">
                <Smartphone className="text-brand-blue" />
                <span className="font-bold tracking-tighter text-xl uppercase">Mobile Mart</span>
              </div>
              <p className="opacity-40 font-medium leading-relaxed">Nigeria's premium destination for high-end smartphones and computing gear. Quality guaranteed.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24">
              <div><h5 className="font-black text-[10px] uppercase opacity-30 tracking-widest mb-8">Catalog</h5><ul className="space-y-4 font-bold text-sm"><li>iPhones</li><li>Samsung</li><li>Laptops</li><li>Accessories</li></ul></div>
              <div><h5 className="font-black text-[10px] uppercase opacity-30 tracking-widest mb-8">Support</h5><ul className="space-y-4 font-bold text-sm"><li>Warranty</li><li>Delivery</li><li>Contact</li></ul></div>
              <div className="hidden lg:block space-y-4"><h5 className="font-black text-[10px] uppercase opacity-30 tracking-widest mb-8">Social</h5><div className="flex gap-4"><div className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all cursor-pointer"><Smartphone size={20} /></div></div></div>
            </div>
          </div>
          <div className="pt-12 border-t border-current/5 flex flex-col items-center gap-6 text-[10px] uppercase font-black tracking-widest opacity-30 text-center">
            <p>© 2026 MOBILE MART AND ACCESSORIES. Katsina, Nigeria. Built with ❤️ in Nigeria</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
