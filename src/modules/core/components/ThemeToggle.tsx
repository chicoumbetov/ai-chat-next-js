'use client';
import { useTheme } from '../providers/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
    >
      {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
    </button>
  );
}
