'use client';
import ProductCard from '@/components/features/ProductCard';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ShoppingBag, ChevronRight } from 'lucide-react';

const PIZZAS = [
  { id: '1', name: 'Margarita', description: 'Klassik pomidor va mozzarella pishlog\'i. Yumshoq hamir.', price: 45000, image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Pizza_Margherita_stu_spivack.jpg' },
  { id: '2', name: 'Peperoni', description: 'Achchiq peperoni kolbasasi va erigan pishloq uyg\'unligi.', price: 55000, image: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Pepperoni_pizza.jpg' },
  { id: '3', name: 'Qazi pizza', description: 'Haqiqiy milliy ta\'m! Qazi va maxsus tomat sousi.', price: 70000, image: 'https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_1280.jpg' },
  { id: '4', name: 'Pishloqli', description: '4 xil pishloq uyg\'unligi, pishloq shinavandalari uchun.', price: 60000, image: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Pizza_quattro_formaggi_1.jpg' },
];

export default function Home() {
  const { getTotalPrice, getTotalCount } = useCartStore();
  const router = useRouter();

  const total = getTotalPrice();
  const count = getTotalCount();

  return (
    <div className="pb-32">
      {/* Header Area */}
      <div className="bg-white px-5 pt-8 pb-6 rounded-b-[2.5rem] shadow-[0_4px_30px_rgb(0,0,0,0.02)] relative z-10 border-b border-slate-100">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6"
        >
          <div>
            <p className="text-slate-400 text-[13px] font-semibold mb-0.5 tracking-wide uppercase">Xush kelibsiz 👋</p>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Nima yeymiz?</h1>
          </div>
          <div className="w-12 h-12 bg-[#FFF0E6] rounded-[18px] flex items-center justify-center border border-orange-100/50 shadow-sm shadow-orange-500/10">
            <span className="text-2xl">🍕</span>
          </div>
        </motion.div>

        {/* Featured Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[24px] p-5 text-white relative overflow-hidden shadow-lg shadow-black/10"
        >
          <div className="absolute -right-4 -top-8 w-32 h-32 bg-[#FF5E00] rounded-full blur-[40px] opacity-40" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase mb-3 text-orange-300">
              <Flame size={12} strokeWidth={3} />
              Eng ommabop
            </span>
            <h2 className="text-[22px] font-bold mb-1 tracking-tight">Peperoni 🔥</h2>
            <p className="text-slate-300 text-[13px] opacity-90">Achchiq va mazzali — <span className="font-semibold text-white">55,000 UZS</span></p>
          </div>
        </motion.div>
      </div>
      
      {/* List Area */}
      <div className="px-5 pt-7">
        <h3 className="font-bold text-slate-800 text-[17px] mb-4 tracking-tight">Barcha pizzalar</h3>
        <div className="flex flex-col gap-4">
          {PIZZAS.map((pizza, index) => (
            <div key={pizza.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
              <ProductCard pizza={pizza} />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Checkout Button */}
      <AnimatePresence>
        {count > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC] to-[#F8FAFC]/0 max-w-md mx-auto z-50 pointer-events-none pb-8"
          >
            <button
              onClick={() => router.push('/cart')}
              className="pointer-events-auto w-full bg-[#FF5E00] hover:bg-[#E05300] text-white p-4 rounded-[20px] font-bold shadow-[0_8px_30px_rgba(255,94,0,0.3)] flex justify-between items-center transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingBag size={22} strokeWidth={2.5} />
                  <span className="absolute -top-2 -right-2 bg-white text-[#FF5E00] text-[10px] font-black w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-sm">
                    {count}
                  </span>
                </div>
                <span className="text-[17px] tracking-tight">Savatga o'tish</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/10 py-1.5 px-3 rounded-xl backdrop-blur-sm">
                <span className="font-semibold text-[15px]">{total.toLocaleString()}</span>
                <span className="text-[11px] uppercase opacity-80 font-medium">UZS</span>
                <ChevronRight size={18} className="opacity-80 ml-1" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
