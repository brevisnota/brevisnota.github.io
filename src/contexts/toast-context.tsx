import { Snackbar } from "@mui/material";
import React, { createContext, FC, useState } from "react";
import { BaseProviderProps } from "../interfaces/BaseProviderProps";

export const ToastContext = createContext({
  open: (_: { message: string }) => {},
});

export const ToastContextProvider: FC<BaseProviderProps> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const open = ({ message: newMessage }: { message: string }) => {
    setOpen(true);
    setMessage(newMessage);
  };

  const onClose = () => {
    setOpen(false);
    setMessage("");
  };

  return (
    <ToastContext.Provider value={{ open }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isOpen}
        message={message}
        autoHideDuration={3000}
        onClose={onClose}
      />
    </ToastContext.Provider>
  );
};
