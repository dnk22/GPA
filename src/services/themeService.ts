import { ThemeMode } from '@/utility/styles';

const THEME_KEY = 'gpa-theme-mode';

class ThemeService {
  /**
   * Lấy chế độ theme từ localStorage
   * @returns ThemeMode ('light' hoặc 'dark')
   */
  getThemeMode(): ThemeMode {
    // Lấy giá trị từ localStorage hoặc dùng prefersDarkMode từ system
    const savedTheme = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    
    if (savedTheme) {
      return savedTheme;
    }
    
    // Nếu không có giá trị trong localStorage, kiểm tra system preference
    return this.getSystemThemePreference();
  }

  /**
   * Lưu chế độ theme vào localStorage
   * @param mode 'light' hoặc 'dark'
   */
  saveThemeMode(mode: ThemeMode): void {
    localStorage.setItem(THEME_KEY, mode);
  }

  /**
   * Thay đổi theme và lưu vào localStorage
   */
  toggleTheme(): ThemeMode {
    const currentTheme = this.getThemeMode();
    const newTheme: ThemeMode = currentTheme === 'light' ? 'dark' : 'light';
    this.saveThemeMode(newTheme);
    return newTheme;
  }

  /**
   * Lấy chế độ theme mặc định từ system
   */
  private getSystemThemePreference(): ThemeMode {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

// Export singleton instance
export const themeService = new ThemeService(); 