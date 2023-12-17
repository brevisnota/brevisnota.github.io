import { Grid, TextField, Button, Tooltip } from "@mui/material";
import React, { FC, useContext, Fragment, useState } from "react";
import { LanguageContext } from "../contexts/language-context";
import { PasswordContext } from "../contexts/password-context";
import { MessageContext } from "../contexts/message-context";
import { useMediaQuery } from "../hooks/use-media-query";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";
import { useNotification } from "../hooks/use-notification";

export const EncryptMessage: FC = () => {
  const { l } = useContext(LanguageContext);
  const { password } = useContext(PasswordContext);
  const { encrypt, encryptedMessageOut: messageOut } =
    useContext(MessageContext);

  const { isLessThanSmScreen } = useMediaQuery();
  const { copy } = useCopyToClipboard();
  const { showMessage } = useNotification();

  const [messageIn, setMessageIn] = useState("");

  const canCopy = password && messageOut;

  const onEncryptClick = () => {
    if (!messageIn) {
      return;
    }

    encrypt(messageIn).catch(() => showMessage(l.text.encryptError));
  };

  const onMessageOutClick = () => {
    if (!canCopy) return;

    copy({ content: messageOut });
  };

  return (
    <Fragment>
      <Grid item xs={12}>
        <TextField
          label={l.labels.encryptMessage}
          variant="outlined"
          onChange={(e) => setMessageIn(e.target.value)}
          value={messageIn}
          multiline
          fullWidth
          maxRows={6}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onEncryptClick} fullWidth disabled={!messageIn}>
          {l.actions.encrypt}
        </Button>
      </Grid>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={12}>
          <Tooltip
            title={l.text.copy}
            enterDelay={messageOut ? 100 : 100000}
            placement="top"
            onClick={onMessageOutClick}
          >
            <TextField
              value={messageOut}
              InputProps={{ readOnly: true }}
              multiline
              rows={6}
              label={l.labels.encryptedMessage}
              sx={{
                textarea: {
                  cursor: messageOut ? "pointer" : "default",
                },
              }}
              fullWidth
            />
          </Tooltip>
        </Grid>

        {isLessThanSmScreen ? (
          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={onMessageOutClick}
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
