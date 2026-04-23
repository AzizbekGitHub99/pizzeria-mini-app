'use client';
import { Pizza, useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function ProductCard({ pizza }: { pizza: Pizza }) {
  const { items, addItem, removeItem } = useCartStore();
  const cartItem = items.find((i) => i.id === pizza.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white rounded-[24px] p-3 shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-slate-100 flex gap-4 overflow-hidden"
    >
      <div className="absolute -left-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-colors duration-500" />

      <div className="relative w-[110px] h-[110px] shrink-0">
        <img 
          src={pizza.image} 
          alt={pizza.name} 
          className="w-full h-full object-cover rounded-[18px] shadow-sm"
        />
      </div>

      <div className="flex flex-col justify-between py-1 flex-1 relative z-10">
        <div>
          <h3 className="font-bold text-slate-900 text-[17px] leading-tight tracking-tight">{pizza.name}</h3>
          <p className="text-slate-500 text-[13px] mt-1.5 leading-[1.3] line-clamp-2">{pizza.description}</p>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <span className="font-black text-slate-900 text-[15px]">
            {pizza.price.toLocaleString()} <span className="text-[11px] font-bold text-slate-400 uppercase">UZS</span>
          </span>
          
          <AnimatePresence mode="wait">
            {cartItem && cartItem.quantity > 0 ? (
              <motion.div 
                key="counter"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2.5 bg-slate-50 rounded-full p-1 border border-slate-100/80"
              >
                <button 
                  onClick={() => removeItem(pizza.id)} 
                  className="w-[28px] h-[28px] flex items-center justify-center bg-white rounded-full shadow-sm text-slate-600 active:scale-90 transition-all hover:text-orange-500"
                >
                  <Minus size={14} strokeWidth={3} />
                </button>
                <span className="text-[13px] font-bold w-3 text-center text-slate-800">{cartItem.quantity}</span>
                <button 
                  onClick={() => addItem(pizza)} 
                  className="w-[28px] h-[28px] flex items-center justify-center bg-[#FF5E00] rounded-full shadow-md shadow-orange-500/30 text-white active:scale-90 transition-all"
                >
                  <Plus size={14} strokeWidth={3} />
                </button>
              </motion.div>
            ) : (
              <motion.button 
                key="add"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => addItem(pizza)}
                className="bg-slate-900 text-white p-2.5 rounded-full shadow-md shadow-black/10 active:scale-90 transition-all hover:bg-[#FF5E00] hover:shadow-orange-500/30"
              >
                <Plus size={18} strokeWidth={3} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
