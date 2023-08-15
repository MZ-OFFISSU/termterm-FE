export const booleanConverter = (value: string | null): boolean => {
  if (value && value == "YES") return true;
  return false;
};
