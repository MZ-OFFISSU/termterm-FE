export interface quizReviewProps {
  id: number;
  answer: boolean; /** 정답 여부 */
  wordAnswer: string; /** 실제 정답 */
  userAnswer: string; /** 유저가 선택한 정답 */
  onPress?: () => void; /** 클릭 시 이동 경로 */
}