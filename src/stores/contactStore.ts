// contactStore.ts
import { create } from "zustand";

interface ContactStore {
  contactNumber: string;

  setContactNumber: (number: string) => void;
}

const useContactStore = create<ContactStore>((set) => ({
  contactNumber: "",
  setContactNumber: (number) => set({ contactNumber: number }),
}));

export default useContactStore;
