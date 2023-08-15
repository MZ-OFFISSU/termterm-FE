import CommentApi from "@api/CommentApi";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CommentInput, Report } from "Comment";
import { useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useThemeStyle } from "./useThemeStyle";

/** Comment 관련 API 훅 */
export const useComment = () => {
  const commentApi = new CommentApi();
  const [COLOR, mode] = useThemeStyle();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [liked, setLiked] = useState(false);

  /** 용어 설명 신청 - 성공 토스트 메시지 */
  const successCommentToast = () => {
    Toast.show({
      type: mode ? "light" : "dark",
      text1: "신청이 완료되었어요!\n검토 후 승인여부를 알려드릴게요☺️",
    });
  };

  /** 용어 설명 신청 - 실패 토스트 메시지 */
  const failedCommentToast = () => {
    Toast.show({
      type: mode ? "light" : "dark",
      text1: "용어 설명 신청을 실패했어요🥲",
    });
  };

  /** 용어 설명 신고 - 성공 토스트 메시지 */
  const successReportToast = () => {
    Toast.show({
      type: mode ? "light" : "dark",
      text1:
        "신고가 완료되었어요!\n더 좋은 경험을 제공하는 termterm이 될게요🙌🏻",
    });
  };

  const failedReportToast = () => {
    Toast.show({
      type: mode ? "light" : "dark",
      text1: "신고 요청을 실패했어요🥲",
    });
  };

  /** 용어 설명 신고 카테고리 */
  const reportCategories = [
    { label: "저작권 침해, 명예훼손", value: "COPYRIGHT" },
    { label: "개인정보 유출", value: "PERSONAL_INFORMATION" },
    { label: "광고 및 홍보성 내용", value: "ADVERTISEMENT" },
    { label: "용어와 무관한 내용", value: "IRRELEVANT_CONTENT" },
    { label: "사기 또는 거짓 정보", value: "FRAUD" },
    { label: "잘못된 정보 포함", value: "INCORRECT_CONTENT" },
    { label: "혐오 발언 또는 상징", value: "DISGUST" },
    { label: "욕설, 비방, 선정성 등 미풍양속을 해치는 내용", value: "ABUSE" },
    { label: "스팸", value: "SPAM" },
    { label: "기타", value: "OTHER" },
  ];

  /** 용어 설명 등록하기 */
  const registerComment = async (
    input: CommentInput,
    id: number
  ): Promise<boolean> => {
    try {
      const res = await commentApi.registerComment(input);
      navigation.navigate("TermsDetail", { id: id });
      successCommentToast();
      return true;
    } catch (err) {
      console.log(err);
      failedCommentToast();
      return false;
    }
  };

  /** 용어 설명 신고하기 */
  const registerReport = async (input: Report): Promise<boolean> => {
    try {
      await commentApi.reportComment(input);
      navigation.navigate("TermsDetail", { id: input.commentId });
      successReportToast();
      return true;
    } catch (err) {
      failedReportToast();
      return false;
    }
  };

  /** 용어 설명 좋아요 누르기 & 좋아요 취소하기 */
  const handleLikeButton = async (): Promise<boolean> => {
    try {
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  return {
    registerComment,
    registerReport,
    reportCategories,
  };
};
