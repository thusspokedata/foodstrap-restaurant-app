import { create } from 'zustand';
import { persist } from 'zustand/middleware';

let store = (set) => ({
  tables: [],
  setTables: (tables) => set({ tables }),
  clientId: null, // mover la definición del clientId aquí
  setClientId: (clientId) => set({ clientId }),
  orders: {}, // guarda las órdenes en un objeto con las mesas como claves
  addOrder: (table, order) =>
    set((state) => ({
      orders: { ...state.orders, [table]: order },
    })),
  updateOrder: (table, order) =>
    set((state) => ({
      orders: { ...state.orders, [table]: order },
    })),
  closeOrder: (table) =>
    set((state) => {
      const { [table]: _, ...otherOrders } = state.orders;
      return { orders: otherOrders };
    }),
});

store = persist(store, {
  name: 'table-storage',
  getStorage: () => localStorage,
});

const useStore = create(store);

export default useStore;
