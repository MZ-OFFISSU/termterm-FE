import { TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";

export type Props = StackScreenProps<RootStackParamList, "ToolBar">;
const Archive = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.push("ArchiveBookmark")}
        style={{ height: 3000}}
      >
        <Text>북마크 하러 가쉴 ~?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Archive;
