'use client';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useTelegram } from '@/hooks/useTelegram';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { sendData, close } = useTelegram();
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const total = getTotalPrice();

  const handleCheckout = () => {
    if (!name || !phone) {
      alert("Iltimos ism va telefon raqamingizni kiriting!");
      return;
    }

    const orderData = {
      name,
      phone,
      cart: items,
      total
    };

    sendData(orderData);
    clearCart();
    close();
  };

  if (items.length === 0) {
    return (
      <div className="p-6 text-center mt-20">
        <h2 className="text-xl font-bold mb-4">Savatingiz bo'sh</h2>
        <button 
          onClick={() => router.push('/')}
          className="bg-black text-white px-6 py-2 rounded-xl"
        >
          Menyuga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-6 mt-2">
        <button onClick={() => router.back()} className="text-xl mr-3 font-bold">&larr;</button>
        <h1 className="text-2xl font-bold">Rasmiylashtirish</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <h2 className="font-bold text-lg mb-3 border-b pb-2">Buyurtmangiz</h2>
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center py-2 text-sm">
            <span>{item.quantity}x {item.name}</span>
            <span className="font-medium">{(item.price * item.quantity).toLocaleString()} so'm</span>
          </div>
        ))}
        <div className="flex justify-between items-center pt-3 mt-2 border-t font-bold text-lg">
          <span>Jami:</span>
          <span>{total.toLocaleString()} so'm</span>
        </div>
      </div>

      <div className="space-y-4 mb-24">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Ismingiz</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ali Valiyev"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Telefon raqamingiz</label>
          <input 
            type="tel" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+998 90 123 45 67"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-md mx-auto">
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3 rounded-xl font-bold shadow-md"
        >
          Buyurtmani tasdiqlash
        </button>
      </div>
    </div>
  );
}
