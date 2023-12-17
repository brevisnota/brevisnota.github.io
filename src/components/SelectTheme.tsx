import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { FC, useContext } from "react";
import { LanguageContext } from "../contexts/language-context";
import { ThemeContext } from "../contexts/theme-context";

export const SelectTheme: FC = () => {
  const { options, mode, changeMode } = useContext(ThemeContext);
  const { l } = useContext(LanguageContext);

  return (
    <FormControl fullWidth>
      <InputLabel id="theme-select">{l.labels.theme}</InputLabel>
      <Select
        labelId="theme-select"
        value={mode}
        onChange={(e) => changeMode(e.target.value as typeof mode)}
      >
        {options.map((l) => (
          <MenuItem key={l} value={l}>
            {l}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
