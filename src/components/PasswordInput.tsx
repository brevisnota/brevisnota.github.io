import { TextField } from "@mui/material";
import React, { FC, useContext } from "react";
import { LanguageContext } from "../contexts/language-context";
import { PasswordContext } from "../contexts/password-context";

export const PasswordInput: FC = () => {
  const { password, setPassword } = useContext(PasswordContext);
  const { l } = useContext(LanguageContext);

  return (
    <TextField
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      label={l.labels.pass}
      fullWidth
    />
  );
};
