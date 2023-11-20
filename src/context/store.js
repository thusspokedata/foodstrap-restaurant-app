import { create } from 'zustand';
import { persist } from 'zustand/middleware';

let store = (set) => ({
  tables: [],
  setTables: (tables) => set({ tables }),
  clientId: null,
  clientIds: [],
  clientIdExists: false,
  addClientId: (clientId) =>
    set((state) => {
      const isClientIdPresent = state.clientIds.includes(clientId);
      if (!isClientIdPresent) {
        return { clientIds: [...state.clientIds, clientId] };
      } else {
        return { ...state, clientIdExists: true };
      }
    }),
  tableAssignments: {},
  assignTable: (tableId, clientId) =>
    set((state) => ({
      tableAssignments: { ...state.tableAssignments, [tableId]: clientId },
    })),
  orders: {},
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
