"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

// Create a context with 'light' as the default value
const ThemeContext = createContext();

const getLocalStorageValue = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  // Fallback for server-side
  return null;
};

export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    const savedTheme = getLocalStorageValue("theme");
    if (savedTheme) {
      return savedTheme;
    } else {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
