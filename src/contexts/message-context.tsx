import React, { FC, createContext, useContext, useState } from "react";
import { BaseProviderProps } from "../interfaces/BaseProviderProps";
import { decrypt, encrypt } from "../utils/crypto";
import { PasswordContext } from "./password-context";

export const MessageContext = createContext({
  encryptedMessageOut: "",
  messageOut: "",
  encrypt: async (c: string) => "",
  decrypt: async (c: string) => "",
});

export const MessageContextProvider: FC<BaseProviderProps> = ({ children }) => {
  const { password } = useContext(PasswordContext);

  const [encryptedMessageOut, setEncryptedMessageOut] = useState("");

  const [messageOut, setMessageOut] = useState("");

  const decryptMessage = (content: string) => {
    const result = decrypt({ encryptedMessage: content, rawKey: password });
    result.then(setMessageOut, (e) => console.error);
    return result;
  };

  const encryptMessage = (content: string) => {
    const result = encrypt({ content, rawKey: password });
    result.then(setEncryptedMessageOut, console.error);
    return result;
  };

  return (
    <MessageContext.Provider
      value={{
        messageOut,
        encryptedMessageOut,
        encrypt: encryptMessage,
        decrypt: decryptMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
