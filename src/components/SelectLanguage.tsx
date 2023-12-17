import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { FC, useContext } from "react";
import { LanguageContext } from "../contexts/language-context";
import { Language } from "../l10n";

export const SelectLanguage: FC = () => {
  const { selected, l, options, update } = useContext(LanguageContext);

  return (
    <FormControl fullWidth>
      <InputLabel id="language-select">{l.labels.language}</InputLabel>
      <Select
        labelId="language-select"
        value={selected}
        onChange={(e) => update(e.target.value as unknown as Language)}
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
