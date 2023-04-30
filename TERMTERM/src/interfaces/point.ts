export interface PointHistory {
  date: string; //e.g. 2023.11.23 YYYY-MM-DD
  details: Array<PointInfo>; //아래 PointInfo 객체의 배열
}

export interface PointInfo {
  desc: string; //e.g. 큐레이션 용어 더보기 <- 와 같이 어디에 사용했는지 / 어디서 얻었는지에 대한 내용
  amount: number; //e.g. 50 / -50 <- 음수 양수 있음
}
