'use client';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useTelegram } from '@/hooks/useTelegram';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Phone, ShoppingBag, CheckCircle2 } from 'lucide-react';

export default function Cart() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { sendData, close } = useTelegram();
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = getTotalPrice();

  const handleCheckout = () => {
    if (!name || !phone) {
      alert("Iltimos, ism va telefon raqamingizni kiriting!");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate slight delay for better UX
    setTimeout(() => {
      const orderData = {
        name,
        phone,
        cart: items,
        total
      };

      sendData(orderData);
      clearCart();
      close();
    }, 600);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-orange-400">
          <ShoppingBag size={40} strokeWidth={1.5} />
        </div>
        <h2 className="text-[22px] font-black text-slate-900 mb-2">Savatingiz bo'sh</h2>
        <p className="text-slate-500 mb-8 max-w-[250px]">Hali hech qanday pizza tanlamadingiz, menyuga qaytib buyurtma bering.</p>
        <button 
          onClick={() => router.push('/')}
          className="bg-slate-900 text-white px-8 py-3.5 rounded-[18px] font-semibold active:scale-95 transition-all shadow-lg shadow-black/10"
        >
          Menyuga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-white px-5 pt-8 pb-5 sticky top-0 z-20 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-full active:scale-90 transition-all text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Rasmiylashtirish</h1>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-6">
        {/* Order Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[24px] p-5 shadow-[0_2px_20px_rgb(0,0,0,0.03)] border border-slate-100"
        >
          <h2 className="font-bold text-slate-800 text-[16px] mb-4 flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#FF5E00]" /> 
            Buyurtmangiz
          </h2>
          
          <div className="space-y-3 mb-4">
            {items.map((item, i) => (
              <div key={item.id} className="flex justify-between items-start text-[14px]">
                <div className="flex gap-3">
                  <span className="font-bold text-slate-900 bg-slate-100 w-6 h-6 flex items-center justify-center rounded-md">{item.quantity}</span>
                  <span className="font-medium text-slate-700 mt-0.5">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900 mt-0.5">{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-dashed border-slate-200 text-lg">
            <span className="font-medium text-slate-500">Jami:</span>
            <span className="font-black text-[20px] text-slate-900">{total.toLocaleString()} <span className="text-[12px] text-slate-400 font-bold uppercase">UZS</span></span>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[24px] p-5 shadow-[0_2px_20px_rgb(0,0,0,0.03)] border border-slate-100"
        >
          <h2 className="font-bold text-slate-800 text-[16px] mb-5 flex items-center gap-2">
            <User size={18} className="text-[#FF5E00]" /> 
            Ma'lumotlaringiz
          </h2>
          
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <User size={18} />
              </div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingizni kiriting"
                className="w-full border border-slate-200 rounded-[16px] pl-11 pr-4 py-3.5 bg-slate-50 text-[15px] font-medium placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#FF5E00] focus:ring-4 focus:ring-orange-500/10 transition-all"
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Phone size={18} />
              </div>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full border border-slate-200 rounded-[16px] pl-11 pr-4 py-3.5 bg-slate-50 text-[15px] font-medium placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#FF5E00] focus:ring-4 focus:ring-orange-500/10 transition-all"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-white/0 max-w-md mx-auto z-50 pb-8">
        <button
          disabled={isSubmitting}
          onClick={handleCheckout}
          className="w-full relative overflow-hidden bg-slate-900 disabled:bg-slate-800 text-white py-4 rounded-[20px] font-bold shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex justify-center items-center transition-all active:scale-[0.98]"
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.div
                key="submitting"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Yuborilmoqda...</span>
              </motion.div>
            ) : (
              <motion.div
                key="submit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 size={20} />
                <span className="text-[17px] tracking-tight">Tasdiqlash va Yuborish</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
