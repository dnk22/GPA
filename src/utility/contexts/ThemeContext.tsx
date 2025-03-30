import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { themeConfig, ThemeMode, ThemeColors } from '@/utility/styles';
import { themeService } from '@/services/themeService';

interface ThemeContextType {
  themeMode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Khởi tạo themeMode từ themeService
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    // Thực hiện lazy initialization
    return themeService.getThemeMode();
  });

  // Lấy colors tương ứng với theme hiện tại
  const colors = themeConfig[themeMode];

  // Hàm toggle theme
  const toggleTheme = () => {
    const newTheme = themeService.toggleTheme();
    setThemeMode(newTheme);
  };

  // Lắng nghe thay đổi System Theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (!localStorage.getItem('gpa-theme-mode')) {
        setThemeMode(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value = {
    themeMode,
    colors,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={{ mode: themeMode, ...colors }}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook để sử dụng theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 