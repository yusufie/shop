import { create } from "zustand";

import { persist } from "zustand/middleware";

type LikeStore = {
  likedProducts: string[];
  toggleLikeProduct: (productId: string) => void;
  removeLikedProduct: (productId: string) => void;
};

const useLikeStore = create<LikeStore>(
  persist(
    (set) => ({
      likedProducts: [], // Store the liked products
      toggleLikeProduct: (productId: string) => {
        set((state: LikeStore) => {
          const updatedLikedProducts = state.likedProducts.includes(productId)
            ? state.likedProducts.filter((id) => id !== productId)
            : [...state.likedProducts, productId];

          return { likedProducts: updatedLikedProducts };
        });
      },
      removeLikedProduct: (productId: string) => {
        set((state: LikeStore) => ({
          likedProducts: state.likedProducts.filter((id) => id !== productId),
        }));
      },
    }),
    {
      name: "like-storage", // name for the storage
    }
  ) as any
);

export default useLikeStore;
