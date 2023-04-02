import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";

export type Props = StackScreenProps<
  RootStackParamList,
  "FolderDetailCollapse"
>;

/**
 * 폴더 상세페이지 -> 하나씩 보기
 */
const FolderDetailCollapse = ({ navigation, route }: Props) => {
  /**통신으로 데이터 받아오기 */
  const FOLDER_ID = route.params.id;
  return <></>;
};

export default FolderDetailCollapse;
