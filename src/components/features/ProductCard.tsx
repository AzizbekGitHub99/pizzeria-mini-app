'use client';
import { Pizza, useCartStore } from '@/store/cartStore';

export default function ProductCard({ pizza }: { pizza: Pizza }) {
  const { items, addItem, removeItem } = useCartStore();
  const cartItem = items.find((i) => i.id === pizza.id);

  return (
    <div className="flex bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
      <div className="w-1/3">
        <img src={pizza.image} alt={pizza.name} className="w-full h-full object-cover" />
      </div>
      <div className="w-2/3 p-3 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg leading-tight">{pizza.name}</h3>
          <p className="text-gray-500 text-xs mt-1 leading-snug">{pizza.description}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold text-sm">{pizza.price.toLocaleString()} so'm</span>
          
          {cartItem && cartItem.quantity > 0 ? (
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2 py-1">
              <button 
                onClick={() => removeItem(pizza.id)} 
                className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-black"
              >
                -
              </button>
              <span className="text-sm font-medium">{cartItem.quantity}</span>
              <button 
                onClick={() => addItem(pizza)} 
                className="w-6 h-6 flex items-center justify-center bg-black rounded-full shadow-sm text-white"
              >
                +
              </button>
            </div>
          ) : (
            <button 
              onClick={() => addItem(pizza)}
              className="bg-black text-white px-3 py-1.5 rounded-full text-xs font-medium"
            >
              Qo'shish (+)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
