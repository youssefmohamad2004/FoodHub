import React, { createContext, useContext, useEffect, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";
const C = createContext(null);
export const useTheme = () => useContext(C);
export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => readStorage("foodhub_theme", false));
  useEffect(() => {
    writeStorage("foodhub_theme", dark);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);
  return (
    <C.Provider value={{ dark, toggle: () => setDark((v) => !v) }}>
      {children}
    </C.Provider>
  );
}
