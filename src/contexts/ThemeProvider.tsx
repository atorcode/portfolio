// dependencies and hooks
import React, { useContext, useState } from "react";

type ThemeType = "light" | "dark";
type ThemeContextType = {
  mode: ThemeType;
  setMode: React.Dispatch<React.SetStateAction<ThemeType>>;
};
type ChildrenType = {
  children: React.ReactNode;
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

const ThemeProvider = ({ children }: ChildrenType) => {
  const [mode, setMode] = useState<ThemeType>("light");
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
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
