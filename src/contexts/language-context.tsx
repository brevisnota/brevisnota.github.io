import React, { createContext, FC, useMemo, useState } from "react";
import { BaseProviderProps } from "../interfaces/BaseProviderProps";
import { l10n, Language } from "../l10n";

const LANGUAGE_STORAGE_KEY = "__lang";

const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;

const guessLanguage = (): Language => {
  const userLanguage = navigator.language;
  const guessedLanguage = Object.entries(Language).find(([key, value]) => {
    return userLanguage.includes(value);
  });

  if (guessedLanguage) {
    guessedLanguage[0] as unknown as Language;
  }

  return Language.En;
};
const options = Object.values(Language);

const notValidatedLanguage = savedLanguage ?? guessLanguage();
const defaultLanguage = options.includes(notValidatedLanguage)
  ? notValidatedLanguage
  : Language.En;

export const LanguageContext = createContext({
  selected: defaultLanguage,
  update: (v: Language) => {},
  l: l10n[defaultLanguage],
  options,
});

export const LanguageContextProvider: FC<BaseProviderProps> = ({
  children,
}) => {
  const [selected, setSelected] = useState(defaultLanguage);

  const update = (newLanguage: Language) => {
    setSelected(newLanguage);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
  };

  const l = useMemo(() => l10n[selected], [selected]);

  return (
    <LanguageContext.Provider value={{ selected, update, options, l }}>
      {children}
    </LanguageContext.Provider>
  );
};
