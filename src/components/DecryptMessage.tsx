import { Grid, TextField, Button, Tooltip } from "@mui/material";
import React, { FC, useState, useContext, Fragment } from "react";
import { LanguageContext } from "../contexts/language-context";
import { MessageContext } from "../contexts/message-context";
import { PasswordContext } from "../contexts/password-context";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";
import { useMediaQuery } from "../hooks/use-media-query";
import { useNotification } from "../hooks/use-notification";
import { useShareEncrypted } from "../hooks/use-share-encrypted";

export const DecryptMessage: FC = () => {
  const { l } = useContext(LanguageContext);
  const { messageOut, decrypt } = useContext(MessageContext);
  const { password } = useContext(PasswordContext);

  const { showMessage } = useNotification();
  const { isLessThanSmScreen } = useMediaQuery();
  const { copy } = useCopyToClipboard();
  const { encryptedMessageIn } = useShareEncrypted();

  const [encryptedMessage, setEncryptedMessage] = useState(
    encryptedMessageIn ?? ""
  );

  const canCopy = encryptedMessage && messageOut && password;

  const onDecryptClick = () => {
    decrypt(encryptedMessage).catch(() => showMessage(l.text.decryptError));
  };

  const onCopyClick = () => {
    if (!canCopy) return;

    copy({ content: messageOut });
  };

  return (
    <Fragment>
      <Grid item xs={12}>
        <TextField
          label={l.labels.decryptMessage}
          variant="outlined"
          onChange={(e) => setEncryptedMessage(e.target.value)}
          value={encryptedMessage}
          multiline
          fullWidth
          maxRows={6}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={onDecryptClick}
          fullWidth
          disabled={!encryptedMessage}
        >
          {l.actions.decrypt}
        </Button>
      </Grid>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={12}>
          <Tooltip
            title={l.text.copy}
            enterDelay={messageOut ? 100 : 100000}
            placement="top"
            onClick={onCopyClick}
          >
            <TextField
              value={messageOut}
              InputProps={{ readOnly: true }}
              multiline
              rows={6}
              label={l.labels.decryptedMessage}
              sx={{
                textarea: { cursor: messageOut ? "pointer" : "default" },
              }}
              fullWidth
            />
          </Tooltip>
        </Grid>

        {isLessThanSmScreen ? (
          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={onCopyClick}
              sx={{ height: "100%" }}
              fullWidth
              disabled={!canCopy}
            >
              {l.actions.copy}
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </Fragment>
  );
};
