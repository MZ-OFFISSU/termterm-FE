export const nicknameReg = (value: string): boolean => {
  const pattern = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9.,!?_~-]+$/;

  return pattern.test(value) || value === "";
};

export const emailReg = (value: string): boolean => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return pattern.test(value) || value === "";
}