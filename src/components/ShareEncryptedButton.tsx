import { Button } from "@mui/material";
import React, { FC, useContext } from "react";
import { LanguageContext } from "../contexts/language-context";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";
import { useShareEncrypted } from "../hooks/use-share-encrypted";

export const ShareEncryptedButton: FC = () => {
  const { l } = useContext(LanguageContext);

  const { copy } = useCopyToClipboard();
  const { generateLink } = useShareEncrypted();

  const link = generateLink();

  const isDisabled = !link;

  const onClick = () => {
    if (isDisabled) return;

    copy({ content: link });
  };

  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{ height: "100%" }}
      fullWidth
      disabled={isDisabled}
    >
      {l.actions.share}
    </Button>
  );
};
