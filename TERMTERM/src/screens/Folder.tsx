import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";

export type Props = StackScreenProps<RootStackParamList, "Folder">;

const Folder = ({ navigation, route }: Props) => {
  /**폴더 아이디로 통신해서 정보 가져오기 */
  const FOLDER_ID = route.params.id;
  return <></>;
};

export default Folder;
