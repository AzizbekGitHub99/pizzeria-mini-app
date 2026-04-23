'use client';
import ProductCard from '@/components/features/ProductCard';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';

const PIZZAS = [
  { id: '1', name: 'Margarita', description: 'Klassik pomidor va mozzarella pishlog\'i.', price: 45000, image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Pizza_Margherita_stu_spivack.jpg' },
  { id: '2', name: 'Peperoni', description: 'Achchiq peperoni kolbasasi va pishloq.', price: 55000, image: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Pepperoni_pizza.jpg' },
  { id: '3', name: 'Qazi pizza', description: 'Milliy ta\'m! Qazi va maxsus sous.', price: 70000, image: 'https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_1280.jpg' },
  { id: '4', name: 'Pishloqli', description: '4 xil pishloq uyg\'unligi.', price: 60000, image: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Pizza_quattro_formaggi_1.jpg' },
];

export default function Home() {
  const { getTotalPrice, getTotalCount } = useCartStore();
  const router = useRouter();

  const total = getTotalPrice();
  const count = getTotalCount();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 mt-2">Pizza Menyusi</h1>
      
      <div className="flex flex-col">
        {PIZZAS.map((pizza) => (
          <ProductCard key={pizza.id} pizza={pizza} />
        ))}
      </div>

      {count > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-md mx-auto">
          <button
            onClick={() => router.push('/cart')}
            className="w-full bg-black text-white py-3 rounded-xl font-medium shadow-md flex justify-between items-center px-5"
          >
            <span>🛒 Savatga o'tish</span>
            <span>{total.toLocaleString()} so'm</span>
          </button>
        </div>
      )}
    </div>
  );
}
