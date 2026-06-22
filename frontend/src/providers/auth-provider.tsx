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

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (
    token: string
  ) => void;

  logout: () => void;
};

const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);

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

  useEffect(() => {

    const token =
      getToken();

    setIsAuthenticated(
      !!token
    );

    setIsLoading(
      false
    );

  }, []);

  const login = (
    token: string
  ) => {

    setToken(token);

    setIsAuthenticated(
      true
    );
  };

  const logout = () => {

    removeToken();

    setIsAuthenticated(
      false
    );
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
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
    useContext(
      AuthContext
    );

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}