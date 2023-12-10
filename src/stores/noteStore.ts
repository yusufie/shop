// noteStore.ts
import { create } from "zustand";

interface NoteStore {
  orderNote: string;
  setOrderNote: (note: string) => void;
}

const useNoteStore = create<NoteStore>((set) => ({
  orderNote: "",
  setOrderNote: (note) => set({ orderNote: note }),
}));

export default useNoteStore;
