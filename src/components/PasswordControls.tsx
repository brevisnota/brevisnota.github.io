import { Grid, Button } from "@mui/material";
import React, { FC, useContext, Fragment } from "react";
import { LanguageContext } from "../contexts/language-context";
import { PasswordContext } from "../contexts/password-context";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";
import { useNotification } from "../hooks/use-notification";
import { generateKey } from "../utils/crypto";

export const PasswordControls: FC = () => {
  const { password, setPassword, savePassword } = useContext(PasswordContext);
  const { l } = useContext(LanguageContext);

  const { showMessage } = useNotification();
  const { copy } = useCopyToClipboard();

  const onCopyClick = () => {
    copy({ content: password, message: l.actions.copy });
  };

  const onGenerateClick = () => {
    generateKey().then(setPassword, (e) => console.error(e));
  };

  const onSaveClick = () => {
    savePassword();
    showMessage(l.text.savedPass);
  };

  return (
    <Fragment>
      <Grid item xs={12} sm={4}>
        <Button
          variant="outlined"
          onClick={onCopyClick}
          sx={{ height: "100%" }}
          fullWidth
          disabled={!password}
        >
          {l.actions.copy}
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          variant="outlined"
          onClick={onGenerateClick}
          sx={{ height: "100%" }}
          fullWidth
        >
          {l.actions.generate}
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          variant="outlined"
          onClick={onSaveClick}
          sx={{ height: "100%" }}
          fullWidth
          disabled={!password}
        >
          {l.actions.savePass}
        </Button>
      </Grid>
    </Fragment>
  );
};
