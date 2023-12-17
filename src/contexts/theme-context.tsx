import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { FC, createContext, useState } from "react";
import { BaseProviderProps } from "../interfaces/BaseProviderProps";

const THEMES = {
  dark: createTheme({
    palette: {
      mode: "dark",
    },
  }),
  light: createTheme(),
};

type THEME_KEYS_TYPE = keyof typeof THEMES;

const THEME_STORAGE_KEY = "__theme";

const defaultMode =
  (localStorage.getItem(THEME_STORAGE_KEY) as THEME_KEYS_TYPE) ?? "light";

const themeOptions = Object.keys(THEMES);

export const ThemeContext = createContext({
  mode: defaultMode,
  changeMode: (_: THEME_KEYS_TYPE) => {},
  options: themeOptions,
});

export const ThemeContextProvider: FC<BaseProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<keyof typeof THEMES>(defaultMode);

  const theme = THEMES[mode];

  const changeMode = (newMode: THEME_KEYS_TYPE) => {
    if (!themeOptions.includes(newMode)) return;

    setMode(newMode);
    localStorage.setItem(THEME_STORAGE_KEY, newMode);
  };
  return (
    <ThemeContext.Provider value={{ mode, changeMode, options: themeOptions }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
