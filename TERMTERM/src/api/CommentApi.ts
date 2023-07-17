import { CommentInput, Report } from "Comment";
import { post, put } from "./AxiosCreate";

class CommentApi {
  /**나만의 용어 신청 작성 후 등록 */
  registerComment = async (comment: CommentInput): Promise<string> => {
    const data = await post<string>(`/v1/comment`, comment);
    return data;
  };

  /** (관리자) 나만의 용어 신청 승인 */
  acceptComment = async (id: number): Promise<string> => {
    const data = await put<string>(`/v1/comment/accept/${id}`);
    return data;
  };

  /** 코멘트 좋아요 취소 */
  dislikeComment = async (id: number): Promise<string> => {
    const data = await put<string>(`/v1/comment/dislike/${id}`);
    return data;
  };

  /** 코멘트 좋아요 */
  likeComment = async (id: number): Promise<string> => {
    const data = await put<string>(`/v1/comment/like/${id}`);
    return data;
  };

  /** 코멘트 신고하기 */
  reportComment = async (report: Report): Promise<string> => {
    const data = await post<string>(`/v1/comment/report`, report);
    return data;
  };

  /** 코멘트 신고 승인 */
  acceptReport = async (id: number): Promise<string> => {
    const data = await put<string>(`/v1/comment/report/completed/${id}`);
    return data;
  };
}

export default CommentApi;
