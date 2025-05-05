import React, { useContext } from "react";
import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { getUserProfile } from "../services/authServices";
import { UserType } from "@/types/userType";
interface AuthContextType {
  user: UserType | null;
  isLoading: boolean;
  isError: boolean;
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const {
    data: user,
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getUserProfile,
    enabled: !!token,
  });

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    refetch();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isError,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
