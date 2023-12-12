import { create } from "zustand";

interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  user: Record<string, any> | null;
  isLoggedIn: boolean;
  setLoggedIn: (
    accessToken: string,
    refreshToken: string,
    user: Record<string, any>
  ) => void;
  setLoggedOut: () => void;
}

export const useUserStore = create<UserState>((set) => {
  // Check if localStorage is available (not in SSR)
  const storedAccessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;
  const storedRefreshToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("refreshToken")
      : null;
  const storedUser =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  set({
    accessToken: storedAccessToken,
    refreshToken: storedRefreshToken,
    user: storedUser,
    isLoggedIn: storedUser !== null,
  });

  return {
    accessToken: storedAccessToken,
    refreshToken: storedRefreshToken,
    user: storedUser,
    isLoggedIn: storedUser !== null,
    setLoggedIn: (accessToken, refreshToken, user) => {
      // Check if localStorage is available (not in SSR)
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
      }

      set({ accessToken, refreshToken, user, isLoggedIn: true });
    },
    setLoggedOut: () => {
      // Check if localStorage is available (not in SSR)
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      }

      set({
        accessToken: null,
        refreshToken: null,
        user: null,
        isLoggedIn: false,
      });
    },
  };
});
