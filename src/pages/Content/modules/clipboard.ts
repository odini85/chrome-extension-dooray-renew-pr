/**
 * 클립보드에 메시지를 복사합니다.
 * @param {string} message 복사될 메시지
 * @returns
 */
export const copy = (message: string) => {
  return navigator.clipboard.writeText(message);
};
