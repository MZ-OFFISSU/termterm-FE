export const divideTerm = (fullName: string) => {
  const match = fullName.match(/(.*?)\s+::\s+(.*)/);
  if (match && match.length > 2) {
    return [match[1].trim(), match[2].trim()];
  }

  return [fullName];
};
