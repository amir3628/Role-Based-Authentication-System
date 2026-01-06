import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; sessionConflict?: boolean; error?: string }>;
  loginOverride: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API responses - replace with actual API calls
const mockLogin = async (email: string, password: string, override = false): Promise<{ success: boolean; sessionConflict?: boolean; user?: User; error?: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  // Simulate session conflict (30% chance for demo)
  if (!override && Math.random() < 0.3) {
    return { success: false, sessionConflict: true };
  }

  // Simulate successful login
  const isAdmin = email.includes('admin');
  return {
    success: true,
    user: {
      id: crypto.randomUUID(),
      email,
      role: isAdmin ? 'admin' : 'user',
      name: email.split('@')[0],
    },
  };
};

const mockSignup = async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  // Simulate email already exists (20% chance for demo)
  if (Math.random() < 0.2) {
    return { success: false, error: 'An account with this email already exists' };
  }

  const isAdmin = email.includes('admin');
  return {
    success: true,
    user: {
      id: crypto.randomUUID(),
      email,
      role: isAdmin ? 'admin' : 'user',
      name: email.split('@')[0],
    },
  };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await mockLogin(email, password);
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem('auth_token', 'mock_jwt_token');
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginOverride = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await mockLogin(email, password, true);
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem('auth_token', 'mock_jwt_token');
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await mockSignup(email, password);
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem('auth_token', 'mock_jwt_token');
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null);
      localStorage.removeItem('auth_token');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginOverride,
        signup,
        logout,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
