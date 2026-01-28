import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getProfile, logout as apiLogout } from "../api/authApi";

interface User {
  name: string;
  surname: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loginUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const loginUser = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      setUser(null);
    }
  };

  const logoutUser = async () => {
    try {
      await apiLogout();
      setUser(null);
    } catch (error) {
      console.error("Ошибка при выходе", error);
    }
  };

  useEffect(() => {
    loginUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
