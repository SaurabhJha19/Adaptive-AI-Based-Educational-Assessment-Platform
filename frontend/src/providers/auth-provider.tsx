"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getToken,
  removeToken,
  setToken,
} from "@/lib/auth";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobile?: string;
  targetExam: string;
  role: "user" | "admin";
}

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;

  login: (
    token: string,
    user: AuthUser
  ) => void;

  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    isAuthenticated,
    setIsAuthenticated,
  ] = useState(false);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    user,
    setUser,
  ] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = getToken();

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(
        JSON.parse(storedUser)
      );
    }

    setIsAuthenticated(!!token);

    setIsLoading(false);
  }, []);

  const login = (
    token: string,
    user: AuthUser
  ) => {

    setToken(token);

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setUser(user);

    setIsAuthenticated(true);
  };

  const logout = () => {

    removeToken();

    localStorage.removeItem("user");

    setUser(null);

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }

  return context;
}