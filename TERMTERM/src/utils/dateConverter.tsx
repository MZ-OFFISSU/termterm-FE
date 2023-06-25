/** 인자로 들어오는 date와 현재 date를 비교하여 요약해주는 함수 */
export const dateConverter = (date: string): string => {
  const now = new Date();
  const inputDate = new Date(date);

  const seconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + "년 전";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + "달 전";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + "일 전";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + "시간 전";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + "분 전";
  }
  return Math.floor(seconds) + "초 전";
};
