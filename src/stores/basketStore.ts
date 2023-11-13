import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type BasketStore = {
  items: any[];
  addedItemCounts: { [key: string]: number };
  addItem: (item: any) => void;
  removeItem: (itemId: number, decrementOnly: boolean) => void;
};

const useBasketStore = create<BasketStore>(
  persist(
    (set) => ({
      items: [],
      addedItemCounts: {},
      addItem: (item: any) => {
        set((state: BasketStore) => {
          const isItemInList = state.items.some((i) => i._id === item._id);
          if (isItemInList) {
            const updatedCounts = {
              ...state.addedItemCounts,
              [item._id]: (state.addedItemCounts[item._id] || 0) + 1,
            };
            return { items: state.items, addedItemCounts: updatedCounts };
          } else {
            const updatedItems = [...state.items, item];
            const updatedCounts = {
              ...state.addedItemCounts,
              [item._id]: (state.addedItemCounts[item._id] || 0) + 1,
            };
            return { items: updatedItems, addedItemCounts: updatedCounts };
          }
        });
      },
      removeItem: (itemId: number, decrementOnly: boolean) =>
        set((state: BasketStore) => {
          if (decrementOnly && state.addedItemCounts[itemId] > 1) {
            const updatedCounts = {
              ...state.addedItemCounts,
              [itemId]: state.addedItemCounts[itemId] - 1,
            };
            return { items: state.items, addedItemCounts: updatedCounts };
          } else {
            const updatedItems = state.items.filter(
              (item: any) => item._id !== itemId
            );
            const updatedCounts = { ...state.addedItemCounts };
            delete updatedCounts[itemId];
            return { items: updatedItems, addedItemCounts: updatedCounts };
          }
        }),
    }),
    {
      name: 'basket-storage', // name for the storage
    }
  ) as any
);

export default useBasketStore;
