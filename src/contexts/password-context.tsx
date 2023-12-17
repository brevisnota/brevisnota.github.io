import React, { createContext, FC, useState } from "react";
import { BaseProviderProps } from "../interfaces/BaseProviderProps";

const PASSPHRASE_STORAGE_KEY = "pass";

const savedPassword = localStorage.getItem(PASSPHRASE_STORAGE_KEY) ?? "";

export const PasswordContext = createContext({
  password: "",
  setPassword: (p: string) => {},
  savePassword: () => {},
});

export const PasswordContextProvider: FC<BaseProviderProps> = ({
  children,
}) => {
  const [password, setPassword] = useState(savedPassword);

  const savePassword = () => {
    localStorage.setItem(PASSPHRASE_STORAGE_KEY, password);
  };

  return (
    <PasswordContext.Provider value={{ password, setPassword, savePassword }}>
      {children}
    </PasswordContext.Provider>
  );
};
