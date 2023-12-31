export enum Language {
  En = "en",
  Ua = "ua",
}

type ActionKeys =
  | "encrypt"
  | "decrypt"
  | "generate"
  | "copy"
  | "share"
  | "savePass";

type LabelKeys =
  | "encryptMessage"
  | "decryptMessage"
  | "generate"
  | "pass"
  | "encryptedMessage"
  | "decryptedMessage"
  | "language"
  | "theme";

type TextKeys =
  | "encryptError"
  | "decryptError"
  | "copy"
  | "copied"
  | "savedPass";

type Translation = {
  actions: Record<ActionKeys, string>;
  labels: Record<LabelKeys, string>;
  text: Record<TextKeys, string>;
};

export const l10n: Record<Language, Translation> = {
  [Language.En]: {
    actions: {
      encrypt: "Encrypt",
      decrypt: "Decrypt",
      generate: "Generate new",
      copy: "Copy",
      share: "Share encrypted message link",
      savePass: "Save pass",
    },
    labels: {
      language: "Language",
      encryptMessage: "Message (you want to encrypt)",
      decryptMessage: "Message (you want to decrypt)",
      generate: "Generated key",
      pass: "Passphrase",
      encryptedMessage: "Encrypted Message",
      decryptedMessage: "Decrypted Message",
      theme: "Theme",
    },
    text: {
      encryptError: "Cannot encrypt message, check your passphrase",
      decryptError:
        "Cannot decrypt message, check your passphrase or encrypted message",
      copy: "Click to copy",
      copied: "Copied!",
      savedPass:
        "Saved pass! It will be filled in Passphrase field after page refresh.",
    },
  },
  [Language.Ua]: {
    actions: {
      encrypt: "Зашифрувати",
      decrypt: "Розшифрувати",
      generate: "Згенерувати новий",
      copy: "Копіювати",
      share: "Поділитись зашифрованим меседжем",
      savePass: "Зберегти пароль",
    },
    labels: {
      language: "Мова",
      encryptMessage: "Меседж (що треба зашифрувати)",
      decryptMessage: "Меседж (що треба розшифрувати)",
      generate: "Згенерований пароль",
      pass: "Пароль",
      encryptedMessage: "Зашифрований меседж",
      decryptedMessage: "Розшифрований меседж",
      theme: "Тема",
    },
    text: {
      encryptError: "Не вдалось зашифрувати, перевірте Пароль",
      decryptError:
        "Не вдалось розшифрувати, перевірте Пароль чи Зашифрований меседж",
      copy: "Натисність щоб скопіювати",
      copied: "Скопійовано!",
      savedPass:
        "Пароль збережено! Він буде автоматично заповнений при новому вході на сайт.",
    },
  },
};
