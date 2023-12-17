import { useContext } from "react";
import { LanguageContext } from "../contexts/language-context";
import { copyToClipboard } from "../utils/clipboard";
import { useNotification } from "./use-notification";

export const useCopyToClipboard = () => {
  const { showMessage } = useNotification();
  const { l } = useContext(LanguageContext);

  const copy = ({
    content,
    message,
  }: {
    content: string;
    message?: string;
  }) => {
    if (!content) return;

    copyToClipboard(content);
    const m = message ?? l.text.copied;
    showMessage(m);
  };

  return {
    copy,
  };
};
