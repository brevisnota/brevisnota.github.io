export const copyToClipboard = (content: string) => {
  window.navigator.clipboard.writeText(content);
};
