// dependencies and hooks
import React, { useContext, useState } from "react";

type ThemeType = "light" | "dark";
type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};
type ChildrenType = {
  children: React.ReactNode;
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

const ThemeProvider = ({ children }: ChildrenType) => {
  const [theme, setTheme] = useState<ThemeType>("dark");

  const toggleTheme = (): void => {
    setTheme((prev: ThemeType): ThemeType => {
      return prev === "dark" ? "light" : "dark";
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useThemeContext };
