"use client";
import { getAuthToken, removeAuthToken } from "@/lib/services/handlecookies";
import { useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  token: string;
  isLoggedIn: boolean;
  user: unknown;
  handleLogout: () => void;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  token: "",
  isLoggedIn: false,
  handleLogout: () => {},
  user: null,
  setToken: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(getAuthToken() || "");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<unknown>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setIsLoggedIn(true);
      } catch (err) {
        console.error(err || "Invalid token");
        setUser(null);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, [token]);

  const handleLogout = () => {
    setToken("");
    setUser(null);
    removeAuthToken();
    signOut({ redirect: false });
    router.replace("/auth/login");
    queryClient.clear();
    setIsLoggedIn(false);
  };

  const value = {
    token,
    isLoggedIn,
    handleLogout,
    user,
    setUser,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUserAuth = () => useContext(AuthContext);
export default AuthContextProvider;
