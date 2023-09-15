export const copy = (message: string) => {
  return navigator.clipboard.writeText(message);
};
