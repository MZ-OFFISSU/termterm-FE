import CommentApi from "@api/CommentApi";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CommentInput } from "Comment";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useThemeStyle } from "./useThemeStyle";

/** Comment 관련 API 훅 */
export const useComment = () => {
  const commentApi = new CommentApi();
  const [COLOR, mode] = useThemeStyle();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const successToast = () => {
    Toast.show({
      type: mode ? "light" : "dark",
      text1: "신청이 완료되었어요!\n검토 후 승인여부를 알려드릴게요☺️",
    })
  }

  const failedToast = () => {
    Toast.show({
      type: mode ? "light" : "dark",
      text1: "용어 설명 신청을 실패했어요🥲",
    })
  }

  /** 용어 설명 등록하기 */
  const registerComment = async (input: CommentInput, id: number): Promise<boolean> => {
    try {
      const res = await commentApi.registerComment(input);
      console.log("res - success : ", res, input);
      navigation.navigate("TermsDetail", { id : id});
      successToast();
      return true;
    } catch (err) {
      console.log(err);
      failedToast();
      return false;
    }
  };

  return {
    registerComment,
  };
};
