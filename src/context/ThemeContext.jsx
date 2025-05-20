import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const themes = {
  light: {
    '--background': '#fff',
    '--color': '#000',
  },
  dark: {
    '--background': '#121212',
    '--color': '#fff',
  },
  solarized: {
    '--background': '#fdf6e3',
    '--color': '#657b83',
  },
  highContrast: {
    '--background': '#000',
    '--color': '#ff0',
  }
};

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState("light");

  useEffect(() => {
    const theme = themes[themeName];
    // Tüm CSS değişkenlerini body elementine uygula
    for (const key in theme) {
      document.body.style.setProperty(key, theme[key]);
    }
  }, [themeName]);

  const changeTheme = (name) => {
    if (themes[name]) {
      setThemeName(name);
    }
  };

  return (
    <ThemeContext.Provider value={{ themeName, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
