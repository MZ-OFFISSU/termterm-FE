import { InquiryContent } from "Inquiry";
import { post, put } from "./AxiosCreate";

class InquiryApi {
  /** 문의사항 접수 */
  postInquiry = async (inquiry: InquiryContent): Promise<string> => {
    const data = await post<string>(`/v1/inquiry`, inquiry);
    return data;
  };

  /** 문의사항 답변 완료 */
  completeInquiry = async (id: number): Promise<string> => {
    const data = await put<string>(`/v1/inquiry/to-completed/${id}`);
    return data;
  };

  /** 문의사항 대기 중 */
  waitingInquiry = async (id: number): Promise<string> => {
    const data = await put<string>(`/v1/inquiry/to-waiting/${id}`);
    return data;
  };
}

export default InquiryApi;
