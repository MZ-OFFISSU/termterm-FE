declare module "Inquiry" {
  enum InquiryType {
    /**이용 문의 */
    USE = "USE",
    /**로그인/ 회원가입 문의 */
    AUTH = "AUTH",
    /**서비스 불편/ 오류제보 */
    REPORT = "REPORT",
    /**서비스 제안 */
    SUGGESTION = "SUGGESTION",
    /**기타 문의 */
    OTHER = "OTHER",
  }

  export type InquiryContent = {
    content: string;
    email: string;
    type: InquiryType;
  };
}
