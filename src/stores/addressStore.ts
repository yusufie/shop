import {create} from "zustand";

interface AddressStore {
  alias: string;
  country: string;
  city: string;
  postalCode: string;
  details: string;
}

interface ExtendedAddressStore extends AddressStore {
  addressData: AddressStore; // Include the initial addressData property
  setAddressData: (data: Partial<AddressStore>) => void;
}

const useAddressStore = create<ExtendedAddressStore>((set) => ({
  alias: "",
  country: "",
  city: "",
  postalCode: "",
  details: "",
  addressData: {
    alias: "",
    country: "",
    city: "",
    postalCode: "",
    details: "",
  },
  setAddressData: (data) => set((state) => ({ ...state, ...data })),
}));

export default useAddressStore;
