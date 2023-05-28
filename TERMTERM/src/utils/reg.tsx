export const nicknameReg = (value: string): boolean => {
  const pattern = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9.,!?_~-]+$/;

  return pattern.test(value) || value === "";
};
