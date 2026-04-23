import { create } from 'zustand';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem extends Pizza {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (pizza: Pizza) => void;
  removeItem: (pizzaId: string) => void;
  getTotalPrice: () => number;
  getTotalCount: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (pizza) => {
    const items = get().items;
    const existing = items.find((i) => i.id === pizza.id);
    if (existing) {
      set({ items: items.map(i => i.id === pizza.id ? { ...i, quantity: i.quantity + 1 } : i) });
    } else {
      set({ items: [...items, { ...pizza, quantity: 1 }] });
    }
  },
  removeItem: (pizzaId) => {
    const items = get().items;
    const existing = items.find((i) => i.id === pizzaId);
    if (existing && existing.quantity > 1) {
      set({ items: items.map(i => i.id === pizzaId ? { ...i, quantity: i.quantity - 1 } : i) });
    } else {
      set({ items: items.filter(i => i.id !== pizzaId) });
    }
  },
  getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
  getTotalCount: () => get().items.reduce((total, item) => total + item.quantity, 0),
  clearCart: () => set({ items: [] }),
}));
