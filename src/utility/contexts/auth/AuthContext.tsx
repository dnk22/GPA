import React, { createContext, useContext, useState, useEffect } from 'react';
import { APP_CONSTANTS } from '@/utility/constants';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password?: string) => boolean;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Kiểm tra xem người dùng đã đăng nhập chưa khi ứng dụng khởi động
  useEffect(() => {
    checkAuth();
  }, []);

  // Kiểm tra authentication
  const checkAuth = (): boolean => {
    try {
      const storedToken = localStorage.getItem(APP_CONSTANTS.AUTH_LOCAL_STORAGE_KEY);
      const isValid = storedToken === APP_CONSTANTS.ADMIN_PASSWORD;
      
      setIsAuthenticated(isValid);
      return isValid;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  };

  // Hàm đăng nhập
  const login = (password?: string): boolean => {
    try {
      const validPassword = password || APP_CONSTANTS.ADMIN_PASSWORD;
      
      if (validPassword === APP_CONSTANTS.ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        localStorage.setItem(APP_CONSTANTS.AUTH_LOCAL_STORAGE_KEY, APP_CONSTANTS.ADMIN_PASSWORD);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    try {
      setIsAuthenticated(false);
      localStorage.removeItem(APP_CONSTANTS.AUTH_LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng authentication
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 