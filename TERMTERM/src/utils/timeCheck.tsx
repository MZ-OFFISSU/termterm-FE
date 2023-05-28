/**
 * 현재 시간 지났는지 확인
 */
export const isTimeExpired = (timeString: string) => {
  const targetTime = new Date(timeString).getTime();
  const currentTime = new Date().getTime();

  return currentTime >= targetTime;
};
