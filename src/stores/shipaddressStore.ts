import { create } from "zustand";

interface ShipAddressStore {
  alias: string;
  country: string;
  city: string;
  postalCode: string;
  details: string;
}

interface ExtendedShipAddressStore extends ShipAddressStore {
  shipAddressData: ShipAddressStore;
  setShipAddressData: (data: Partial<ShipAddressStore>) => void; // Corrected the naming
}

const useShipAddressStore = create<ExtendedShipAddressStore>((set) => ({
  alias: "",
  country: "",
  city: "",
  postalCode: "",
  details: "",
  shipAddressData: {
    alias: "",
    country: "",
    city: "",
    postalCode: "",
    details: "",
  },
  setShipAddressData: (data) => set((state) => ({ ...state, ...data })), // Corrected the naming
}));

export default useShipAddressStore; // Corrected the naming
