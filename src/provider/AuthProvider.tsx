import React, { ReactNode, createContext, useContext } from "react";
import useAuthService from "../services/AuthService";

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<{ user: User } | null>(null);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authService = useAuthService();
  return (
    <AuthContext.Provider value={{ user: authService.user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};