import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useHeader } from "@hooks/useHeader";

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
  const header = useHeader(FOLDER_ID);

  return <></>;
};

export default FolderDetailCollapse;
