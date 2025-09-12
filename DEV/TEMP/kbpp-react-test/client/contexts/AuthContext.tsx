import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: "google" | "github" | "discord" | "email";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (provider: string) => void;
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("auth-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("auth-user");
      }
    }
    setLoading(false);
  }, []);

  const signIn = (provider: string) => {
    // TODO: API Integration - Authentication
    // When database is implemented, replace with actual OAuth/auth flow:
    // - Redirect to OAuth provider or handle email auth
    // - Receive user data and tokens from backend
    // - Store secure tokens in httpOnly cookies
    // - Store user data in context state

    // Temporary mock authentication for testing
    const mockUser: User = {
      id: "mock-user-123",
      email: "user@example.com",
      name: "Test User",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      provider: provider as any,
    };

    setUser(mockUser);
    localStorage.setItem("auth-user", JSON.stringify(mockUser));
    console.log(`Signed in with ${provider}`, mockUser);
  };

  const signOut = () => {
    // TODO: API Integration - Sign Out
    // When database is implemented, add API calls:
    // - POST /api/auth/signout to invalidate tokens
    // - Clear httpOnly cookies
    // - Redirect to home page

    setUser(null);
    localStorage.removeItem("auth-user");
    console.log("Signed out");
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    signIn,
    signOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
