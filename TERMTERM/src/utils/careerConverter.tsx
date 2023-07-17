type Experience = {
  label: string;
  value: string;
  type: number;
};

const experiences: Experience[] = [
  { label: "신입", value: "신입", type: 0 },
  { label: "1년 미만", value: "1년 미만", type: 1 },
  { label: "1년 이상 2년 미만", value: "1년 이상 2년 미만", type: 2 },
  { label: "2년 이상 3년 미만", value: "2년 이상 3년 미만", type: 3 },
  { label: "3년 이상 4년 미만", value: "3년 이상 4년 미만", type: 4 },
  { label: "4년 이상 5년 미만", value: "4년 이상 5년 미만", type: 5 },
  { label: "5년 이상", value: "5년 이상", type: 6 },
  { label: "시니어", value: "시니어", type: 7 },
];

export const getTypeFromLabel = (label: string): number | undefined => {
  const item = experiences.find((exp) => exp.label === label);
  return item ? item.type : undefined;
};

export const getLabelFromType = (type: number): string | undefined => {
  const item = experiences.find((exp) => exp.type === type);
  return item ? item.label : undefined;
};
