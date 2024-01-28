import { create } from "zustand";

type SearchStore = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resetSearchQuery: () => void;
};

export const useStore = create<SearchStore>((set) => ({
  searchQuery: "",
  setSearchQuery: (query: string) =>
    set((state) => ({ ...state, searchQuery: query })),
    resetSearchQuery: () => set({ searchQuery: "" }),
}));