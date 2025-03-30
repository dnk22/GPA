export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  border: string;
  sidebar: string;
  header: string;
  card: string;
}

export interface ThemeConfig {
  light: ThemeColors;
  dark: ThemeColors;
}

export const themeConfig: ThemeConfig = {
  light: {
    background: '#f5f5f5',
    text: '#111827',
    primary: '#3b82f6',
    secondary: '#6b7280',
    border: '#e5e7eb',
    sidebar: '#ffffff',
    header: '#ffffff',
    card: '#ffffff',
  },
  dark: {
    background: '#1f2937',
    text: '#f9fafb',
    primary: '#60a5fa',
    secondary: '#9ca3af',
    border: '#374151',
    sidebar: '#111827',
    header: '#111827',
    card: '#1f2937',
  },
}; 