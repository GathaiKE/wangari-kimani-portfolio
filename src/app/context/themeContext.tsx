"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const ThemeContext = createContext<{darkMode:boolean, toggleTheme:()=> void}>({darkMode:true, toggleTheme:()=> null });

export const ThemeProvider = ({ children }:{children: ReactNode}) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference or saved preference
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches && 
                  localStorage.getItem('darkMode') !== 'false');
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    // Update class and localStorage when darkMode changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);