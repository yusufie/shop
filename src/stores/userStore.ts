import create from "zustand";
import {jwtDecode} from "jwt-decode";

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

const hasTokenExpired = (token: string | null) => {
  if (!token) {
    console.log("Token is null or undefined.");
    return true;
  }

  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    const isExpired = decoded.exp * 1000 < Date.now();
    return isExpired;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

export const useUserStore = create<UserState>((set) => {
  let intervalId: NodeJS.Timeout;

  const setLoggedOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    set({ accessToken: null, refreshToken: null, user: null, isLoggedIn: false });
    clearInterval(intervalId);
  };

  const checkTokenExpiration = () => {
    if (hasTokenExpired(localStorage.getItem("accessToken"))) {
      setLoggedOut();
    }
  };

  if (typeof window !== "undefined") {
    intervalId = setInterval(checkTokenExpiration, 60000); // Check every minute
    checkTokenExpiration(); // Initial token check
  }

  return {
    accessToken: null,
    refreshToken: null,
    user: null,
    isLoggedIn: false,
    setLoggedIn: (accessToken, refreshToken, user) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      set({ accessToken, refreshToken, user, isLoggedIn: true });
    },
    setLoggedOut,
  };
});
