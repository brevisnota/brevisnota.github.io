import { useContext } from "react";
import { MessageContext } from "../contexts/message-context";

const ENCRYPTED_MESSAGE_IN_QUERY_KEY = "em";

const queryParams = new URLSearchParams(window.location.search);

const generateLink = (params: Record<string, string>): string => {
  return [window.origin, "?", new URLSearchParams(params).toString()].join("");
};

export const useShareEncrypted = () => {
  const { encryptedMessageOut } = useContext(MessageContext);

  return {
    encryptedMessageIn: queryParams.get(ENCRYPTED_MESSAGE_IN_QUERY_KEY),
    generateLink: () => {
      if (!encryptedMessageOut) return "";

      return generateLink({
        [ENCRYPTED_MESSAGE_IN_QUERY_KEY]: encryptedMessageOut,
      });
    },
  };
};
